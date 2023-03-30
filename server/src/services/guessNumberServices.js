/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import {ResDto} from '../dtos/guessNumberDto.js';
let chance = 0;
let randomNumber = 0;

/* Using this function, a random number is
 created according to the user's behavior.
 Before this random number was generated when
 the server was running */
function restartGame() {
  chance = 5;
  randomNumber = (Math.random() * 100).toFixed(0);
  console.log(randomNumber);
}

/*
This is the logic of the number guessing game
that Compares the game number with user guess
and return the game result
*/
function checkAnswer(guess) {
  chance--;
  const result = new ResDto(chance, null, guess.guessValue, null);

  if (guess.guessValue == randomNumber) {
    result.status = 1;
    result.randomNumber = randomNumber;
    return result;

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

export {checkAnswer, restartGame};
