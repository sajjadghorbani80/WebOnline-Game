/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
/* eslint-disable no-tabs */
import nodemailer from 'nodemailer';
import {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken';
import {SendEmailDto} from '../dtos/SendemailDto.js';

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'c387f3a49c1e8c',
    pass: 'c4abf742876ed5',
  },
});

function sendVerifyEmail(reqSendEmail) {
  const secretkey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({
    email: reqSendEmail.to,
  }, secretkey, {expiresIn: '10m'},
  );
  const mailConfigurations = {

    // It should be a string of sender/server email
    from: reqSendEmail.from,

    to: reqSendEmail.to,

    // Subject of Email
    subject: reqSendEmail.subject,

    // This would be the text of email body
    text: `Hi, for reset password, Please follow the given link to verify your email
          http://localhost:${process.env.PORT}/api/verify/${token}
          Thanks`,

  };

  sendEmail(mailConfigurations);
}


function sendEmail(mailConfigurations) {
  transporter.sendMail(mailConfigurations, function(error, info) {
    if (error) throw Error(error);
    console.log('Email Sent Successfully');
    console.log(info);
  });
}


export {sendVerifyEmail};
