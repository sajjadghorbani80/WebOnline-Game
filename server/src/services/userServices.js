/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {ResponseDto} from '../dtos/responseDto.js';


async function getCurrentUserInfo(userId) {
  try {
    const user = await prisma.user.findFirstOrThrow({
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
    const playsOfCurrentUser = plays.find((p) => p.userId == userId);
    const userRank = plays.findIndex((p) => p.userId == +userId) + 1;
    const userInfo = {
      uid: user.uid,
      fullName: user.fullname,
      sumScore: playsOfCurrentUser._sum.score,
      playCount: playsOfCurrentUser._count._all,
      rank: userRank,
    };

    return userInfo;
  } catch (error) {
    console.log(error);
  }
}

async function resetPassword(token, password, repassword) {
  const result = new ResponseDto();
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const tokenData = jwt.verify(token, jwtSecretKey, (err, decoded)=> {
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
      console.log(error);
      result.errors = 'webonlinegame.server.error';
      return result;
    }
  } else {
    result.errors = 'webonlinegame.resetpass.passwordMisMatch';
  }
  return result;
}
export {getCurrentUserInfo, resetPassword};
