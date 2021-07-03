let events = [];

const reset = () => events = [];

const aNewEvent = (eventId) => {
  return {
    eventId,
    numberOfPlayers: 0,
    players: [],
    rounds: [],
  }
};

const aNewPlayer = (playerId) => {
  return {
    playerId,
    points: 0,
    matchesPlayed: [],
  };
}


const getEvents = () => events;

const getEventbyId = (targetId) => events.filter(({eventId}) => eventId === targetId)[0] || null;

const eventExists = (eventId) => getEventbyId(eventId) !== null;

const addEvent = (eventId) => eventExists(eventId) || events.push(aNewEvent(eventId));

const addPlayers = (eventId, numberOfPlayers) => {
  if (eventExists(eventId)) {
    let event = getEventbyId(eventId);
    let players = [];
    for (let i = 1; i < numberOfPlayers + 1; i++) {
      players.push(aNewPlayer(i));
    };
    event.numberOfPlayers = numberOfPlayers;
    event.players = players;
  }
};

const getNumberOfPlayers = (eventId) => getEventbyId(eventId).numberOfPlayers;

const getPlayers = (eventId) => getEventbyId(eventId).players;

const comparePlayerRank = (a, b) => a.points - b.points;

const getRankedPlayers = (eventId) => getPlayers(eventId).sort(comparePlayerRank);

const createFirstRound = (eventId) => {

}

const createRound = (eventId) => {
  if (eventExists(eventId)) {
    let event = getEventbyId(eventId);
    event.rounds.push(aNewRound());
  }
}

const aNewRound = (players, roundNumber) => {
  let pairings = pairings(players);
  return {
    roundNumber,
    pairings,
  };
};

const pairings = (players) => {
  return [];
}

module.exports = {
  events,
  reset,
  getEvents,
  getEventbyId,
  eventExists,
  addEvent,
  addPlayers,
  getNumberOfPlayers,
  getPlayers,
};
