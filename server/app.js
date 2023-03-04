import express from 'express';
import * as dotenv from 'dotenv';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
import {router as guessNumber} from './routes/guessNumberRoters.js';
dotenv.config();
const app = express();
const port = 80;
app.use(express.json());

/*
add static files
there is no __dirname in ES6 modules
*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/', express.static(join(__dirname, '../client')));


app.use('/api', guessNumber);


app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${process.env.PORT || port}`);
});
