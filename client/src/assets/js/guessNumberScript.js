/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import {ReqDto} from '../../dtos/guessNumberDto.js';
const btn = document.getElementById('submit');
const input = document.getElementById('guessinput');
const ptag1 = document.getElementById('msg1');
const ptag2 = document.getElementById('msg2');
const ptag3 = document.getElementById('msg3');
const startBtn = document.getElementById('start');
const startGameDiv = document.getElementById('startGame');
const gameDiv = document.getElementById('game');
const endDiv = document.getElementById('endGame');
const restart = document.getElementById('restart');
const homeBtn = document.getElementById('homeIcon');
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');
const form = document.getElementById('form');
/* //////////////////////////// Event Handeling //////////////////////// */

function startGame() {
  const http = new XMLHttpRequest();
  const url = '/api/guessnumber/restart-game';
  http.open('GET', url, true);
  http.setRequestHeader('Content-Type', 'application/json');
  http.send();
}

// start event
startBtn.addEventListener('click', () => {
  startGame();
  gameDiv.style.display = 'block';
  startGameDiv.style.display = 'none';
  ptag1.innerHTML = '';
  ptag2.innerHTML = '';
  ptag3.innerHTML = '';
  input.value = '';
  endDiv.style.display = 'none';
});

// reset event
restart.addEventListener('click', () => {
  startGame();
  gameDiv.style.display = 'block';
  startGameDiv.style.display = 'none';
  endDiv.style.display = 'none';
  homeBtn.style.display = 'block';
});

function startAgian(msg1, msg2) {
  ptag1.innerHTML = '';
  ptag2.innerHTML = '';
  ptag3.innerHTML = '';
  input.value = '';
  homeBtn.style.display = 'none';
  gameDiv.style.display = 'none';
  endDiv.style.display = 'block';
  message1.innerHTML = msg1;
  message2.innerHTML = msg2;
}

/* //////////////////////////// Game message //////////////////////// */

// Send the correct answer to the user's guess
function setMessageByCode(resultDto) {
  switch (resultDto.status) {
    case 0:
      startAgian('You lose :(', 'the Number was ' + resultDto.randomNumber);
      break;
    case 1:
      startAgian('Yahhhh You won It!!', 'the Number was ' +
      resultDto.randomNumber);
      break;
    case 2:
      ptag1.innerHTML = 'Your Guess is Too low';
      ptag2.innerHTML = 'Your Guess ' + resultDto.guess;
      ptag3.innerHTML = 'Remaining Chances ' + resultDto.chance;
      break;
    case 3:
      ptag1.innerHTML = 'Your Guess is Too High';
      ptag2.innerHTML = 'Your Guess ' + resultDto.guess;
      ptag3.innerHTML = 'Remaining Chances ' + resultDto.chance;
      break;
    default:
      break;
  }
}

// Validate the user's guess
function showError(errorMsg) {
  console.log(errorMsg);
  switch (errorMsg) {
    case 'guessnumber.input.empty':
      alert('Input can not be empty');
      break;
    case 'guessnumber.input.isNotInt':
      alert('The entered value must be integer');
      break;
    case 'guessnumber.input.invalidRange':
      alert('Please guess number between 0 to 100!');
      break;
    default:
      alert('Invalid input');
      break;
  }
}

/* //////////////////////////// Call API //////////////////////// */

function sendRequest() {
  const http = new XMLHttpRequest();
  const url = '/api/guessnumber/checkanswer';
  const params = new ReqDto(input.value);
  http.open('POST', url, true);

  http.setRequestHeader('Content-Type', 'application/json');
  http.send(JSON.stringify(params));
  http.onload = function() {
    const result = JSON.parse(http.response);
    if (result.status==400) {
      const firstError = result.errors.errors[0].msg;
      showError(firstError);
    } else {
      setMessageByCode(result.result);
    }
  };
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Form submission cancelled.');
});
btn.addEventListener('click', sendRequest);


