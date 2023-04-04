/* eslint-disable new-cap */

import {Router} from 'express';
import {ReqDto} from '../src/dtos/userRegisterDto.js';
import {userRegister} from '../src/services/authServices.js';
import {generateToken} from '../src/services/authServices.js';

const router = Router();

router.post('/user/generateToken', (req, res) => {
  const result = new ReqDto(req.body.userId, req.body.email);
  const generateTokenResult = generateToken(result);
  return generateTokenResult;
});

router.get('/user/validateToken', (req, res) => {

});

router.post('/user/userregister', async (req, res)=>{
  const result = new ReqDto(req.body.username, req.body.email,
      req.body.fullname, req.body.password);
  const userRegisterResult = await userRegister(result);
  return userRegisterResult;
});
export {router};
