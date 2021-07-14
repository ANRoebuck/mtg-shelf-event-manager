const {Event} = require('./Event');

class EventManager {

  constructor() {
    this.events = [];
  }

  getEvents = () => this.events;

  getEventById = (targetId) => this.getEvents().filter(e => e.getEventId() === targetId)[0] || null;

  eventExists = (eventId) => this.getEventById(eventId) !== null;

  createEvent = (eventId, numberOfPlayers) =>
    this.eventExists(eventId) || this.events.push(new Event(eventId, numberOfPlayers));

  removeEvent = (targetId) => this.events = this.getEvents().filter(e => e.getEventId() !== targetId);

  getCurrentRound = (eventId) => this.eventExists(eventId) && this.getEventById(eventId).currentRound();

  getPlayers = (eventId) => {
    if (this.eventExists(eventId)) {
      return this.getEventById(eventId).getPlayers();
    }
  };

  getNumberOfPlayers = (eventId) => {
    if (this.eventExists(eventId)) {
      return this.getEventById(eventId).getNumberOfPlayers();
    }
  };

  getPairingsForRound = (eventId, roundNumber) => {
    if (this.eventExists(eventId)) {
      return this.getEventById(eventId).getPairingsForRound(roundNumber);
    }
  };

  reportResult = (eventId, playerId, result) => {
    if (this.eventExists(eventId)) {
      return this.getEventById(eventId).reportResult(playerId, result);
    }
  }

}

module.exports = {
  EventManager,
};
