/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
export class ResponseDto {
  status;
  result;
  error;
  constructor(status, result, error) {
    this.status = status;
    this.result = result;
    this.error = error;
  }
}

