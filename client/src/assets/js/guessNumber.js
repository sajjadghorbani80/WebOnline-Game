/* eslint-disable require-jsdoc */
const btn = document.getElementById('submit');
const input = document.getElementById('guessinput');
const ptag1 = document.getElementById('msg1');
const ptag2 = document.getElementById('msg2');
const ptag3 = document.getElementById('msg3');

function sendRequest() {
  const data = {data: input.value};
  fetch('/api/guessNumber', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
      .then((response) => response.json())
      .then((data) => {
        ptag1.innerHTML = data.msg1;
        ptag2.innerHTML = data.msg2;
        ptag3.innerHTML = data.msg3;
      });
}
btn.addEventListener('click', sendRequest);
