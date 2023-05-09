/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import {ResDto} from '../dtos/guessNumberDto.js';
import {prisma} from './prismaClient.js';
import {PlayDto} from '../dtos/playDto.js';
import {ResponseDto} from '../dtos/responseDto.js';
import { error } from 'console';

let gameId : number = null ;
async() => {await getGameIdByName('Guess Number').then((value)=> gameId = value)}

/* Using this function, a random number is
 created according to the user's behavior.
 Before this random number was generated when
 the server was running */
function restartGame() {
  const response : ResponseDto<ResDto> =
  {
    result : {
    chance : 5,
    randomNumber: +(Math.random() * 100).toFixed(0)},
    errors : ''
  };

  if (!gameId) {
    response.errors = 'webonlinegame.server.error';
    return response;
  }
  response.errors ='webonlinegame.guessnumber.restarted';
  return response;
}

/*
This is the logic of the number guessing game
that Compares the game number with user guess
and return the game result
*/

async function checkAnswer(guess : number, userId : number, chance : number, randomNumber : number) {
  console.log(randomNumber);
  chance--;
  const response : ResponseDto<ResDto> = {
    result : {
      chance : chance,
      randomNumber : null,
      guess : guess
    },
    errors : ''
  }

  if (guess == randomNumber) {
    response.errors = 'webonlinegame.guessnumber.success';
    response.result.randomNumber = randomNumber;
    const score = calculateScore(chance);
    const saveRes = await saveRecord({userId : userId, gameId : gameId, score : score});
    if (saveRes === true) {
      return response;
    } else {
      response.result.chance = chance++;
      response.errors = 'webonlinegame.server.error';
      return response;
    }
  } else if (guess < randomNumber) {
    response.errors = 'webonlinegame.guessnumber.tolow';
  } else {
    response.errors = 'webonlinegame.guessnumber.tohigh';
  }
  if (chance <= 0) {
    response.errors = 'webonlinegame.guessnumber.faild';
    response.result.randomNumber = randomNumber;
  }
  return response;
}

async function saveRecord(playDto : PlayDto) {
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

function calculateScore(chance : number) {
  return (chance + 1) * 10;
}

async function getGameIdByName(gameName : string) {
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
