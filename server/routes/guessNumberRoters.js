/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable new-cap */
import {Router} from 'express';
const router = Router();
import {checkAnswer, restartGame} from '../src/services/guess-number.js';
import {ReqDto} from '../src/dtos/guessNumberDto.js';
import {ResponseDto} from '../src/dtos/responseDto.js';

router.post('/guessnumber/checkanswer', (req, res) => {
  const data = new ReqDto(req.body.guessValue);
  const result = checkAnswer(data);
  const response = new ResponseDto(200, result);
  res.status(200).send(response);
});

router.get('/guessnumber/restart-game', (req, res)=>{
  restartGame();
  const response = new ResponseDto(200, null);
  res.status(200).send(response);
});

export {router};
