const { Event } = require('./Event');

class EventManager {

  constructor() {
    this.events = [];
  }

  getEvents = () => this.events;

  getEventById = (targetId) => this.getEvents().filter(e => e.getEventId() === targetId)[0] || null;

  eventExists = (eventId) => this.getEventById(eventId) !== null;

  createEvent = (eventId) => this.eventExists(eventId) || this.events.push(new Event(eventId));

  addPlayers = (eventId, numberOfPlayers) => {
    if (this.eventExists(eventId)) {
      this.getEventById(eventId).addPlayers(numberOfPlayers);
    }
  };

  getPlayers = (eventId) => {
    if(this.eventExists(eventId)) {
      return this.getEventById(eventId).getPlayers();
    }
  };

  getNumberOfPlayers = (eventId) => {
    if(this.eventExists(eventId)) {
      return this.getEventById(eventId).getNumberOfPlayers();
    }
  };

}

module.exports = {
  EventManager,
};
