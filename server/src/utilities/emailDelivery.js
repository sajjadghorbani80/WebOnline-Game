/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
/* eslint-disable no-tabs */
import nodemailer from 'nodemailer';
import {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken';
import {ResponseDto} from '../dtos/responseDto.js';
const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  tls: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* //////////////////////////// Email verification //////////////////////// */

function sendEmail(mailConfigurations) {
  try {
    transporter.sendMail(mailConfigurations, function(error, info) {
      if (error) {
        console.log(error);
        throw Error(error);
      }
    });
    return 'webonlinegame.verifyemail.sent';
  } catch (error) {
    return 'webonlinegame.server.error';
  }
}


async function sendVerifyUserEmail(userEmail) {
  const result = new ResponseDto();
  userEmail = userEmail.toLowerCase();
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    });
    if (user == undefined) {
      result.errors = 'webonlinegame.user.notfound';
      return result;
    }
    try {
      const secretkey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({email: userEmail}, secretkey, {expiresIn: '10m'});
      const mailConfigurations = {

        // It should be a string of sender/server email
        from: process.env.SMTP_EMAIL_ADDRESS,

        to: userEmail,

        // Subject of Email
        subject: 'Verify',

        // This would be the text of email body
        text: `Hi, for reset password, Please follow the given link to verify your email
        http://localhost:${process.env.NODE_LOCAL_PORT}/api/verify/${token}`,

      };
      const resEmail = sendEmail(mailConfigurations);
      result.errors = resEmail;
    } catch (error) {
      result.errors = 'webonlinegame.verifyemail.notsent';
    }
    return result;
  } catch (error) {
    result.errors = 'webonlinegame.server.error';
    return result;
  }
}


export {sendVerifyUserEmail};
