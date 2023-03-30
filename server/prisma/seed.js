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

  const play = await prisma.Play.upsert({
    where: {pid: 1},

    update: {},
    create: {
      userId: 1,
      gameId: 1,
      score: 100,

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
