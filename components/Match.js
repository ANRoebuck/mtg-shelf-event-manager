const { Bye } = require('./Player');

class Match {

  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.complete = false;
    this.result = null;
    player1.addMatch(this);
    player2.addMatch(this);
    this.autoCompleteBye();
  }

  autoCompleteBye = () => {
    if (this.player1 instanceof Bye) {
      this.recordWinner(this.player2);
    }
    if (this.player2 instanceof Bye) {
      this.recordWinner(this.player1);
    }
  }

  isComplete = () => this.complete;

  getResult = () => this.result;

  getPlayers = () => [this.player1, this.player2];

  opponentOf = (player) => {
    if (this.player1.getPlayerId() === player.getPlayerId()) {
      return this.player2;
    }
    if (this.player2.getPlayerId() === player.getPlayerId()) {
      return this.player1;
    }
    return null;
  }

  recordWinner = (player) => {
    if(this.getPlayers().includes(player)) {
      this.result = player.getPlayerId();
      this.complete = true;
    }
  }

  recordDraw = () => {
    this.result = "DRAW";
    this.complete = true;
  };

  getResult = () => this.result;

}


module.exports = {
  Match,
}
