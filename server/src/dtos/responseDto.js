/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
export class ResponseDto {
  status;
  result;
  errors;
  constructor(status, result, errors) {
    this.status = status;
    this.result = result;
    this.errors= errors;
  }
}

