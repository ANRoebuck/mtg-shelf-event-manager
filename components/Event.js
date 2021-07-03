const {Player} = require('./Player');
const {Round} = require('./Round');

class Event {

  constructor(eventId) {
    this.eventId = eventId;
    this.players = [];
    this.rounds = [];
  }

  getEventId = () => this.eventId;

  addPlayers = (numberOfPlayers) => {
    for (let i = 1; i < numberOfPlayers + 1; i++) {
      this.players.push(new Player(i));
    }
  }

  getPlayers = () => this.players;

  getNumberOfPlayers = () => this.getPlayers().length;


  currentRound = () => {
    if (this.rounds.length === 0) {
      return null;
    }
    return this.rounds[this.rounds.length -1];
  }

  currentRoundIsComplete = () => this.currentRound() && this.currentRound().isComplete();

  createRound = () => {
    if(this.currentRound() === null || this.currentRoundIsComplete()) {
      this.rounds.push(new Round(this.getPlayers()));
    } else {
      console.log('Cant create new round before previous is complete');
    }
  }

}

module.exports = {
  Event,
}
