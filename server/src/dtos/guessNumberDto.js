/* eslint-disable require-jsdoc */
export class ReqDto {
  guessValue;
  constructor(value) {
    this.guessValue = value;
  }
}
/* eslint-disable require-jsdoc */
export class ResDto {
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
