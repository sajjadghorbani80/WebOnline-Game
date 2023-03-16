/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import {ReqDto} from '../../dtos/guessNumberDto.js';
const checkAnswerBtn = document.getElementById('submit');
const input = document.getElementById('guessinput');
const ptag1 = document.getElementById('msg1');
const ptag2 = document.getElementById('msg2');
const ptag3 = document.getElementById('msg3');
const startBtn = document.getElementById('start');
const exitBtn = document.getElementById('exit');
const pauseGameDiv = document.getElementById('startGame');
const gameDiv = document.getElementById('game');
const homeBtn = document.getElementById('homeIcon');
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');
const form = document.getElementById('form');
const errorLabel = document.getElementById('error-label');
const startQuestion = document.getElementById('start-h1');
/* //////////////////////////// Event Handeling //////////////////////// */

function startGame() {
  // generate random number and reset chance
  const http = new XMLHttpRequest();
  const url = '/api/guessnumber/restart-game';
  http.open('GET', url, true);
  http.setRequestHeader('Content-Type', 'application/json');
  http.send();
  // reset ui
  gameDiv.style.display = 'block';
  pauseGameDiv.style.display = 'none';
  ptag1.innerHTML = '';
  ptag2.innerHTML = '';
  ptag3.innerHTML = '';
  input.value = '';
  homeBtn.style.display='block';
}

function stopGame(msg1, msg2) {
  gameDiv.style.display = 'none';
  pauseGameDiv.style.display='block';
  message1.innerHTML = msg1;
  message2.innerHTML = msg2;
  startQuestion.style.display='none';
  startBtn.innerText = 'Restart';
  exitBtn.innerHTML = 'Exit';
}

/* //////////////////////////// Game message //////////////////////// */

// Send the correct answer to the user's guess
function setMessageByCode(resultDto) {
  errorLabel.style.display='none';
  switch (resultDto.status) {
    case 0:
      stopGame('You lose :(', 'the Number was ' + resultDto.randomNumber);
      break;
    case 1:
      stopGame('Yahhhh You won It!!', 'the Number was ' +
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
  errorLabel.style.display='block';
  switch (errorMsg) {
    case 'guessnumber.input.empty':
      errorLabel.innerText='Input can not be empty';
      break;
    case 'guessnumber.input.isNotInt':
      errorLabel.innerText='The entered value must be integer';
      break;
    case 'guessnumber.input.invalidRange':
      errorLabel.innerText='Please guess number between 0 to 100!';
      break;
    default:
      errorLabel.innerText='Invalid input';
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

function formValidation(value) {
  if (value == undefined) {
    showError('Invalid input');
    return false;
  }
  value = value.trim();
  if (value == null || value == '') {
    showError('guessnumber.input.empty');
    return false;
  }

  if (!Number.isInteger(+value)) {
    showError('guessnumber.input.isNotInt');
    return false;
  }

  if (+value <0 || +value >100) {
    showError('guessnumber.input.invalidRange');
    return false;
  }
  return true;
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Form submission cancelled.');
});
checkAnswerBtn.addEventListener('click', ()=>{
  if (formValidation(input.value)) {
    sendRequest();
  };
});
// start event
startBtn.addEventListener('click', startGame);


