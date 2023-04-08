/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

async function getTopPlayers(params) {
  const userIds = [];
  const finalResult = [];
  let plays = null;
  let users = null;
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
      take: params.count != undefined? params.count: 3,
    });

    // get users id for get their info
    plays.forEach((record) => {
      userIds.push(record.userId);
    });
  } catch (error) {
    console.log(error);
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

    // prepare final result, include user info, score's, number of play's
    plays.forEach((element) => {
      const user = users.find((u) => u.uid== element.userId);
      const userInfo = {
        uid: user.uid,
        userName: user.username,
        fullName: user.fullname,
        sumScore: element._sum.score,
        PlayCount: element._count._all,
      };
      finalResult.push(userInfo);
    });
  } catch (error) {
    console.log(error);
  }
  return finalResult;
}

export {getTopPlayers};
