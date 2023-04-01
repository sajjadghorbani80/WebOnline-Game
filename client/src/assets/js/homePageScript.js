/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
const topPlayerSection = document.getElementById('topPlayerSection');
window.onload = showTopPlayers();

async function getTopPlayers(count) {
  const params = {
    count,
  };
  const response = await fetch('/api/gettopplayers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });

  return response;
}

async function showTopPlayers() {
  const proficPicArr = ['./src/assets/images/cat-pic.jpeg',
    './src/assets/images/profile-pic.jpg',
    './src/assets/images/pic-avatar.jpeg'];
  const ranks = ['1st', '2nd', '3rd']
  const players = await getTopPlayers(3);

  if (players.result != null) {
    for (let i = 0; i < players.result.length; i++) {
      const player = players.result[i];
      topPlayerSection.innerHTML +=
                `<div class="topPlayerBox">
        <div class="playerPic">
          <img class="topPlayerPic" title="${ranks[i]} Player" src="${proficPicArr[i]}" alt="">
        </div>
        <div class="playerName">
          <p class="topPlayerName">${player.fullName}</p>
          <p class="topUsername">${player.userName}</p>
        </div>
        <div class="scoreSection">
          <div class="playerScore" title="Score">
            <i class="fa-solid fa-medal" style="color: #7a7a7a;font-size: 20pt;margin-right: 10%;"></i>
            <div class="scoreDetails">
              <p style="font-size: 10pt;">Score:</p>
              <p>${player.sumScore}</p>
            </div>
          </div>
          <div class="playerScore" title="number of times played">
            <i class="fa-solid fa-rotate-right" style="color: #ff9300;font-size: 20pt;margin-right: 10%;"></i>
            <div class="scoreDetails">
              <p style="font-size: 10pt;">Times:</p>
              <p>${player.PlayCount}</p>
            </div>
          </div>
        </div>
      </div>`;
    }
    players.result.forEach((player) => {

    });
    // change position of first and second player
    const secondPlayer = document.querySelector('div.topPlayerBox:nth-child(2)');
    secondPlayer.parentNode.insertBefore(secondPlayer,
        secondPlayer.parentNode.firstChild);
  } else {
    topPlayerSection.innerHTML = `<p>Be the best player. Play now!<p>`;
    topPlayerSection.style.justifyContent = 'center';
  }
}
