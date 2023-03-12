/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
// import {ReqDto} from '../../dtos/guessNumberDto.js';
const checkAnswerBtn = document.getElementById('submit');
const input = document.getElementById('guessinput');
const startBtn = document.getElementById('start-btn');
const exitBtn = document.getElementById('exit-btn');
const ptag1 = document.getElementById('msg1');
const ptag2 = document.getElementById('msg2');
const ptag3 = document.getElementById('msg3');
const gameScene = document.getElementById('game-scene');
const restartScene = document.getElementById('restart-scene');
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');
const showReslut = document.getElementById('show-result');
const homeBtn = document.getElementById('home-btn');

// fetch method
// function sendRequest() {
//   const data = new ReqDto(input.value);
//   fetch('/api/guessnumber/checkanswer', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.status==400) {
//           const firstError = data.errors.errors[0].msg;
//           showError(firstError);
//         } else {
//           setMessageByCode(data.result);
//         }
//       });
// }

// XMLHttpRequest method
function sendRequest() {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/guessnumber/checkanswer');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function(event) {
    const data = JSON.parse(event.target.response); // raw response
    if (data.status == 400) {
      const firstError = data.errors.errors[0].msg;
      showError(firstError);
    } else {
      setMessageByCode(data.result);
    }
  };
  // or onerror, onabort
  const formData = new FormData(document.getElementById('guessForm'));
  const object = {};
  formData.forEach((value, key) => object[key] = +value);
  const json = JSON.stringify(object);
  xhr.send(json);
}

function showError(errorMsg) {
  console.log(errorMsg);
  switch (errorMsg) {
    case 'guessnumber.input.empty':
      alert('مقدار ورودی نمی‌تواند خالی باشد.');
      break;
    case 'guessnumber.input.isNotInt':
      alert('مقدار ورودی فقط می‌تواند عدد صحیح باشد.');
      break;
    case 'guessnumber.input.invalidRange':
      alert('مقدار ورودی باید عددی بین 0 تا 100 باشد.');
      break;
    default:
      alert('مقدار ورودی نامعتبر است.');
      break;
  }
}
function setMessageByCode(resultDto) {
  switch (resultDto.status) {
    case 0:
      showReslutBox('You lose :(', 'the Number was ' + resultDto.randomNumber);
      break;
    case 1:
      showReslutBox('Yahhhh You won It!!', 'the Number was ' +
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
function showReslutBox(msg1, msg2) {
  gameScene.style.display = 'none';
  startBtn.innerText = 'Restart';
  restartScene.style.display = 'flex';
  showReslut.style.display = 'block';
  message1.innerHTML = msg1;
  message2.innerHTML = msg2;
}
function resetElements() {
  restartScene.style.display = 'none';
  showReslut.style.display = 'none';
  ptag1.innerHTML = '';
  ptag2.innerHTML = '';
  ptag3.innerHTML = '';
  input.value = '';
  gameScene.style.display = 'block';
}
// fetch method
// function startGame() {
//   fetch('/api/guessnumber/restart-game', {
//     method: 'GET',
//   })
//       .then(resetElements());
// }

// XMLHttpRequest method
function startGame() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/guessnumber/restart-game');
  xhr.onload = function(event) {
    resetElements();
  };
  xhr.send();
}

function exitGame() {
  const currentUrl = window.location.href;
  const homePage = currentUrl.split('/')[2];
  return window.location.href = 'http://' + homePage;
}
checkAnswerBtn.addEventListener('click', sendRequest);
startBtn.addEventListener('click', startGame);
exitBtn.addEventListener('click', exitGame);
homeBtn.addEventListener('click', exitGame);
const form = document.getElementById('guessForm');
function handleForm(event) {
  event.preventDefault();
}
form.addEventListener('submit', handleForm);
