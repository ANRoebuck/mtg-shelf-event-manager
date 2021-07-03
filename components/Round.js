const {Player} = require('./Player');

class Round {

  constructor(players) {
    this.pairings = [];
    this.setUp(players);
  }

  setUp = (players) => {
    let rankedPlayers = players.sort((a, b) => b.getPoints() - a.getPoints());

    if (rankedPlayers.length % 2 === 1) {
      rankedPlayers = this.assignBye();
    }

    while(rankedPlayers.length > 0) {
      let playerToPair = rankedPlayers.pop();
    }

  }

  assignBye = (rankedPlayers) => {
    rankedPlayers.reverse().any((p, i) => {
      if (!p.hasHadBye()) {
        let playerToReceiveBye = rankedPlayers.splice(i, 1)[0];

        return true;
      }
      return false;
    })
    return rankedPlayers;
  }

  createPairing = (player1, player2) => this.pairings.push();

  isComplete = () => this.pairings.every(p => p.isComplete());
}
module.exports = {
  Round,
}
