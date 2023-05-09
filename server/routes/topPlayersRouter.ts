/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
import {Router, Request , Response} from 'express';
import {getTopPlayers} from '../src/services/topPlayersService.js';
import {ResponseDto} from '../src/dtos/responseDto.js';
import {validationResult, check} from 'express-validator';


const router = Router();

const countValidation = [check('count').trim()
    .escape().notEmpty().withMessage('gettopplayers.count.empty').isInt()
    .withMessage('gettopplayers.count.isNotInt')
    .custom((value)=> value >= 0? true : false)
    .withMessage('gettopplayers.count.invalidRange')];


router.post('/getTopPlayers', countValidation, async (req : Request , res : Response)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response : ResponseDto<null> = {result : null, errors : errors};
    return res.status(400).send(response);
  }
  const data : number = +req.body.count;
  const response = await getTopPlayers(data);
  res.status(200).send(response);
});

export {router};

