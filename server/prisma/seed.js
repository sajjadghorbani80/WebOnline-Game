/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import bcrypt from 'bcrypt';
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
      username: 'hani',
      email: 'haniehghsmie@gmail.com',
      fullname: 'hanieh ghassmie',
      password: bcrypt.hashSync('hni123@', 10),
      play: {},

    },
  });

  const user2 = await prisma.User.upsert({
    where: {uid: 2},

    update: {},
    create: {
      username: 'sajd',
      email: 'sajjadr2001@gmail.com',
      fullname: 'sajjad ghorbani',
      password: bcrypt.hashSync('sjd123@', 10),
      play: {},

    },
  });

  const user3 = await prisma.User.upsert({
    where: {uid: 3},

    update: {},
    create: {
      username: 'amir_1986',
      email: 'amirhosein@gmail.com',
      fullname: 'amirhosein sadeghi',
      password: bcrypt.hashSync('amh123@', 10),
      play: {},

    },
  });
  const play = await prisma.Play.upsert({
    where: {pid: 1},

    update: {},
    create: {
      userId: user1.uid,
      gameId: guessNumber.gid,
      score: 100,

    },
  });

  const play1 = await prisma.Play.upsert({
    where: {pid: 2},

    update: {},
    create: {
      userId: user1.uid,
      gameId: guessNumber.gid,
      score: 100,

    },
  });

  const play2 = await prisma.Play.upsert({
    where: {pid: 3},

    update: {},
    create: {
      userId: user2.uid,
      gameId: guessNumber.gid,
      score: 50,

    },
  });

  const play3 = await prisma.Play.upsert({
    where: {pid: 4},

    update: {},
    create: {
      userId: user3.uid,
      gameId: guessNumber.gid,
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
