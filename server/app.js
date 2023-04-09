/* eslint-disable linebreak-style */
import express from 'express';
import * as dotenv from 'dotenv';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
import {router as guessNumber} from './routes/guessNumberRouters.js';
import {router as topPlayersRouter} from './routes/topPlayersRouter.js';
import {router as userRouter} from './routes/userRouter.js';
import {router as authRouter} from './routes/authRouters.js';


dotenv.config();
const app = express();
/* A configurable port can be used if port 80 is in use */
const port = process.env.PORT || 80;

app.use(express.json());
/*
add static files
there is no __dirname in ES6 modules
*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/', express.static(join(__dirname, '../client')));

app.use('/api', guessNumber);
app.use('/api', topPlayersRouter);
app.use('/api', userRouter);
app.use('/api', authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
