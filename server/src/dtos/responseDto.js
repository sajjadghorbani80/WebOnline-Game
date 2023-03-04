/* eslint-disable require-jsdoc */
export class ResponseDto {
  status;
  result;
  constructor(status, result) {
    this.status = status;
    this.result = result;
  }
}
