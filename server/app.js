/* eslint-disable linebreak-style */
import express from 'express';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
import {chance, checkanswer} from './src/services/guess-number.js';
/*
Alternative for __dirname in Node.js when using ES6 modules
*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
/* A configurable port can be used if port 80 is in use */
const port = process.env.PORT || 80;


app.use(express.json());
app.use('/', express.static(join(__dirname, '../client')));


app.post('/guessnumber/checkanswer', (req, res) => {
  const guess = req.body.guess;
  console.log(guess);
  const message = checkanswer(guess);
  res.send(JSON.stringify({'message': message, 'chance': chance}));
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
