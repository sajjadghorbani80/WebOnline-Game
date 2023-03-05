/* eslint-disable new-cap */
import {Router} from 'express';
const router = Router();
import {guessNumber} from '../src/services/guess-number.js';
import {ReqDto} from '../src/dtos/guessNumberDto.js';
import {ResponseDto} from '../src/dtos/responseDto.js';

router.post('/guessNumber', (req, res) => {
  const data = new ReqDto(req.body.guessValue);
  const result = guessNumber(data);
  const response = new ResponseDto(200, result);
  res.status(200).send(response);
});

export {router};
