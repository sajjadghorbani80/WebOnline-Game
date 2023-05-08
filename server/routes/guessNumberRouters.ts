/* eslint-disable max-len */
/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable new-cap */
import {Router, Request , Response} from 'express';
const router = Router();
import {checkAnswer, restartGame} from '../src/services/guessNumberServices.js';
import {ResponseDto} from '../src/dtos/responseDto.js';
import {validationResult, check} from 'express-validator';
import {checkToken} from '../src/services/authServices.js';
import {ResDto} from '../src/dtos/guessNumberDto.js';
import { error } from 'winston';
import { tokenData } from '../src/dtos/tokenDto.js';


const validationRules = [check('guessValue').trim()
    .escape().notEmpty().withMessage('guessnumber.input.empty').isInt()
    .withMessage('guessnumber.input.isNotInt')
    .custom((value)=> value >= 0 && value <=100? true : false)
    .withMessage('guessnumber.input.invalidRange')];

router.post('/guessnumber/checkanswer', checkToken, validationRules, async (req : Request & {decoded: tokenData}, res : Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response : ResponseDto<null> = {result : null, errors : errors};
    return res.status(400).send(response);
  }
  const data : number = +req.body.guessValue;
  const userId = req.decoded.userId;
  const gameData = req.session.gameData;
  const result = await checkAnswer(data, userId, gameData.chance, gameData.randomNumber);
  if (result.errors == 'webonlinegame.guessnumber.success' || result.errors == 'webonlinegame.guessnumber.faild') {
    req.session.gameData= undefined;
  } else {
    req.session.gameData.chance= result.result.chance;
    req.session.gameData.errors= result.errors;
    req.session.gameData.guess= result.result.guess;
  }
  return res.status(200).send(result);
});

router.get('/guessnumber/restart-game', checkToken, (req : Request , res : Response)=>{
  const session = req.session;
  if (!(session?.gameData)) {
    const response = restartGame();
    req.session.gameData = {
      chance: response.result.chance,
      randomNumber: response.result.chance,
      guess: response.result.guess,
      errors: response.errors
    };
    return res.send(response);
  }
  const response : ResponseDto<ResDto> = { result : {
    chance : session.gameData.chance,
    randomNumber: session.gameData.randomNumber,
    guess : session.gameData.guess
  },
    errors : session.gameData.errors || 'webonlinegame.guessnumber.restarted'
  };
  return res.send(response);
});

export {router};
