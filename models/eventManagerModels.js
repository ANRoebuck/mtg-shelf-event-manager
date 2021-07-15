const { EventManager } = require('../components/EventManager');
const { v4 } = require('uuid');


const manager = new EventManager();


const aNewEventId = () => v4();

exports.newEvent = async ({ numberOfPlayers, alexaId = null }) => {
  const id = alexaId || aNewEventId();
  const eventCreated = manager.createEvent(id, numberOfPlayers);
  if (eventCreated) return id;
  return false;
};

exports.eventExists = async ({ eventId }) => {
  return manager.eventExists(eventId);
};

exports.currentRoundNumber = async ({ eventId }) => {
  return manager.getCurrentRoundNumber(eventId);
};

exports.getPairingsForRound = async ({ eventId, roundNumber }) => {
  return manager.getSerialisablePairingsForRound(eventId, roundNumber);
};

exports.getStandings = async ({ eventId, roundNumber }) => {
  return manager.getStandings(eventId, roundNumber);
};

exports.reportResult = async ({ eventId, playerId, result }) => {
  return manager.reportResult(eventId, playerId, result)
};
