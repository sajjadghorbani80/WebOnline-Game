/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import {ReqDto} from '../../dtos/guessNumberDto.js';
const btn = document.getElementById('submit');
const input = document.getElementById('guessinput');
const ptag1 = document.getElementById('msg1');
const ptag2 = document.getElementById('msg2');
const ptag3 = document.getElementById('msg3');
const start = document.getElementById('start');
const startGameDiv = document.getElementById('startGame');
const game = document.getElementById('game');
const end = document.getElementById('endGame');
const restart = document.getElementById('restart');
game.style.display = 'none';

/* //////////////////////////// Event Handeling //////////////////////// */

function startGame() {
  fetch('/api/guessnumber/restart-game', {
    method: 'GET',
  })
      .then(resetElements());
}

// start event
start.addEventListener('click', () => {
  startGame();
  if (game.style.display === 'none') {
    game.style.display = 'block';
  } else {
    game.style.display = 'none';
  }
  const buttons = document.getElementById('startGame');
  buttons.style.display = 'none';
});

function resetElements() {
  ptag1.innerHTML = '';
  ptag2.innerHTML = '';
  ptag3.innerHTML = '';
  input.value = '';
  end.style.display = 'none';
}
// reset event
restart.addEventListener('click', () => {
  game.style.display = 'none';
  startGameDiv.style.display = 'block';
});

/* //////////////////////////// Game message //////////////////////// */

// Send the correct answer to the user's guess
function setMessageByCode(resultDto) {
  switch (resultDto.status) {
    case 0:
      ptag1.innerHTML = 'You lose :(';
      ptag2.innerHTML = 'the Number was ' + resultDto.randomNumber;
      ptag3.innerHTML = 'Do you wanna paly again?';
      end.style.display = 'block';
      break;
    case 1:
      ptag1.innerHTML = 'Yahhhh You won It!!';
      ptag2.innerHTML = 'the Number was ' + resultDto.randomNumber;
      ptag3.innerHTML = '';
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
      alert('input can not be empty');
      break;
    case 'guessnumber.input.isNotInt':
      alert('The entered number must be Integer');
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
  const data = new ReqDto(input.value);
  fetch('/api/guessNumber/checkGuess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
      .then((response) => response.json())
      .then((data) => {
        if (data.status==400) {
          const firstError = data.error.errors[0].msg;
          showError(firstError);
        } else {
          setMessageByCode(data.result);
        }
      });
}

btn.addEventListener('click', sendRequest);


