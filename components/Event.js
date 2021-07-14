const {Player} = require('./Player');
const {Round} = require('./Round');

class Event {

  constructor(eventId, numberOfPlayers) {
    console.log('Creating Event.');
    this.eventId = eventId;
    this.noOfRounds = numberOfRoundsForPlayers(numberOfPlayers);
    this.players = [];
    this.addPlayers(numberOfPlayers);
    this.rounds = [];
    this.createRound();
    console.log('Event created.');
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
  };

  currentRoundNumber = () => this.rounds.length;

  currentRoundIsComplete = () => this.currentRound() && this.currentRound().isComplete();

  createRound = () => {
    if(this.currentRound() && this.currentRound().getRoundNumber() === this.noOfRounds) {
      console.log('Cant create new round. Max number of rounds reached.');
      return;
    }

    if(this.currentRound() === null || this.currentRoundIsComplete()) {
      console.log('Creating new round.');
      this.rounds.push(new Round(this.rounds.length + 1, this.getPlayers()));
      return;
    }

    console.log('Cant create new round before previous is complete.');
  };

  getPairingsForRound = (roundNumber) => this.rounds[roundNumber - 1].getPairings();

  reportResult = (playerId, result) => this.currentRound().getPairingForPlayerId(playerId).recordResult(result);

}

const numberOfRoundsForPlayers = (playerCount) => {
  if (playerCount <= 8) return 3;

  if (playerCount <= 16) return 4;

  if (playerCount <= 32) return 5;

  if (playerCount <= 64) return 6;

  if (playerCount <= 128) return 7;

  if (playerCount <= 226) return 8;

  if (playerCount <= 409) return 9;

  return 10;
}

module.exports = {
  Event,
}
