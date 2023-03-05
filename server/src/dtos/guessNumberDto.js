/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
class ReqDto {
  guessValue;
  constructor(value) {
    this.guessValue = value;
  }
}

class ResDto {
  chance;
  randomNumber;
  guess;
  status;
  constructor(chance, randomNumber, guess, status) {
    this.chance = chance;
    this.randomNumber = randomNumber;
    this.guess = guess;
    this.status = status;
  }
}
export {ReqDto, ResDto};
