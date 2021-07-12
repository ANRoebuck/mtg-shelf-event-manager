const {Player} = require('./Player');
const {Round} = require('./Round');

class Event {

  constructor(eventId, numberOfPlayers) {
    this.eventId = eventId;
    this.noOfRounds = numberOfRoundsForPlayers(numberOfPlayers);
    this.players = [];
    this.addPlayers(numberOfPlayers);
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
    if(this.currentRound().getRoundNumber() === this.noOfRounds) {
      console.log("Cant create new round. Max number of rounds reached.");
      return;
    }

    if(this.currentRound() === null || this.currentRoundIsComplete()) {
      this.rounds.push(new Round(this.rounds.length + 1, this.getPlayers()));
      return;
    }

    console.log('Cant create new round before previous is complete.');
  }

}

const numberOfRoundsForPlayers = (playerCount) => {
  if (playerCount < 9) return 3;

  if (playerCount < 17) return 4;

  if (playerCount < 33) return 5;

  if (playerCount < 65) return 6;

  if (playerCount < 129) return 7;

  if (playerCount < 213) return 8;

  if (playerCount < 385) return 9;

  if (playerCount < 673) return 10;

  if (playerCount < 1249) return 11;

  if (playerCount < 2273) return 12;

  return 13;
}

module.exports = {
  Event,
}
