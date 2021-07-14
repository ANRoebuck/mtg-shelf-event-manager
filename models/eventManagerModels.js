const { EventManager } = require('../components/EventManager');

const manager = new EventManager();

const aNewEventId = () => 5;

exports.newEvent = ({ numberOfPlayers, alexaId = null }) => {
  const id = alexaId || aNewEventId();
  const eventCreated = manager.createEvent(id, numberOfPlayers);
  return eventCreated && id;
};

exports.eventExists = ({ eventId }) => {
  return manager.eventExists(eventId);
};

exports.currentRoundNumber = ({ eventId }) => {
  return manager.currentRoundNumber(eventId);
};

exports.getPairingsForRound = ({ eventId, roundNumber }) => {
  return manager.getPairingsForRound(eventId, roundNumber);
};

exports.reportResult = ({ eventId, playerId, result }) => {
  return manager.reportResult(eventId, playerId, result)
};
