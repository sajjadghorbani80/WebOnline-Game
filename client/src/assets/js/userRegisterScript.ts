/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
import {errorHandler} from './errorHandler.js';
// Cache out buttons container, and all of the sections
const buttons = document.querySelector('.buttons');
const signupBtn = document.getElementById('sign-up-btn');
const signinBtn = document.getElementById('sign-in-btn');
const resetPassLink = document.getElementById('resetLink');
const formSection = document.querySelectorAll('.form-section');
const signupForm = document.getElementById('signup-section').getElementsByTagName('input');
const signinForm = document.getElementById('signin-section').getElementsByTagName('input');
const signinError = document.getElementById('signin-error');
const signupError = document.getElementById('signup-error');
const switchSigninBtn = document.getElementById('switch-signin-btn');
const signinsucsess = document.getElementById('signin-sucsess');
const sendEmailBtn = document.getElementById('sendEmail-btn');
const emailInput = document.getElementById('email-verify') as HTMLInputElement | null;
const showMessage = document.getElementById('show-message');


// Add an event listener to the buttons container

buttons.addEventListener('click', handleClick);
resetPassLink.addEventListener('click', handleClick);
// When a child element of `buttons` is clicked
// eslint-disable-next-line require-jsdoc
function handleClick(child:any) {
  // Check to see if its a button or span
  if (child.target.matches('button')||child.target.matches('span')) {
    // For every element in the `sections` node list use `classList`
    // to remove the show class
    formSection.forEach((section) => section.classList.remove('show'));

    // "Destructure" the `id` from the button's data set
    const {id} = child.target.dataset;

    // Create a selector that will match the corresponding
    // section with that id. We're using a template string to
    // help form the selector. Basically it says find me an element
    // with a "form-section" class which also has an id that matches the id of
    // the button's data attribute which we just retrieved.
    const selector = `.form-section[id="${id}"]`;

    // Select the `div` and, using classList, again add the
    // show class
    document.querySelector(selector).classList.add('show');
  }
};


async function signup() {
  const params = {
    fullname: signupForm[0].value,
    username: signupForm[1].value,
    email: signupForm[2].value,
    password: signupForm[3].value,
    repassword: signupForm[4].value,
  };
  const response = await fetch('/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  if (response.status == 400) {
    const firstError = data.errors.errors[0].msg;
    errorHandler(signupError, firstError);
  } else {
    errorHandler(signupError, data.errors);
    if (data.errors == 'webonlinegame.signup.success') {
      errorHandler(signupError, data.errors);
      switchSigninBtn.click();
      signinsucsess.innerHTML = 'signup success! sign in first';
    }
  }
};

async function signin() {
  const params = {
    usernameOrEmail: signinForm[0].value,
    password: signinForm[1].value,
  };
  const response = await fetch('/api/user/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  if (response.status == 400) {
    const firstError = data.errors.errors[0].msg;
    errorHandler(signinError, firstError);
  } else {
    errorHandler(signinError, data.errors);
    if (data.errors == 'webonlinegame.signin.success') {
      document.cookie = `${window.CONFIG.Token_Header_Key}=${data.result};path=/;`;
      window.location.href = '/';
    }
  }
};

async function sendEmail() {
  const params = {
    email: emailInput.value,
  };
  const response = await fetch('/api/user/sendVerifyEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (response.status == 400) {
    const data = await response.json();
    const firstError = data.errors.errors[0].msg;
    errorHandler(showMessage, firstError, null);
  } else {
    const data = await response.json();
    errorHandler(showMessage, data.errors, null);
  }
}

sendEmailBtn.addEventListener('click', sendEmail);
signupBtn.addEventListener('click', signup);
signinBtn.addEventListener('click', signin);


