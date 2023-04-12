/* eslint-disable require-jsdoc */

function errorHandler(HtmlTag, errorCode) {
  HtmlTag.style.display = 'block';
  switch (errorCode) {
    case 'email.input.empty':
      HtmlTag.innerHTML = 'Email can not be empty';
      break;
    case 'email.input.invalid':
      HtmlTag.innerHTML = 'Email format is invalid';
      break;
    case 'guessnumber.input.empty':
      HtmlTag.innerHTML = 'Input can not be empty';
      break;

    case 'webonlinegame.verifyemail.sent':
      HtmlTag.innerHTML = 'The activation email has been successfully sent to your email address';
      break;
    case 'webonlinegame.user.notfound':
      HtmlTag.innerHTML = 'No account found with this email';
      break;
    case 'webonlinegame.server.error':
      HtmlTag.innerHTML = 'The server is not responding at the moment';
      break;
    case 'webonlinegame.verifyemail.notsent':
      HtmlTag.innerHTML = 'The activation email was not sent';
      break;
    case 'webonlinegame.token.unauthorize':
      HtmlTag.innerHTML = 'The token is invalid';
      break;
    case 'webonlinegame.resetpass.success':
      HtmlTag.innerHTML = 'Password changed successfully';
      break;
    case 'webonlinegame.resetpass.passwordMisMatch':
      HtmlTag.innerHTML = 'Passwords should be the same';
      break;
    case 'password.input.empty':
      HtmlTag.innerHTML = 'Password can not be empty';
      break;
    case 'repassword.input.empty':
      HtmlTag.innerHTML = 'Confirm password can not be empty';
      break;

    default:
      HtmlTag.innerHTML = 'Unhandled Error';
      break;
  }
}


export {errorHandler};


