/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable new-cap */
import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';
import {ResponseDto} from '../dtos/responseDto.js';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

function generateToken(userId) {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const data = {
    userId: userId,
  };
  const token = jwt.sign(data, jwtSecretKey, {expiresIn: '1h'});
  return token;
}

function verifyToken(token) {
  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return 'webonlinegame.success.verifyToken';
    } else {
      return 'webonlinegame.error.TokenNotVerifyed';
    }
  } catch (error) {
    return 'webonlinegame.error.servererror';
  }
}

async function userRegister(registerData) {
  const result = new ResponseDto();
  registerData.username = registerData.username.toLowerCase();
  registerData.email = registerData.email.toLowerCase();
  try {
    const username = await prisma.user.count({
      where: {
        username: registerData.username,
      },
    });

    const email = await prisma.user.count({
      where: {
        email: registerData.email,
      },
    });

    if (username != 0) {
      result.status = 4031; // username is exist
      return result;
    } else if (email != 0) {
      result.status = 4032; // email is exist
      return result;
    } else {
      const hash = bcrypt.hashSync(registerData.password, 10);
      try {
        const user = await prisma.user.create({
          data: {
            username: registerData.username,
            email: registerData.email,
            fullname: registerData.fullname,
            password: hash,
          },
        });
        result.status = 200;
        result.result = user;
      } catch (error) {
        result.status = 503; // server error
        return result;
      }
    }
  } catch (err) {
    result.status = 510;
    console.log(err); // Database connection error
    result.errors = err;
    return result;
  };
  return result;
};

async function singIn(userData) {
  const result = new ResponseDto();
  userData.usernameOrEmail = userData.usernameOrEmail.toLowerCase();
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {username: userData.usernameOrEmail},
          {email: userData.usernameOrEmail},
        ],
      },
    });
    if (user != null) {
      const res = bcrypt.compareSync(userData.password, user.password); // true
      if (res) {
        const token = generateToken(user.uid);
        result.status = 200;
        result.result = token;
      } else {
        result.status = 401;
      }
    } else {
      result.status = 401;
    }
    return result;
  } catch (error) {
    result.status = 401;
    return result;
  }
}


function checkToken(req, res, next) {
  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = req.header(tokenHeaderKey);
  if (token) {
    jwt.verify(token, jwtSecretKey, (err, decoded)=> {
      if (err) {
        res.status(403).send({success: false, message: 'Failed to authenticate user.'});
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({success: false, message: 'No Token Provided.'});
  }
}
export {generateToken, verifyToken, userRegister, singIn, checkToken};

