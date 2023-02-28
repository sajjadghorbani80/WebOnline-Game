/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
let chance = 5;
const randomNum = (Math.random() * 100).toFixed(0);
/*
This is the logic of the guess number game
that Compares the game number with user guess
and return the game result
*/
function checkanswer(guess) {
  chance--;
  if (chance <0) {
    return `You lose, play again. My number was ${randomNum}`;
  };

  if (guess < randomNum) {
    return `My number is greater than  ${guess}`;
  } else if (guess > randomNum) {
    return `My number is less than  ${guess}`;
  } else if (guess == randomNum) {
    return `You win.`;
  }
}

export {chance, checkanswer};
