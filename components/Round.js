const {randomElementFromArray} = require("./utils");
const {Match} = require('./Match');
const {Player, Bye} = require('./Player');


class Round {

  constructor(roundNumber, players) {
    this.roundNumber = roundNumber;
    this.players = players;
    this.pairings = [];
    this.setUp();
  }

  getRoundNumber = () => this.roundNumber;

  getPlayers = () => this.players;

  getRankedPlayers = () => this.getPlayers().sort((a, b) => b.getPoints() - a.getPoints());

  setUp = () => {
    let rankedPlayers = [...this.getRankedPlayers()];

    if (rankedPlayers.length % 2 === 1) {
      rankedPlayers = this.assignBye();
    }

    while(rankedPlayers.length > 0) {
      let playerToPair = rankedPlayers.pop();

      let targetPoints = playerToPair.getPoints();
      let potentialOpponents = [];
      while (potentialOpponents.length === 0 && targetPoints >= 0) {
        potentialOpponents = rankedPlayers
          .filter(player => player.getPoints() === targetPoints)
          .filter(player => !player.previousOpponentOf(playerToPair));
        targetPoints -=1;
      }

      if (potentialOpponents.length === 0) {
        // failed to find a valid opponent, this is very bad
      }

      const opponent = randomElementFromArray(potentialOpponents);
      this.createPairing(playerToPair, opponent);

      rankedPlayers = rankedPlayers.filter(player => player.getPlayerId() !== opponent.getPlayerId());
    }

  }

  assignBye = (rankedPlayers) => {
    rankedPlayers.reverse().any((p, i) => {
      if (!p.hasHadBye()) {
        let playerToReceiveBye = rankedPlayers.splice(i, 1)[0];
        this.createPairing(playerToReceiveBye, new Bye());
        return true;
      }
      return false;
    })
    return rankedPlayers;
  }

  createPairing = (player1, player2) => this.pairings.push(new Match(player1, player2));

  isComplete = () => this.pairings.every(p => p.isComplete());
}

module.exports = {
  Round,
}
