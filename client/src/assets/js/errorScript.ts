/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const errorMessage = document.getElementById('error-message');

window.addEventListener('load', (event) =>{

  showError()

});
function showError() {
  const url = new URL(window.location.toString());
  const error = url.searchParams.get('error');
  switch (error) {
    case '404':
      errorMessage.innerHTML = `404`;
      errorMessage.classList.remove('error');
      errorMessage.classList.add('not-found');
      break;
    case 'notverify':
      errorMessage.innerHTML = `Email verification failed <br> the link is invalid or expired`;
      errorMessage.classList.add('error');
      errorMessage.classList.remove('not-found');
      break;

    default:
      break;
  }
};