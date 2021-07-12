

const THE_BYE = "BYE";
const DRAW = "DRAW";

class Player {

  constructor(playerId) {
    this.playerId = playerId;
    this.matchesPlayed = [];
  }

  getPlayerId = () => this.playerId;

  getPoints = () => this.matchesPlayed.reduce((tally, match) => {
    if (match.getResult() === this.getPlayerId()) return tally + 3;
    if (match.getResult() === DRAW) return tally + 1;
    return tally;
  }, 0);

  addMatch = (match) => this.matchesPlayed.push(match);

  getMatches = () => this.matchesPlayed;

  previousOpponentOf = (player) => this.matchesPlayed.some(match => match.opponentOf(player) === this);

  hasHadBye = () => this.previousOpponentOf(new Bye());

}

class Bye extends Player {

  constructor() {
    super(THE_BYE);
  }

}

module.exports = {
  Player,
  Bye,
}
