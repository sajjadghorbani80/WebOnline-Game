/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const sendEmailBtn = document.getElementById('sendEmail-btn');
const resetPassBtn = document.getElementById('resetpass-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const repasswordInput = document.getElementById('re-password');

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
  })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
}

sendEmailBtn.addEventListener('click', sendEmail);
