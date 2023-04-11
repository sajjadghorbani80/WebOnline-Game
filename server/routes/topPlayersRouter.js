/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
import {Router} from 'express';
import {ReqTopPlayersDto} from '../src/dtos/getTopPlayersDto.js';
import {getTopPlayers} from '../src/services/topPlayersService.js';
import {ResponseDto} from '../src/dtos/responseDto.js';

const router = Router();

router.post('/getTopPlayers', async (req, res)=>{
  const data = new ReqTopPlayersDto(req.body.count);
  const records = await getTopPlayers(data);
  const response = new ResponseDto(records, null);
  res.status(200).send(response);
});

export {router};

