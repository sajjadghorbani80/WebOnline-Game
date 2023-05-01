/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import {ReqDto} from '../../dtos/guessNumberDto';
import {errorHandler} from './errorHandler';
import {getTokenFromCookies} from '../../../built/assets/js/tokenHandler';
const checkAnswerBtn = document.getElementById('submit');
const input = document.getElementById('guessinput') as HTMLInputElement | null;
const guessResult = document.getElementById('guess-result');
const gameDiv = document.getElementById('games');
const headline = document.getElementById('headline');
const message1 = document.getElementById('message1');
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
  const token = getTokenFromCookies(window.CONFIG.Token_Header_Key);
  http.setRequestHeader(window.CONFIG.Token_Header_Key, token);
  http.setRequestHeader('Content-Type', 'application/json');
  http.send();
  http.onload = function() {
    const result = JSON.parse(http.response);
    errorHandler(guessResult, result.errors, result.result);
  };
}

// start event
gameBtn.addEventListener('click', () => {
  startGame();
  gameDiv.style.display = 'block';
  gameEvent.style.display = 'none';
  input.value = '';
});

/* //////////////////////////// form validation //////////////////////// */

function formValidation(value) {
  value = value.trim();
  if (value == null || value == '' || value == undefined) {
    errorHandler(errorLabel, 'guessnumber.input.empty');
    return false;
  }

  if (!Number.isInteger(+value)) {
    errorHandler(errorLabel, 'guessnumber.input.isNotInt');
    return false;
  }

  if (+value < 0 || +value > 100) {
    errorHandler(errorLabel, 'guessnumber.input.invalidRange');
    return false;
  }
  return true;
}
/* //////////////////////////// Call API //////////////////////// */

function sendRequest() {
  const token = getTokenFromCookies(window.CONFIG.Token_Header_Key);
  const http = new XMLHttpRequest();
  const url = '/api/guessnumber/checkanswer';
  const params = new ReqDto(input.value);
  http.open('POST', url, true);

  http.setRequestHeader('Content-Type', 'application/json');
  http.setRequestHeader(window.CONFIG.Token_Header_Key, token);
  http.send(JSON.stringify(params));
  http.onload = function() {
    const result = JSON.parse(http.response);
    if (http.status == 400) {
      const firstError = result.errors.errors[0].msg;
      errorHandler(errorLabel, firstError);
    } else {
      errorLabel.style.display = 'none';
      if (result.errors =='webonlinegame.guessnumber.success' || result.errors =='webonlinegame.guessnumber.faild') {
        gameDiv.style.display = 'none';
        headline.style.display = 'none';
        gameEvent.style.display = 'flex';
        errorLabel.style.display = 'none';
        errorHandler(message1, result.errors, result.result);
        return;
      }
      errorHandler(guessResult, result.errors, result.result);
    }
  };
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
});
checkAnswerBtn.addEventListener('click', () => {
  if (formValidation(input.value)) {
    sendRequest();
  };
});


