/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {prisma} from './prismaClient.js';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {ResponseDto} from '../dtos/responseDto.js';
import { userInfoDto } from '../dtos/getTopPlayersDto.js';
import {tokenData } from '../dtos/tokenDto.js'


async function getCurrentUserInfo(userId: number) {
  const response: ResponseDto<userInfoDto> = {
    result:null, errors:null
  };
  const userInfo: userInfoDto= {
    sumScore: 0,
    rank: 0,
    playCount: 0,
    uid: 0,
    userName: '',
    fullName: ''
  };

  try {
    const user = await prisma.user.findFirst({
      where: {
        uid: userId,
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

async function resetPassword(token: string, password: string, repassword: string) {
  const response: ResponseDto<null> = {result:null,errors:null};
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  let tokenData: tokenData | false;
  jwt.verify(token, jwtSecretKey, (err, decoded : tokenData) => {
    if (err) {
      tokenData = false;
      return;
    } else {
      tokenData = {userId : decoded.userId, email : decoded.email};
      return;
    }
  });
  if (tokenData == false) {
    response.errors = 'webonlinegame.token.unauthorize';
    return response;
  }
  if (password == repassword) {
    try {
      await prisma.user.update({
        where: {
          email: tokenData.email,
        },
        data: {
          password: bcrypt.hashSync(password, 10),
        },
      });
      response.errors = 'webonlinegame.resetpass.success';
    } catch (error) {
      response.errors = 'webonlinegame.server.error';
      return response;
    }
  } else {
    response.errors = 'webonlinegame.resetpass.passwordMisMatch';
  }
  return response;
}
export {getCurrentUserInfo, resetPassword};
