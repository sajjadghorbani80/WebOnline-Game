/* eslint-disable max-len */
/* eslint-disable new-cap */

import {Router} from 'express';
import {ReqDto} from '../src/dtos/userRegisterDto.js';
import {userRegister} from '../src/services/authServices.js';
import {generateToken} from '../src/services/authServices.js';
import {validationResult, check} from 'express-validator';
import { ResponseDto } from '../src/dtos/responseDto.js';

const usernameRegex= '^[A-Za-z][A-Za-z0-9_]{3,20}$';
const validationRules = [check('username').trim()
    .escape().notEmpty().withMessage('username.input.empty')
    .custom((username) => username.match(usernameRegex) ? true:false).withMessage('username.input.invalid'),
check('email').trim().escape().notEmpty().withMessage('email.input.empty')
    .isEmail().withMessage('email.input.invalid'),
check('fullname').trim().notEmpty().withMessage('fullname.input.empty'),
check('password').escape().notEmpty().withMessage('password.input.empty')];


const router = Router();

router.post('/user/generateToken', (req, res) => {
  const result = new ReqDto(req.body.userId, req.body.email);
  const generateTokenResult = generateToken(result);
  return generateTokenResult;
});

router.get('/user/validateToken', (req, res) => {

});

router.post('/user/userregister', validationRules, async (req, res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response = new ResponseDto(400, null, errors);
    return res.status(200).send(response);
  }
  const result = new ReqDto(req.body.username, req.body.email,
      req.body.fullname, req.body.password);
  const userRegisterResult = await userRegister(result);
  res.send(userRegisterResult);
});
export {router};
