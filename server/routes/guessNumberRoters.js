/* eslint-disable new-cap */
import {Router} from 'express';
const routergame1 = Router();
import {guessNumber} from '../src/services/guess-number.js';

routergame1.post('/guessNumber', (req, res) => {
  const guess = req.body.data;
  const result = guessNumber(guess);
  res.status(200).send(result);
});

export {routergame1};
