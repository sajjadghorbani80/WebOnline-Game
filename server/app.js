/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import express from 'express';
import * as dotenv from 'dotenv';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
import {router as guessNumber} from './routes/guessNumberRouters.js';
import {router as topPlayersRouter} from './routes/topPlayersRouter.js';
import {router as userRouter} from './routes/userRouter.js';
import {router as authRouter} from './routes/authRouters.js';
import expressSession from 'express-session';
import {PrismaSessionStore} from '@quixo3/prisma-session-store';
import {PrismaClient} from '@prisma/client';


dotenv.config();
const app = express();
/* A configurable port can be used if port 80 is in use */
const port = process.env.NODE_DOCKER_PORT || 80;

app.use(express.json());
/*
add static files
there is no __dirname in ES6 modules
*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/', express.static(join(__dirname, '../client')));
app.use( expressSession({
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // ms
  },
  secret: process.env.SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000, // ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      },
  ),
}));
app.use('/api', guessNumber);
app.use('/api', topPlayersRouter);
app.use('/api', userRouter);
app.use('/api', authRouter);
app.get('*', (req, res)=> {
  res.redirect(`http://localhost:${process.env.NODE_LOCAL_PORT}/src/views/error.html?error=404`);
});

app.listen(port, ()=> console.log(`backend server running on port ${process.env.NODE_DOCKER_PORT}`));
