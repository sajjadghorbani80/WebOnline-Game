/* eslint-disable linebreak-style */
import express from 'express';
const router = express.Router();
import {guessNumber} from '../services/guess-number.js';

router.post('/guessNumber', (req, res) => {
  const guess = req.body.data;
  const result = guessNumber(guess);
  res.status(200).send(result);
});

export {router};
