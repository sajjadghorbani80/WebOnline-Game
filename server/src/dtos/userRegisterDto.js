/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
class ReqSignUpDto {
  username;
  email;
  fullname;
  password;
  repassword;
  constructor(username, email, fullname, password, repassword) {
    this.username = username;
    this.email = email;
    this.fullname = fullname;
    this.password = password;
    this.repassword = repassword;
  }
}

class ReqSignInDto {
  usernameOrEmail;
  password;
  constructor(usernameOrEmail, password) {
    this.usernameOrEmail = usernameOrEmail;
    this.password = password;
  }
}
export {ReqSignUpDto, ReqSignInDto};

