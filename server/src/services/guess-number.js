/* eslint-disable require-jsdoc */
import {ResDto} from '../dtos/guessNumberDto.js';
let chance = 5;
const randomNumber = (Math.random() * 100).toFixed(0);
/*
This is the logic of the number guessing game
that Compares the game number with user guess
and return the game result
*/
export function guessNumber(guess) {
  console.log(randomNumber);
  let result;
  chance--;
  if (chance <= 0) {
    result = new ResDto(chance, randomNumber, guess.guessValue, 0);
    return result;
  }
  if (guess.guessValue === randomNumber) {
    result = new ResDto(null, randomNumber, null, 1);
  } else if (guess.guessValue < randomNumber) {
    result = new ResDto(chance, null, guess.guessValue, 2);
  } else {
    result = new ResDto(chance, null, guess.guessValue, 3);
  }
  return result;
}
