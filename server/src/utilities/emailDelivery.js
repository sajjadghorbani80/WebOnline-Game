/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
/* eslint-disable no-tabs */
import nodemailer from 'nodemailer';
import {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken';
import {SendEmailDto} from '../dtos/SendemailDto.js';
import {ResponseDto} from '../dtos/responseDto.js';
const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '8f5dd8e0a91c87',
    pass: '18db80a01c9d64',
  },
});

/* //////////////////////////// Email verification //////////////////////// */

function sendEmail(mailConfigurations) {
  transporter.sendMail(mailConfigurations, function(error, info) {
    if (error){
      console.log(error);
      throw Error(error)};
    return;
  });
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
        from: 'sandbox.smtp.mailtrap.io',

        to: userEmail,

        // Subject of Email
        subject: 'Verify',

        // This would be the text of email body
        text: `Hi, for reset password, Please follow the given link to verify your email
        http://localhost:${process.env.PORT}/api/verify/${token}`,

      };
      sendEmail(mailConfigurations);
      result.errors = 'webonlinegame.verifyemail.sent';
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
