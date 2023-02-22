
const submitBtn = document.getElementById('submit');
const guessInput = document.getElementById('guessinput');
const resultBox = document.getElementById('result-box');


function sendRequest() {
    let inputValue = guessInput.value;
    fetch('/guessnumber/checkanswer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess: inputValue }),
    })
        .then((response) => response.json())
        .then((data) => {
            resultBox.innerHTML += `<p>${data.message}</p>`;
        })
}

submitBtn.addEventListener('click', sendRequest);