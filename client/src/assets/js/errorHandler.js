/* eslint-disable require-jsdoc */

function errorHandler(HtmlTag, errorCode) {
  HtmlTag.style.display = 'block';
  switch (errorCode) {
    case 'guessnumber.input.empty':
      HtmlTag.innerHTML = 'Input can not be empty';
      break;
    default:
      HtmlTag.innerHTML = 'Unhandled Error';
      break;
  }
}


export {errorHandler};


