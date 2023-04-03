/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

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

export {getCurrentUserInfo};
