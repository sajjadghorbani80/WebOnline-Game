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
import {ResDto} from '../src/dtos/guessNumberDto.js';


const validationRules = [check('guessValue').trim()
    .escape().notEmpty().withMessage('guessnumber.input.empty').isInt()
    .withMessage('guessnumber.input.isNotInt')
    .custom((value)=> value >= 0 && value <=100? true : false)
    .withMessage('guessnumber.input.invalidRange')];

router.post('/guessnumber/checkanswer', checkToken, validationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response = new ResponseDto(null, errors);
    return res.status(400).send(response);
  }
  const data = new ReqDto(+req.body.guessValue);
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

router.get('/guessnumber/restart-game', checkToken, (req, res)=>{
  const session = req.session;
  if (!(session?.gameData)) {
    const response = restartGame();
    req.session.gameData = response.result;
    return res.send(response);
  }
  const response = new ResponseDto(new ResDto(session.gameData.chance, session.gameData.randomNumber, session.gameData.guess), session.gameData.errors);
  return res.send(response);
});

export {router};
