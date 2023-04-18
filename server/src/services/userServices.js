/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {ResponseDto} from '../dtos/responseDto.js';


async function getCurrentUserInfo(userId) {
  const response = new ResponseDto();
  const userInfo = {
    sumScore: 0,
    rank: 0,
    playCount: 0,
  };
  try {
    const user = await prisma.user.findFirst({
      where: {
        uid: +userId,
      },
      select: {
        uid: true,
        fullname: true,
      },
    });

    const plays = await prisma.play.groupBy({
      by: ['userId'],
      orderBy: {
        _sum: {
          score: 'desc',
        },
      },
      _sum: {
        score: true,
      },
      _count: {
        _all: true,
      },
    });

    if (user != undefined) {
      userInfo.fullName = user.fullname;
      userInfo.uid = user.uid;
    } else {
      response.errors = 'webonlinegame.user.notfound';
      return response;
    }
    if (plays != undefined) {
      const playsOfCurrentUser = plays.find((p) => p.userId == userId);
      const userRank = plays.findIndex((p) => p.userId == +userId) + 1;
      userInfo.sumScore = playsOfCurrentUser != undefined? playsOfCurrentUser._sum.score : 0;
      userInfo.playCount = playsOfCurrentUser != undefined? playsOfCurrentUser._count._all : 0;
      userInfo.rank = userRank != -1? userRank: 0;
    } else {
      response.errors = 'webonlinegame.play.notfound';
      return response;
    }
    response.result = userInfo;
  } catch (error) {
    response.errors = 'webonlinegame.server.error';
  }
  return response;
}

async function resetPassword(token, password, repassword) {
  const result = new ResponseDto();
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const tokenData = jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
  if (tokenData == false) {
    result.errors = 'webonlinegame.token.unauthorize';
    return result;
  }
  if (password == repassword) {
    try {
      const updateUser = await prisma.user.update({
        where: {
          email: tokenData.email,
        },
        data: {
          password: bcrypt.hashSync(password, 10),
        },
      });
      result.errors = 'webonlinegame.resetpass.success';
    } catch (error) {
      result.errors = 'webonlinegame.server.error';
      return result;
    }
  } else {
    result.errors = 'webonlinegame.resetpass.passwordMisMatch';
  }
  return result;
}
export {getCurrentUserInfo, resetPassword};
