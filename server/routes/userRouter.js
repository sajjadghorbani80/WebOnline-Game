/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
import {Router} from 'express';
import {getCurrentUserInfo, resetPassword} from '../src/services/userServices.js';
import {ResponseDto} from '../src/dtos/responseDto.js';
import {checkToken} from '../src/services/authServices.js';
import {validationResult, check} from 'express-validator';

const router = Router();

const resetPassValidationRules = [
  check('password').escape().notEmpty().withMessage('password.input.empty'),
  check('repassword').escape().notEmpty().withMessage('repassword.input.empty'),
];

router.get('/getcurrentuserinfo/:id', async (req, res)=>{
  const userId = req.params.id;
  const userInfo = await getCurrentUserInfo(userId);
  const response = new ResponseDto(userInfo, null);
  return res.status(200).send(response);
});

router.post('/user/resetpass', resetPassValidationRules, async (req, res)=> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response = new ResponseDto(null, errors);
    return res.status(400).send(response);
  }
  const result = await resetPassword(req.body.token, req.body.password, req.body.repassword);
  res.send(result);
});
export {router};
