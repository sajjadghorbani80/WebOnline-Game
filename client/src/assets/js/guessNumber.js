/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
import {ReqDto} from '../../dtos/guessNumberDto.js';
const btn = document.getElementById('submit');
const input = document.getElementById('guessinput');
const ptag1 = document.getElementById('msg1');
const ptag2 = document.getElementById('msg2');
const ptag3 = document.getElementById('msg3');

function sendRequest() {
  const data = new ReqDto(input.value);
  fetch('/api/guessNumber', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
        setMessageByCode(data.result);
      });
}

function setMessageByCode(resultDto) {
  switch (resultDto.status) {
    case 0:
      ptag1.innerHTML = 'You lose :(';
      ptag2.innerHTML = 'the Number was ' + resultDto.randomNumber;
      ptag3.innerHTML = '';
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
btn.addEventListener('click', sendRequest);
