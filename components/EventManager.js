const {Event} = require('./Event');

class EventManager {

  constructor() {
    console.log('Creating EventManager.');
    this.events = [];
    console.log('EventManager created.');
  }

  getEvents = () => this.events;

  getEventById = (targetId) => this.getEvents().filter(e => e.getEventId() === targetId)[0] || null;

  eventExists = (eventId) => this.getEventById(eventId) !== null;

  createEvent = (eventId, numberOfPlayers) => {
    if (this.eventExists(eventId)) {
      console.log(`Not creating event - ${eventId} already exists.`);
      return true;
    }
    console.log(`Creating event ${eventId} with ${numberOfPlayers} players.`);
    return this.events.push(new Event(eventId, numberOfPlayers));
  }

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
  };

  getStandings = (eventId) => {
    return null;
  };

}

module.exports = {
  EventManager,
};
