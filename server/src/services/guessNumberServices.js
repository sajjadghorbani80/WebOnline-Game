/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import {ResDto} from '../dtos/guessNumberDto.js';
import {PrismaClient} from '@prisma/client';
import {PlayDto} from '../dtos/playDto.js';
const prisma = new PrismaClient();

let chance = 0;
let randomNumber = 0;
const gameId = await getGameIdByName('Guess Number');

/* Using this function, a random number is
 created according to the user's behavior.
 Before this random number was generated when
 the server was running */
function restartGame() {
  chance = 5;
  randomNumber = (Math.random() * 100).toFixed(0);
  console.log(randomNumber);
  const response = new ResponseDto(200, null);
  return response;
}

/*
This is the logic of the number guessing game
that Compares the game number with user guess
and return the game result
*/
async function checkAnswer(guess) {
  chance--;
  const result = new ResDto(chance, null, guess.guessValue, null);

  if (guess.guessValue == randomNumber) {
    result.status = 1;
    result.randomNumber = randomNumber;
    const score = calculateScore(chance);
    const saveRes = await saveRecord(new PlayDto(1, gameId, score));
    if (saveRes === true) {
      return result;
    } else {
      chance++;
      return {errors: [{msg: 'guessnumber.database.error'}]};
    }
  } else if (guess.guessValue < randomNumber) {
    result.status = 2;
  } else {
    result.status = 3;
  }
  if (chance <= 0) {
    result.status = 0;
    result.randomNumber = randomNumber;
  }
  return result;
}

async function saveRecord(playDto) {
  try {
    const play = await prisma.play.create({
      data: {
        userId: playDto.userId,
        gameId: playDto.gameId,
        score: playDto.score,
      },
    });

    return true;
  } catch (error) {
    console.log(error.message);
  }
  return false;
}

function calculateScore(chance) {
  return (chance + 1) * 10;
}

async function getGameIdByName(gameName) {
  try {
    const game = await prisma.game.findFirst({
      where: {title: gameName},
    });

    return game.gid;
  } catch (error) {
    console.log(error.message);
  }
  return undefined;
}
export {checkAnswer, restartGame};
