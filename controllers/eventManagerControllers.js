const {
  currentRoundNumber,
  eventExists,
  getPairingsForRound,
  getStandings,
  newEvent,
  reportResult,
} = require('../models');

exports.newEvent = (req, res, next) => {
  console.log('New event request.');
  newEvent({...req.params, ...req.query})
    .then(eventId => {
      res.status(200).send({eventId});
    })
    .catch(next);
};

exports.eventExists = (req, res, next) => {
  eventExists({...req.params, ...req.query})
    .then(eventExists => {
      res.status(200).send({eventExists});
    })
    .catch(next);
};

exports.currentRoundNumber = (req, res, next) => {
  currentRoundNumber({...req.params, ...req.query})
    .then(eventId => {
      res.status(200).send({eventId});
    })
    .catch(next);
};

exports.getPairingsForRound = (req, res, next) => {
  getPairingsForRound({...req.params, ...req.query})
    .then(eventId => {
      res.status(200).send({eventId});
    })
    .catch(next);
};

exports.getStandings = (req, res, next) => {
  getStandings({...req.params, ...req.query})
    .then(eventId => {
      res.status(200).send({eventId});
    })
    .catch(next);
};

exports.reportResult = (req, res, next) => {
  reportResult({...req.params, ...req.query})
    .then(eventId => {
      res.status(200).send({eventId});
    })
    .catch(next);
};
