/* eslint-disable max-len */
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
      HtmlTag.innerHTML = `Yahhhh You won It!! <br> the Number was ${dataObj.randomNumber} <br> Do You wanna play agian?`;
      break;
    case 'webonlinegame.guessnumber.tolow':
      HtmlTag.innerHTML = `Your Guess is Too Low <br> Your Guess ${dataObj.guess} <br> Remaining Chances ${dataObj.chance}`;
      break;
    case 'webonlinegame.guessnumber.tohigh':
      HtmlTag.innerHTML = `Your Guess is Too High <br> Your Guess ${dataObj.guess} <br> Remaining Chances ${dataObj.chance}`;
      break;
    case 'webonlinegame.guessnumber.faild':
      HtmlTag.innerHTML = `You lose :( <br> the Number was ${dataObj.randomNumber} <br> Do You wanna play agian?`;
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
    default:
      HtmlTag.innerHTML = 'Unhandled Error';
      break;
  }
}


export {errorHandler};


