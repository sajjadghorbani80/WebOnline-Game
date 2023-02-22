let chance = 5;
let randomNumber = (Math.random() * 100).toFixed(0);
export function guessNumber(guess) {
  console.log(randomNumber);
  if (chance == 0) {
    let message4 = {
      msg1: "You lose :(",
      msg2: "the Number was " + randomNumber,
      msg3: "Please refresh the page for start again :D"
    }
    return message4;
  }
  if (guess === randomNumber) {
    let message1 = {
      msg1: "Yahhhh You won It!!",
      msg2: "the Number was " + randomNumber,
      msg3: ""
    }
    return message1;
  } else if (guess < randomNumber) {
    chance -= 1;
    let message2 = {
      msg1: "Your Guess is Too low ",
      msg2: "Your Guess " + guess,
      msg3: "Remaining Chances " + chance,
    }
    return message2;
  } else {
    chance -= 1;
    let message3 = {
      msg1: "Your Guess is Too High",
      msg2: "Your Guess " + guess,
      msg3: "Remaining Chances " + chance,
    }
    return message3;
  }
}
