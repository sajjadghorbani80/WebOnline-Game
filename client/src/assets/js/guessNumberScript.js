/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import {ReqDto} from '../../dtos/guessNumberDto.js';
const checkAnswerBtn = document.getElementById('submit');
const input = document.getElementById('guessinput');
const resultMessage1 = document.getElementById('pTag1');
const resultMessage2 = document.getElementById('pTag2');
const resultMessage3 = document.getElementById('pTag3');
const gameDiv = document.getElementById('games');
const homeBtn = document.getElementById('homeIcon');
const headline = document.getElementById('headline');
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');
const message3 = document.getElementById('message3');
const form = document.getElementById('form');
const gameBtn = document.getElementById('gameBtn');
const gameEvent = document.getElementById('gameEvent');
const errorLabel = document.getElementById('errorMessage');
/* //////////////////////////// Event Handeling //////////////////////// */

function startGame() {
  // generate random number and reset chance
  const http = new XMLHttpRequest();
  const url = '/api/guessnumber/restart-game';
  http.open('GET', url, true);
  http.setRequestHeader('Content-Type', 'application/json');
  http.send();
}

// start event
gameBtn.addEventListener('click', () => {
  startGame();
  gameDiv.style.display = 'block';
  gameEvent.style.display = 'none';
  resultMessage1.innerHTML = 'You haven\'t guessed yet!';
  resultMessage2.innerHTML = 'Start game with your first GUESS!';
  resultMessage3.innerHTML = 'Remaining Chances 5';
  homeBtn.style.display = 'block';
  input.value = '';
});


// this function add result game's messages to html
function setMessageToHtml(ptag1, ptag2, ptag3, offDisplay, onDisplay) {
  resultMessage1.innerHTML = ptag1;
  resultMessage2.innerHTML = ptag2;
  resultMessage3.innerHTML = ptag3;
  headline.innerHTML = '';
  message1.innerHTML = ptag1;
  message2.innerHTML = ptag2;
  message3.innerHTML = ptag3;
  gameEvent.style.display = onDisplay;
  homeBtn.style.display = offDisplay;
  gameDiv.style.display = offDisplay;
  errorLabel.style.display = 'none';
}
/* //////////////////////////// Game message //////////////////////// */

/* create result game's messages by status code and
 set them in html with setMessageToHtml function */
function messageGeneratorByCode(resultDto) {
  switch (resultDto.status) {
    case 0:
      setMessageToHtml(
          'You lose :(',
          'the Number was ' + resultDto.randomNumber,
          'Do You wanna play agian?',
          'none',
          'block');
      break;
    case 1:
      setMessageToHtml(
          'Yahhhh You won It!!',
          'the Number was ' + resultDto.randomNumber,
          'Do You wanna play agian?',
          'none',
          'block');
      break;
    case 2:
      setMessageToHtml(
          'Your Guess is Too low',
          'Your Guess ' + resultDto.guess,
          'Remaining Chances ' + resultDto.chance);
      break;
    case 3:
      setMessageToHtml(
          'Your Guess is Too High',
          'Your Guess ' + resultDto.guess,
          'Remaining Chances ' + resultDto.chance);
      break;
    default:
      break;
  }
}

/* //////////////////////////// form validation //////////////////////// */

function setErrorMessage(errorMsg) {
  errorLabel.style.display = 'block';
  switch (errorMsg) {
    case 'guessnumber.input.empty':
      errorLabel.innerText = 'Input can not be empty';
      break;
    case 'guessnumber.input.isNotInt':
      errorLabel.innerText = 'The entered value must be integer';
      break;
    case 'guessnumber.input.invalidRange':
      errorLabel.innerText = 'Please guess number between 0 to 100!';
      break;
    default:
      errorLabel.innerText = 'Invalid input';
      break;
  }
}

// from front

function formValidation(value) {
  if (value == undefined) {
    setErrorMessage('Invalid input');
    return false;
  }
  value = value.trim();
  if (value == null || value == '') {
    setErrorMessage('guessnumber.input.empty');
    return false;
  }

  if (!Number.isInteger(+value)) {
    setErrorMessage('guessnumber.input.isNotInt');
    return false;
  }

  if (+value < 0 || +value > 100) {
    setErrorMessage('guessnumber.input.invalidRange');
    return false;
  }
  return true;
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
    if (result.status == 400) {
      const firstError = result.errors.errors[0].msg;
      setErrorMessage(firstError);
    } else {
      messageGeneratorByCode(result.result);
    }
  };
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Form submission cancelled.');
});
checkAnswerBtn.addEventListener('click', () => {
  if (formValidation(input.value)) {
    sendRequest();
  };
});


