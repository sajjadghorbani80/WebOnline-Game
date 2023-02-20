import express from 'express';
const app = express();
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const port = 3000;
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use('/',express.static(join(__dirname,'../client')));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});