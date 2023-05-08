/* eslint-disable require-jsdoc */
import {prisma} from './prismaClient.js';
import {ResponseDto} from '../dtos/responseDto.js';
import { userInfoDto,getUserDto } from '../dtos/getTopPlayersDto.js';

async function getTopPlayers(count:number) {
  const finalResult: Array<userInfoDto> = [];
  const response: ResponseDto<Array<userInfoDto>> = {
    errors:null,
    result:finalResult
  };
  const userIds: Array<number> = [];
  let plays = null;
  let users: Array<getUserDto> = null;
  // select sum of score group by userId
  try {
    plays = await prisma.play.groupBy({
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
      take: count != undefined? count: 3,
    });
    if (plays == undefined) {
      // get users id for get their info
      response.errors = 'webonlinegame.record.NotFound';
      return response;
    }
    plays.forEach((record) => {
      userIds.push(record.userId);
    });
  } catch (error) {
    response.errors = 'webonlinegame.server.error';
    return response;
  }


  // get users info
  try {
    users = await prisma.user.findMany({
      where: {
        uid: {
          in: userIds,
        },
      },
      select: {
        uid: true,
        fullname: true,
        username: true,
      },
    });
    if (users != undefined) {
      // get users id for get their info
      plays.forEach((element) => {
        const user = users.find((u) => u.uid== element.userId);
        const userInfo: userInfoDto = {
          uid: user.uid,
          userName: user.username,
          fullName: user.fullname,
          sumScore: element._sum.score,
          playCount: element._count._all,
        };
        finalResult.push(userInfo);
      });
      response.result = finalResult;
      response.errors = 'webonlinegame.gettopplayers.success';
      return response;
    }
    response.errors = 'webonlinegame.record.NotFound';
    return response;
    // prepare final result, include user info, score's, number of play's
  } catch (error) {
    response.errors = 'webonlinegame.server.error';
    return response;
  }
}

export {getTopPlayers};
