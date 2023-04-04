/* eslint-disable require-jsdoc */
class ReqDto {
  username;
  email;
  fullname;
  password;
  confrimPass;
  constructor(username, email, fullname, password, confrimPass) {
    this.username = username;
    this.email = email;
    this.fullname = fullname;
    this.password = password;
    this.confrimPass = confrimPass;
  }
}
export {ReqDto};
