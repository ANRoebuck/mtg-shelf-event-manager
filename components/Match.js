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
      this.recordWinner(this.player2.getPlayerId());
    }
    if (this.player2 instanceof Bye) {
      this.recordWinner(this.player1.getPlayerId());
    }
  };

  isComplete = () => this.complete;

  getResult = () => this.result;

  getPlayers = () => [this.player1, this.player2];

  // ALLOW TYPE COERCION. '10' must equal 10
  featuresPlayer = (playerId) => this.player1.getPlayerId() == playerId || this.player2.getPlayerId() == playerId;

  opponentOf = (player) => {
    if (this.player1.getPlayerId() === player.getPlayerId()) {
      return this.player2;
    }
    if (this.player2.getPlayerId() === player.getPlayerId()) {
      return this.player1;
    }
    return null;
  };

  recordResult = (playerId, result) =>  result === "DRAW" ? this.recordDraw() : this.recordWinner(result);

  recordWinner = (result) => {
    if(this.featuresPlayer(result)) {
      console.log(`Recording winner ${result}`);
      this.result = result;
      this.complete = true;
    } else {
      console.log(`Cant record result. Match does not include player ${result}`)
    }
  };

  recordDraw = () => {
    console.log('Recording DRAW');
    this.result = "DRAW";
    this.complete = true;
  };

  getResult = () => this.result;

}


module.exports = {
  Match,
}
