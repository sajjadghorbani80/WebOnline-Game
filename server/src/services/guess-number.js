/* eslint-disable require-jsdoc */
let chance = 5;
const randomNumber = (Math.random() * 100).toFixed(0);
/*
This is the logic of the number guessing game
that Compares the game number with user guess
and return correct message
*/
export function guessNumber(guess) {
  console.log(randomNumber);
  if (chance == 0) {
    const message4 = {
      msg1: 'You lose :(',
      msg2: 'the Number was ' + randomNumber,
      msg3: 'Please refresh the page for start again :D',
    };
    return message4;
  }
  if (guess === randomNumber) {
    const message1 = {
      msg1: 'Yahhhh You won It!!',
      msg2: 'the Number was ' + randomNumber,
      msg3: '',
    };
    return message1;
  } else if (guess < randomNumber) {
    chance -= 1;
    const message2 = {
      msg1: 'Your Guess is Too low ',
      msg2: 'Your Guess ' + guess,
      msg3: 'Remaining Chances ' + chance,
    };
    return message2;
  } else {
    chance -= 1;
    const message3 = {
      msg1: 'Your Guess is Too High',
      msg2: 'Your Guess ' + guess,
      msg3: 'Remaining Chances ' + chance,
    };
    return message3;
  }
}
