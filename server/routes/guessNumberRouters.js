/* eslint-disable max-len */
/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable new-cap */
import {Router} from 'express';
const router = Router();
import {checkAnswer, restartGame}
  from '../src/services/guessNumberServices.js';
import {ReqDto} from '../src/dtos/guessNumberDto.js';
import {ResponseDto} from '../src/dtos/responseDto.js';
import {validationResult, check} from 'express-validator';
import {checkToken} from '../src/services/authServices.js';

const validationRules = [check('guessValue').trim()
    .escape().notEmpty().withMessage('guessnumber.input.empty').isInt()
    .withMessage('guessnumber.input.isNotInt')
    .custom((value)=> value >= 0 && value <=100? true : false)
    .withMessage('guessnumber.input.invalidRange')];

router.post('/guessnumber/checkanswer', checkToken, validationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response = new ResponseDto(400, null, errors);
    return res.send(response);
  }
  const data = new ReqDto(+req.body.guessValue);
  console.log(req.decoded);
  const userId = req.decoded.userId;
  const result = await checkAnswer(data, userId);
  if (result.errors) {
    const response = new ResponseDto(400, null, result);
    return res.status(200).send(response);
  }
  const response = new ResponseDto(200, result);
  return res.status(200).send(response);
});

router.get('/guessnumber/restart-game', checkToken, (req, res)=>{
  const response = restartGame();
  res.send(response);
});

export {router};
