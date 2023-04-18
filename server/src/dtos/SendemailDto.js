/* eslint-disable require-jsdoc */
export class SendEmailDto {
  from;
  to;
  subject;
  constructor(from, to, subject) {
    this.from = from;
    this.to = to;
    this.subject = subject;
  }
}
