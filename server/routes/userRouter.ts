/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
import {Router, Request , Response} from 'express';
import {getCurrentUserInfo, resetPassword} from '../src/services/userServices.js';
import {ResponseDto} from '../src/dtos/responseDto.js';
import {validationResult, check} from 'express-validator';

const router = Router();

const resetPassValidationRules = [
  check('password').escape().notEmpty().withMessage('password.input.empty'),
  check('repassword').escape().notEmpty().withMessage('repassword.input.empty'),
  check('token').trim().escape().notEmpty().withMessage('token.input.empty'),
];

const userIdValidationRules = [
  check('id').trim().escape().notEmpty().withMessage('webonlinegame.getUserInfo.userid.empty').isInt().withMessage('webonlinegame.getUserInfo.userid.invalid'),
];
router.get('/getcurrentuserinfo/:id', userIdValidationRules, async (req : Request , res : Response)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response : ResponseDto<null> = {result : null, errors : errors};
    return res.status(400).send(response);
  }
  const userId = req.params.id;
  const resp = await getCurrentUserInfo(+userId);
  return res.status(200).send(resp);
});

router.post('/user/resetpass', resetPassValidationRules, async (req : Request , res : Response)=> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response : ResponseDto<null> = {result : null, errors : errors};
    return res.status(400).send(response);
  }
  const result = await resetPassword(req.body.token, req.body.password, req.body.repassword);
  res.send(result);
});
export {router};
