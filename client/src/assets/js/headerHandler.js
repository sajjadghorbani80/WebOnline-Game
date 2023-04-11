/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {getTokenFromCookies, parseJwt} from './tokenHandler.js';
const headerContainer = document.getElementById('includedContent');
headerLoader();
async function headerLoader() {
  const tokenInCookies = getTokenFromCookies('gfg_token_header_key');
  if (tokenInCookies) {
    const tokenData = parseJwt(tokenInCookies);
    const userData = await getCurrentUserInfo(tokenData.userId);
    headerContainer.innerHTML = `<div class="header-container" id="header-html">
    <div class="logo-section w-10">
        <img id="img-logo" class="logo" src="./../../src/assets/images/pslogo.png" alt="" />
    </div>
    <div class="w-50">
        <ul class="menu-nav">
            <li class="underline-active"><a href="./../../index.html">Home</a></li>
            <li class="underline-active"><a href="./../../index.html#topPlayerSection">Scoreboard</a></li>
        </ul>
    </div>
    <div class="profile-section w-50">
        <div class="user-menu-section">
            <div class="username">
                <p id="userFullname">${userData.fullName}</p>&nbsp;&nbsp;
            </div>
            <img id="img-profile" class="profile-circle" src="./../../src/assets/images/profile-pic.jpg" alt="" />
            <div class="dropdown-content">
                <div class="dropdown-item" title="Score">
                    <span><i class="fa-solid fa-star" style="color: #c0c0c0;"></i></span>
                    <span id="userScore">${userData.sumScore}</span>
                </div>
                <div class="dropdown-item" title="Rank">
                    <span><i class="fa-solid fa-medal" style="color: #c0c0c0;"></i></span>
                    <span id="userRank">${userData.rank}</span>
                </div>
                <div class="dropdown-item" title="Number of times played">
                    <span><i class="fa-solid fa-rotate-right" style="color: #c0c0c0;"></i></span>
                    <span id="userPlayCount">${userData.playCount}</span>
                </div>
                <a href="/src/views/resetPass.html">Change Password</a>
                <a href="#">Logout</a>
            </div>
        </div>
    </div>
  </div>`;
  } else {
    headerContainer.innerHTML = `<div class="header-container" id="header-html">
    <div class="logo-section w-10">
        <img id="img-logo" class="logo" src="./../../src/assets/images/pslogo.png" alt="" />
    </div>
    <div class="w-50">
        <ul class="menu-nav">
            <li class="underline-active"><a href="./../../index.html">Home</a></li>
            <li class="underline-active"><a href="./../../index.html#topPlayerSection">Scoreboard</a></li>
        </ul>
    </div>
    <div class="profile-section w-50">
        <div id="login-sction" class="underline-active">
            <a href="./src/views/userRegister.html"><i class="fa-solid fa-user"></i>&nbsp;&nbsp;Sign In</a>
        </div>
    </div>
  </div>`;
  }
}

async function getCurrentUserInfo(userId) {
  const response = await fetch(`http://localhost:3000/api/getcurrentuserinfo/${userId}`, {
    method: 'GET',
  })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
        return data.result;
      });

  return response;
};
