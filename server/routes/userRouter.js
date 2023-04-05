/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
import {Router} from 'express';
import {getCurrentUserInfo} from '../src/services/userServices.js';
import {ResponseDto} from '../src/dtos/responseDto.js';
import {checkToken} from '../src/services/authServices.js';

const router = Router();

router.get('/getcurrentuserinfo/:id', checkToken, async (req, res)=>{
  const userId = req.params.id;
  const userInfo = await getCurrentUserInfo(userId);
  const response = new ResponseDto(200, userInfo);
  return res.status(200).send(response);
});

export {router};
