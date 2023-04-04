/* eslint-disable require-jsdoc */
class ReqDto {
  username;
  email;
  fullname;
  password;
  constructor(username, email, fullname, password) {
    this.username = username;
    this.email = email;
    this.fullname = fullname;
    this.password = password;
  }
}
export {ReqDto};

