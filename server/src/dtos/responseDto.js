/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
export class ResponseDto {
  status;
  result;
  errors;
  constructor(result, errors) {
    this.result = result;
    this.errors= errors;
  }
}

