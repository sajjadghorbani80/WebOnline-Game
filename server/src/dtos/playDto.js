/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
export class PlayDto {
  userId;
  gameId;
  score;

  constructor(userId, gameId, score) {
    this.userId = userId;
    this.gameId = gameId;
    this.score = score;
  }
}
