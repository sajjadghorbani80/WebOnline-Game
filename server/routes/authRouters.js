/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable new-cap */

import {Router} from 'express';
import {ReqSignUpDto, ReqSignInDto} from '../src/dtos/userRegisterDto.js';
import {signup, signin} from '../src/services/authServices.js';
import {sendVerifyUserEmail} from '../src/utilities/emailDelivery.js';
import {validationResult, check} from 'express-validator';
import {ResponseDto} from '../src/dtos/responseDto.js';
import jwt from 'jsonwebtoken';

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


const emailValidations = [check('email').trim().escape().notEmpty().withMessage('email.input.empty')
    .isEmail().withMessage('email.input.invalid')];

const router = Router();

router.post('/user/signup', RegisterValidationRules, async (req, res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response = new ResponseDto(null, errors);
    return res.status(400).send(response);
  }
  const requestData = new ReqSignUpDto(req.body.username, req.body.email,
      req.body.fullname, req.body.password);
  const signupResult = await signup(requestData);
  res.status(200).send(signupResult);
});

router.post('/user/signin', loginValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response = new ResponseDto(null, errors);
    return res.status(400).send(response);
  }
  const requestData = new ReqSignInDto(req.body.usernameOrEmail, req.body.password);
  const userLoginResult = await signin(requestData);
  return res.status(200).send(userLoginResult);
});

router.post('/user/sendVerifyEmail', emailValidations, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response = new ResponseDto(null, errors);
    return res.status(400).send(response);
  }
  const email = req.body.email;
  const resultProcess = await sendVerifyUserEmail(email);
  return res.status(200).send(resultProcess);
});

router.get('/verify/:token', (req, res)=>{
  const {token} = req.params;

  // Verifying the JWT token
  jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
    if (err) {
      res.redirect(`http://localhost:${process.env.NODE_LOCAL_PORT}/src/views/error.html?error=notverify`);
    } else {
      res.redirect(`http://localhost:${process.env.NODE_LOCAL_PORT}/src/views/resetPass.html?token=${token}`);
    }
  });
});

// router.get('/check/:token', (req, res)=>{
//   const {token} = req.params;
//   jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
//     if (err) {
//       res.send(400)
//     } else {
//     }
//   });
// });


export {router};
