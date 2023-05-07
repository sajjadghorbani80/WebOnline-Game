/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const resetPassBtn = document.getElementById('resetpass-btn');
const passwordInput = document.getElementById('password') as HTMLInputElement | null;
const repasswordInput = document.getElementById('re-password') as HTMLInputElement | null;
const showMessage = document.getElementById('show-message');
import {errorHandler} from './errorHandler.js';
import {resetPassDto} from '../../dtos/resetPassDto.js'
import {getTokenFromCookies} from './tokenHandler.js';
import {CONFIG} from './config.js';


async function resetPassword() {
  const params :resetPassDto = {
    password: passwordInput?.value,
    repassword: repasswordInput?.value,
    token :null
  };
  const url = new URL(window.location.toString());
  const token: string = url.searchParams.get('token');
  params.token = token || getTokenFromCookies(CONFIG.Token_Header_Key);

  const response = await fetch('/api/user/resetpass', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (response.status == 400) {
    const data = await response.json();
    const firstError = data.errors.errors[0].msg;
    errorHandler(showMessage, firstError);
  } else {
    const data = await response.json();
    errorHandler(showMessage, data.errors);
  }
}

resetPassBtn.addEventListener('click', resetPassword);
