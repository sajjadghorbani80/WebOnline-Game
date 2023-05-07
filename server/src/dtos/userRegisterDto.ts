/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
interface ReqSignUpDto {
  username: string;
  email: string;
  fullname: string;
  password: string;
  repassword: string;
}

interface ReqSignInDto {
  usernameOrEmail: string;
  password: string;
  
}
export {ReqSignUpDto, ReqSignInDto};

