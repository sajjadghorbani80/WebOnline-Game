/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import {ResDto} from '../dtos/guessNumberDto.js';
let chance = 5;
let randomNumber = 0;
/*
This is the logic of the number guessing game
that Compares the game number with user guess
and return the game result
*/
function checkAnswer(guess) {
  console.log(randomNumber);
  chance--;
  const result = new ResDto(chance, null, guess.guessValue, null);

  if (chance <= 0) {
    result.status = 0;
    result.randomNumber = randomNumber;
    return result;
  }
  if (guess.guessValue === randomNumber) {
    result.status = 1;
    result.randomNumber = randomNumber;
  } else if (guess.guessValue < randomNumber) {
    result.status = 2;
  } else {
    result.status = 3;
  }
  return result;
}

function restartGame() {
  chance = 5;
  randomNumber = (Math.random() * 100).toFixed(0);
}

export {checkAnswer, restartGame};
