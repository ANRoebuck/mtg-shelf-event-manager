const { randomElementFromArray } = require("./utils");
const { Match } = require('./Match');
const { Bye } = require('./Player');


class Round {

  constructor(roundNumber, players) {
    this.roundNumber = roundNumber;
    this.players = players;
    this.pairings = [];
    this.setUp();
  }

  getRoundNumber = () => this.roundNumber;

  getPlayers = () => this.players;

  getRankedPlayers = () => this.getPlayers().sort((a, b) => a.getPoints() - b.getPoints());

  getPairings = () => this.pairings;

  setUp = () => {
    let rankedPlayers = [...this.getRankedPlayers()];

    console.log(rankedPlayers);

    if (rankedPlayers.length % 2 === 1) {
      rankedPlayers = this.assignBye(rankedPlayers);
    }

    while(rankedPlayers.length > 0) {
      let playerToPair = rankedPlayers.pop();

      let targetPoints = playerToPair.getPoints();
      let potentialOpponents = [];
      while (potentialOpponents.length === 0 && targetPoints > -1) {
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

  pairRound = () => {

    // create graph of players

    // eliminate any impossible pairings (already played each other)

    // check if for any player, only one possible pairing remains
    //    --> pair that

  }

  assignBye = (rankedPlayers) => {
    rankedPlayers.some((p, i) => {
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

  isComplete = () => this.getPairings().every(p => p.isComplete());
}

module.exports = {
  Round,
}
