/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable new-cap */
import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';
import {ResponseDto} from '../dtos/responseDto.js';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

function generateToken(userId, email) {
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
  try {
    const username = await prisma.$exists.user({
      username: registerData.username,
    });
    const email = await prisma.$exists.user({
      email: registerData.email,
    });

    if (username == true) {
      result.status = 4031; // username is exist
      return result;
    } else if (email == true) {
      result.status = 4032; // email is exist
      return result;
    } else {
      bcrypt.hash(registerData.password, 10, async (err, hash) => {
        if (err) {
          result.status = 500; // can not hash password
          result.errors = err;
        }
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
          return result;
        } catch (error) {
          result.status = 503; // server error
          return result;
        }
      });
    }
  } catch (err) {
    result.status = 510; // Database connection error
    result.errors = err;
  };
};

export {generateToken, verifyToken, userRegister};
