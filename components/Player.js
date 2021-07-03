

class Player {

  constructor(playerId) {
    this.playerId = playerId;
    this.points = 0;
    this.matchesPlayed = [];
    this.hasHadBye = false;
  }

  getPlayerId = () => this.playerId;

  getPoints = () => this.points;

  addMatch = (match) => this.matchesPlayed.push(match);

}

class Bye extends Player {

  constructor() {
    super("The Bye");
  }

}

module.exports = {
  Player,
}
