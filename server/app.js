import express from 'express';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
import {guessNumber} from './src/services/guess-number.js';
const app = express();
const port = 80;
app.use(express.json());

/*
Add static file to Server
There is no __dirname in ES module
*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/', express.static(join(__dirname, '../client')));

app.post('/guessNumber', (req, res) => {
  const guess = req.body.data;
  const result = guessNumber(guess);
  res.status(200).send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://127.0.0.1/`);
});
