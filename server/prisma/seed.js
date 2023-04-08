/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const guessNumber = await prisma.Game.upsert({
    where: {gid: 1},

    update: {},
    create: {

      title: 'Guess Number',

      content: 'Try your luck and get a prize!',

      genres: ['Family', 'Casual'],
      play: {},
    },
  });

  const user1 = await prisma.User.upsert({
    where: {uid: 1},

    update: {},
    create: {
      username: 'hni',
      email: 'haniehghsmie@gmail.com',
      fullname: 'hanieh ghassmie',
      password: 'hni123@',
      play: {},

    },
  });

  const user2 = await prisma.User.upsert({
    where: {uid: 2},

    update: {},
    create: {
      username: 'sjd',
      email: 'sajjad2001@gmail.com',
      fullname: 'sajjad ghorbani',
      password: 'sjd123@',
      play: {},

    },
  });

  const user3 = await prisma.User.upsert({
    where: {uid: 3},

    update: {},
    create: {
      username: '@amir.1986',
      email: 'amirhosein@gmail.com',
      fullname: 'amirhosein sadeghi',
      password: 'amh123@',
      play: {},

    },
  });
  const play = await prisma.Play.upsert({
    where: {pid: 1},

    update: {},
    create: {
      userId: 1,
      gameId: 1,
      score: 100,

    },
  });

  const play1 = await prisma.Play.upsert({
    where: {pid: 2},

    update: {},
    create: {
      userId: 1,
      gameId: 1,
      score: 100,

    },
  });

  const play2 = await prisma.Play.upsert({
    where: {pid: 3},

    update: {},
    create: {
      userId: 2,
      gameId: 1,
      score: 50,

    },
  });

  const play3 = await prisma.Play.upsert({
    where: {pid: 4},

    update: {},
    create: {
      userId: 3,
      gameId: 1,
      score: 40,

    },
  });
}

main()

    .then(async () => {
      await prisma.$disconnect();
    })

    .catch(async (e) => {
      console.error(e);

      await prisma.$disconnect();

      process.exit(1);
    });
