/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable new-cap */
import bcrypt from 'bcrypt';
import {prisma} from './prismaClient.js';
import {ResponseDto} from '../dtos/responseDto.js';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { tokenData } from '../dtos/tokenDto.js';
import { ReqSignUpDto , ReqSignInDto} from '../dtos/userRegisterDto.js';
import { User } from '@prisma/client';

/* //////////////////////////// token jwt //////////////////////// */

function generateToken(userId:number, userEmail:string) {
  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const data:tokenData = { // options that will be in token
      userId: userId,
      email: userEmail,
    };
    const token = jwt.sign(data, jwtSecretKey, {expiresIn: '5h'});
    return token;
  } catch (error) {
    return 'webonlinegame.server.error';
  }
}


function checkToken(req: Request & { decoded:string | jwt.JwtPayload }, res: Response, next: NextFunction) {
  const response: ResponseDto<null> = {
    result:null,
    errors: null
  };
  try {
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.header(tokenHeaderKey);
    req.headers 
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
    response.errors = 'webonlinegame.server.error';
    res.status(500).send(response);
  }
}

/* //////////////////////////// signin and sign up //////////////////////// */

async function signup(registerData: ReqSignUpDto) {
  const response : ResponseDto<User> = {result:null, errors:null};
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
      response.errors = 'webonlinegame.username.isexist'; // username is exist
      return response;
    } else if (email != 0) {
      response.errors = 'webonlinegame.email.isexist'; // email is exist
      return response;
    } else {
      if (registerData.password != registerData.repassword) {
        response.errors = 'webonlinegame.password.notmatch';
        return response;
      }
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
        response.errors = 'webonlinegame.signup.success';
        response.result = user;
      } catch (error) {
        response.errors = 'webonlinegame.server.error';
        return response;
      }
    }
  } catch (err) {
    response.errors = 'webonlinegame.server.error';
    response.errors = err;
    return response;
  };
  return response;
};

async function signin(userData: ReqSignInDto) {
  const response: ResponseDto<string> = {result: null, errors: null}
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
        response.errors = 'webonlinegame.signin.success';
        response.result = token;
      } else {
        response.errors = 'webonlinegame.signin.invalidcredentials';
      }
    } else {
      response.errors = 'webonlinegame.user.notfound';
    }
    return response;
  } catch (error) {
    response.errors = 'webonlinegame.server.error';
    return response;
  }
}


export {generateToken, signup, signin, checkToken};

