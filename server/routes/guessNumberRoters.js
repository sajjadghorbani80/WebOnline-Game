/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable new-cap */
import {Router} from 'express';
const router = Router();
import {checkAnswer, restartGame}
  from '../src/services/guessNumberService.js';
import {ReqDto} from '../src/dtos/guessNumberDto.js';
import {ResponseDto} from '../src/dtos/responseDto.js';
import {validationResult, check} from 'express-validator';

const validationRules = [check('guessValue').trim()
    .escape().notEmpty().withMessage('guessnumber.input.empty').isInt()
    .withMessage('guessnumber.input.isNotInt')
    .custom((value)=> value >= 0 && value <=100? true : false)
    .withMessage('guessnumber.input.invalidRange')];

router.post('/guessnumber/checkanswer', validationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response = new ResponseDto(400, null, errors);
    return res.status(200).send(response);
  }
  const data = new ReqDto(+req.body.guessValue);
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
