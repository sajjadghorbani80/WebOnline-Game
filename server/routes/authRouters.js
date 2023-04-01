/* eslint-disable new-cap */
import jwt from 'jsonwebtoken';
import {Router} from 'express';
const router = Router();

router.post('/user/generateToken', (req, res) => {
  // Validate User Here
  // Then generate JWT Token

  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const data = {
    time: Date(),
    userId: 12,
  };

  const token = jwt.sign(data, jwtSecretKey, {expiresIn: '1h'});
  res.send(token);
});

router.get('/user/validateToken', (req, res) => {
  // Tokens are generally passed in the header of the request
  // Due to security reasons.

  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send('Successfully Verified');
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
});

export {router};
