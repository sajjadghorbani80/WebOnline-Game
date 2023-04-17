/* eslint-disable require-jsdoc */

function errorHandler(HtmlTag, errorCode, display, dataObj) {
  HtmlTag.style.display = display || 'block';
  switch (errorCode) {
    // for signin errors
    case 'webonlinegame.signin.success':
      HtmlTag.innerHTML = 'User successfully signin';
      break;
    case 'webonlinegame.signin.invalidcredentials':
      HtmlTag.innerHTML = 'Invalid credentials';
      break;
    case 'usernameOrEmail.input.empty':
      HtmlTag.innerHTML = 'Username or Email can not be empty';
      break;
    case 'password.input.empty':
      HtmlTag.innerHTML = 'Password can not be empty';
      break;
    // for singup errors
    case 'webonlinegame.signup.success':
      HtmlTag.innerHTML = 'User successfully signup';
      break;
    case 'webonlinegame.username.isexist':
      HtmlTag.innerHTML = 'Username is already exist';
      break;
    case 'webonlinegame.email.isexist':
      HtmlTag.innerHTML = 'Email is already exist';
      break;
    case 'username.input.empty':
      HtmlTag.innerHTML = 'Username can not be empty';
      break;
    case 'email.input.empty':
      HtmlTag.innerHTML = 'Email can not be empty';
      break;
    case 'email.input.invalid':
      HtmlTag.innerHTML = 'Email is not valid';
      break;
    case 'fullname.input.empty':
      HtmlTag.innerHTML = 'Full Name can not be empty';
      break;
      // for checkAnswer
    case 'webonlinegame.guessnumber.success':
      HtmlTag.innerHTML = `Yahhhh You won It!! <br> the Number was
      ${dataObj.randomNumber} <br> Do You wanna play agian?`;
      break;
    case 'webonlinegame.guessnumber.tolow':
      HtmlTag.innerHTML = `Your Guess is Too Low <br> Your Guess
      ${dataObj.guess} <br> Remaining Chances ${dataObj.chance}`;
      break;
    case 'webonlinegame.guessnumber.tohigh':
      HtmlTag.innerHTML = `Your Guess is Too High <br> Your Guess
      ${dataObj.guess} <br> Remaining Chances ${dataObj.chance}`;
      break;
    case 'webonlinegame.guessnumber.faild':
      HtmlTag.innerHTML = `You lose :( <br> the Number was
        ${dataObj.randomNumber} <br> Do You wanna play agian?`;
      break;
    case 'guessnumber.input.empty':
      HtmlTag.innerHTML = 'Input can not be empty';
      break;
    case 'guessnumber.input.isNotInt':
      HtmlTag.innerHTML = 'Input must be integer';
      break;
    case 'guessnumber.input.invalidRange':
      HtmlTag.innerHTML = 'Number must be between 0 and 100';
      break;
    case 'webonlinegame.guessnumber.restarted':
      HtmlTag.innerHTML = `You haven\'t guessed yet! <br>
      Start game with your first GUESS! <br> 
      Remaining Chances 5`;
      break;
      // for getTopPlayers
    case 'webonlinegame.gettopplayers.success':
      HtmlTag.innerHTML = 'User scores counted';
      break;
      // for reset password
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
    case 'webonlinegame.verifyemail.notsent':
      HtmlTag.innerHTML = 'The activation email was not sent';
      break;
    case 'webonlinegame.token.unauthorize':
      HtmlTag.innerHTML = 'The token is invalid';
      break;
      // for checktoken
    case 'webonlinegame.error.TokenNotVerifyed':
    case 'webonlinegame.error.NoTokenProvided':
      window.location = '/src/views/userRegister.html';
      break;
      // they are global error
    case 'webonlinegame.record.NotFound':
      HtmlTag.innerHTML = 'record not found';

    case 'webonlinegame.verifyemail.sent':
      HtmlTag.innerHTML =
      'The activation email has been successfully sent to your email address';
      break;
    case 'webonlinegame.user.notfound':
      HtmlTag.innerHTML = 'No account found with this email';
      break;
    case 'webonlinegame.play.notfound':
      HtmlTag.innerHTML = 'No plays found for this user';
      break;
    case 'webonlinegame.server.error':
      HtmlTag.innerHTML = 'The server is not responding at the moment';
      break;

    default:
      HtmlTag.innerHTML = 'Unhandled Error';
      break;
  }
}


export {errorHandler};


