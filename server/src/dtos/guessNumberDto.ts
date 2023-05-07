/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
export interface ReqDto {
  guessValue : number;
}

export interface ResDto {
  chance : number;
  randomNumber : number;
  guess? : number;
}
