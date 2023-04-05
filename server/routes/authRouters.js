/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable new-cap */

import {Router} from 'express';
import {ReqSignUpDto, ReqSignInDto} from '../src/dtos/userRegisterDto.js';
import {userRegister, singIn} from '../src/services/authServices.js';
import {validationResult, check} from 'express-validator';
import {ResponseDto} from '../src/dtos/responseDto.js';


const usernameRegex= '^[A-Za-z][A-Za-z0-9_]{3,20}$';
const RegisterValidationRules = [check('username').trim()
    .escape().notEmpty().withMessage('username.input.empty')
    .custom((username) => username.match(usernameRegex) ? true:false).withMessage('username.input.invalid'),
check('email').trim().escape().notEmpty().withMessage('email.input.empty')
    .isEmail().withMessage('email.input.invalid'),
check('fullname').trim().notEmpty().withMessage('fullname.input.empty'),
check('password').escape().notEmpty().withMessage('password.input.empty')];

const loginValidationRules = [check('usernameOrEmail').trim()
    .escape().notEmpty().withMessage('usernameOrEmail.input.empty'),
check('password').escape().notEmpty().withMessage('password.input.empty')];

const router = Router();

router.post('/user/userSignIn', loginValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response = new ResponseDto(400, null, errors);
    return res.status(200).send(response);
  }
  const requestData = new ReqSignInDto(req.body.usernameOrEmail, req.body.password);
  const userLoginResult = await singIn(requestData);
  res.send(userLoginResult);
});

router.post('/user/userregister', RegisterValidationRules, async (req, res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response = new ResponseDto(400, null, errors);
    return res.status(200).send(response);
  }
  const requestData = new ReqSignUpDto(req.body.username, req.body.email,
      req.body.fullname, req.body.password);
  const userRegisterResult = await userRegister(requestData);
  res.send(userRegisterResult);
});
export {router};
