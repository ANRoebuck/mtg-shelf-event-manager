const {
  addEvent,
  addPlayers,
  eventExists,
  getEventbyId,
  getNumberOfPlayers,
  getPlayers,
  getEvents,
  reset
} = require("./events");


describe('events', () => {

  afterEach(() => {
    reset();
  });

  describe('addEvent', () => {
    it('adds a new event', () => {
      const eventId = "1234";
      addEvent(eventId);

      const expected = [
        {
          eventId,
          numberOfPlayers: 0,
          players: [],
          rounds: [],
        }
      ]
      expect(getEvents()).toEqual(expected);
    });

    it('does not add event with nonunique Id', () => {
      const eventId = "1234";
      addEvent(eventId);
      addEvent(eventId);

      const expected = [
        {
          eventId,
          numberOfPlayers: 0,
          players: [],
          rounds: [],
        }
      ]
      expect(getEvents()).toEqual(expected);
    });
  });


  describe('getEvent', () => {
    it('gets an event by ID', () => {
      const eventId = "1234";
      addEvent(eventId);

      const expected = {
        eventId,
        numberOfPlayers: 0,
        players: [],
        rounds: [],
      };
      expect(getEventbyId(eventId)).toEqual(expected);
    });

    it('returns null if event doesnt exist', () => {
      const eventId = "1234";
      expect(getEventbyId(eventId)).toEqual(null);
    });
  });

  describe('eventExists', () => {
    it('returns true if event exists', () => {
      const eventId = "1234";
      addEvent(eventId);
      expect(eventExists(eventId)).toEqual(true);
    });

    it('returns false if event doesnt exist', () => {
      const eventId = "1234";
      expect(eventExists(eventId)).toEqual(false);
    });
  });

  describe('addPlayers', () => {
    it('adds players to an event', () => {
      const eventId = "1234";
      const numberOfPlayers = 8;
      addEvent(eventId);
      addPlayers(eventId, numberOfPlayers);

      const expected = {
        eventId,
        numberOfPlayers,
        players: [
          {player: 1},
          {player: 2},
          {player: 3},
          {player: 4},
          {player: 5},
          {player: 6},
          {player: 7},
          {player: 8},
        ],
        rounds: [],
      }
      expect(getEventbyId(eventId)).toEqual(expected);
    });

    it('does nothing if event does not exist', () => {
      const eventId = "1234";
      const numberOfPlayers = 8;
      addPlayers(eventId, numberOfPlayers);
      expect(getEventbyId(eventId)).toEqual(null);
    });
  });

  describe('getNumberOfPlayers + getPlayers', () => {
    it('gets number of players', () => {
      const eventId = "1234";
      const numberOfPlayers = 8;
      addEvent(eventId);
      addPlayers(eventId, numberOfPlayers);
      expect(getNumberOfPlayers(eventId)).toEqual(numberOfPlayers);
    });

    it('gets players', () => {
      const eventId = "1234";
      const numberOfPlayers = 8;
      addEvent(eventId);
      addPlayers(eventId, numberOfPlayers);

      const expected = [
        {player: 1},
        {player: 2},
        {player: 3},
        {player: 4},
        {player: 5},
        {player: 6},
        {player: 7},
        {player: 8},
      ];
      expect(getPlayers(eventId)).toEqual(expected);
    });
  });

  describe('createRound', () => {

    describe('createFirstRound', () => {
      const eventId = "1234";
      const numberOfPlayers = 8;
      addEvent(eventId);
      addPlayers(eventId, numberOfPlayers);
    });

  });

})
