/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable new-cap */
import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';
import {ResponseDto} from '../dtos/responseDto.js';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();


/* //////////////////////////// token jwt //////////////////////// */

function generateToken(userId, userEmail) {
  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const data = { // options that will be in token
      userId: userId,
      email: userEmail,
    };
    const token = jwt.sign(data, jwtSecretKey, {expiresIn: '5h'});
    return token;
  } catch (error) {
    return 'webonlinegame.server.error';
  }
}

function checkToken(req, res, next) {
  const response = new ResponseDto();
  try {
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.header(tokenHeaderKey);
    if (token) {
      jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
          response.errors = 'webonlinegame.error.TokenNotVerifyed';
          res.status(403).send(response);
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      response.errors = 'webonlinegame.error.NoTokenProvided';
      res.status(403).send(response);
    }
  } catch (error) {
    response.errors = 'webonlinegame.error.servererror';
    res.status(500).send(response);
  }
}

/* //////////////////////////// singin and sing up //////////////////////// */

async function signup(registerData) {
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
      result.errors = 'webonlinegame.username.isexist'; // username is exist
      return result;
    } else if (email != 0) {
      result.errors = 'webonlinegame.email.isexist'; // email is exist
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
        result.errors = 'webonlinegame.signup.success';
        result.result = user;
      } catch (error) {
        result.errors = 'webonlinegame.server.error';
        return result;
      }
    }
  } catch (err) {
    result.errors = 'webonlinegame.server.error';
    console.log(err); // Database connection error
    result.errors = err;
    return result;
  };
  return result;
};

async function signin(userData) {
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
    if (user != undefined) {
      const res = bcrypt.compareSync(userData.password, user.password); // true
      if (res) {
        const token = generateToken(user.uid, user.email);
        result.errors = 'webonlinegame.signin.success';
        result.result = token;
      } else {
        result.errors = 'webonlinegame.signin.invalidcredentials';
      }
    } else {
      result.errors = 'webonlinegame.user.notfound';
    }
    return result;
  } catch (error) {
    result.errors = 'webonlinegame.server.error';
    return result;
  }
}


export {generateToken, signup, signin, checkToken};

