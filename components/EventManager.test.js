const { EventManager } = require('./EventManager');
const { Event } = require('./Event');
const { Player } = require('./Player');


describe('events', () => {
  let eventManager;

  const eventId1 = "1234";
  const eventId2 = "5678";

  beforeEach(() => {
    eventManager = new EventManager();
  });

  describe('createEvent', () => {
    it('creates a new event', () => {
      eventManager.createEvent(eventId1);
      eventManager.createEvent(eventId2);

      const expected = [new Event(eventId1), new Event(eventId2)];
      const actual = eventManager.getEvents();
      expectSameSerialisation(actual, expected);
    });

    it('does not add event with nonunique Id', () => {
      eventManager.createEvent(eventId1);
      eventManager.createEvent(eventId1);

      const expected = [new Event(eventId1)];
      const actual = eventManager.getEvents();
      expectSameSerialisation(actual, expected);
    });
  });


  describe('getEvent', () => {
    it('gets an event by ID', () => {
      eventManager.createEvent(eventId1);

      const expected = new Event(eventId1);
      const actual = eventManager.getEventById(eventId1);
      expectSameSerialisation(actual, expected);
    });

    it('returns null if event doesnt exist', () => {
      const expected = null;
      const actual = eventManager.getEventById(eventId1);
      expectSameSerialisation(actual, expected);
    });
  });

  describe('eventExists', () => {
    it('returns true if event exists', () => {
      eventManager.createEvent(eventId1);

      expect(eventManager.eventExists(eventId1)).toBe(true);
      expect(eventManager.eventExists(eventId2)).toBe(false);
    });
  });

  describe('addPlayers', () => {
    it('adds players to an event', () => {
      const numberOfPlayers = 8;
      eventManager.createEvent(eventId1);
      eventManager.addPlayers(eventId1, numberOfPlayers);

      const expected = [
        new Player(1),
        new Player(2),
        new Player(3),
        new Player(4),
        new Player(5),
        new Player(6),
        new Player(7),
        new Player(8),
      ]
      const actual = eventManager.getPlayers(eventId1);
      expectSameSerialisation(expected, actual);
      expect(eventManager.getNumberOfPlayers(eventId1)).toBe(8);
    });

    it('does nothing if event does not exist', () => {

    });
  });

  describe('getNumberOfPlayers + getPlayers', () => {
    it('gets number of players', () => {

    });

    it('gets players', () => {

    });
  });

  describe('createRound', () => {

    describe('createFirstRound', () => {

    });

  });

});

const expectSameSerialisation = (expected, actual) => expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
