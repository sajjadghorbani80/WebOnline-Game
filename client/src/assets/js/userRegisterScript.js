/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
import {errorHandler} from './errorHandler.js';
// Cache out buttons container, and all of the sections
const buttons = document.querySelector('.buttons');
const singupBtn = document.getElementById('sing-up-btn');
const singinBtn = document.getElementById('sing-in-btn');
const resetPassLink = document.getElementById('resetLink');
const formSection = document.querySelectorAll('.form-section');
const singupForm = document.getElementById('signup-section').getElementsByTagName('input');
const singinForm = document.getElementById('signin-section').getElementsByTagName('input');
const singinError = document.getElementById('singin-error');
const singupError = document.getElementById('singup-error');
const switchSigninBtn = document.getElementById('switch-signin-btn');
const signinsucsess = document.getElementById('signin-sucsess');
const sendEmailBtn = document.getElementById('sendEmail-btn');
const emailInput = document.getElementById('email-verify');
const showMessage = document.getElementById('show-message');


// Add an event listener to the buttons container

buttons.addEventListener('click', handleClick);
resetPassLink.addEventListener('click', handleClick);
// When a child element of `buttons` is clicked
// eslint-disable-next-line require-jsdoc
function handleClick(child) {
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


async function singup() {
  const params = {
    fullname: singupForm[0].value,
    username: singupForm[1].value,
    email: singupForm[2].value,
    password: singupForm[3].value,
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
    errorHandler(singupError, firstError);
  } else {
    errorHandler(singupError, data.errors);
    if (data.errors == 'webonlinegame.signup.success') {
      errorHandler(singupError, data.errors);
      switchSigninBtn.click();
      signinsucsess.innerHTML = 'signup success! sign in first';
    }
  }
};

async function singin() {
  const params = {
    usernameOrEmail: singinForm[0].value,
    password: singinForm[1].value,
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
    errorHandler(singinError, firstError);
  } else {
    errorHandler(singinError, data.errors);
    if (data.errors == 'webonlinegame.signin.success') {
      document.cookie = `${window.CONFIG.Token_Header_Key}=${data.result};path=/;`;
      window.location = '/';
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
    errorHandler(showMessage, firstError);
  } else {
    const data = await response.json();
    errorHandler(showMessage, data.errors);
  }
}

sendEmailBtn.addEventListener('click', sendEmail);
singupBtn.addEventListener('click', singup);
singinBtn.addEventListener('click', singin);


