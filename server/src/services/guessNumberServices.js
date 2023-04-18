/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import {ResDto} from '../dtos/guessNumberDto.js';
import {PrismaClient} from '@prisma/client';
import {PlayDto} from '../dtos/playDto.js';
import {ResponseDto} from '../dtos/responseDto.js';
const prisma = new PrismaClient();

let chance = 0;
let randomNumber = 0;
const gameId = await getGameIdByName('Guess Number');

/* Using this function, a random number is
 created according to the user's behavior.
 Before this random number was generated when
 the server was running */
function restartGame() {
  const response = new ResponseDto();
  if (!gameId) {
    response.errors = 'webonlinegame.server.error';
    return response;
  }
  chance = 5;
  randomNumber = (Math.random() * 100).toFixed(0);
  console.log(randomNumber);
  response.errors ='webonlinegame.guessnumber.restarted';
  return response;
}

/*
This is the logic of the number guessing game
that Compares the game number with user guess
and return the game result
*/
async function checkAnswer(guess, userId) {
  chance--;
  const response = new ResponseDto();
  const result = new ResDto(chance, null, guess.guessValue, null);

  if (guess.guessValue == randomNumber) {
    response.errors = 'webonlinegame.guessnumber.success';
    result.randomNumber = randomNumber;
    const score = calculateScore(chance);
    const saveRes = await saveRecord(new PlayDto(userId, gameId, score));
    if (saveRes === true) {
      response.result = result;
      return response;
    } else {
      chance++;
      response.errors = 'webonlinegame.server.error';
      return response;
    }
  } else if (guess.guessValue < randomNumber) {
    response.errors = 'webonlinegame.guessnumber.tolow';
  } else {
    response.errors = 'webonlinegame.guessnumber.tohigh';
  }
  if (chance <= 0) {
    response.errors = 'webonlinegame.guessnumber.faild';
    result.randomNumber = randomNumber;
  }
  response.result = result;
  return response;
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
    return false;
  }
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
    return undefined;
  }
}
export {checkAnswer, restartGame};
