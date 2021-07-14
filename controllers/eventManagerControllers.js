const {
  currentRound,
  eventExists,
  getPairingsForRound,
  newEvent,
  reportResult,
} = require('../models');

exports.newEvent = (req, res, next) => {
  newEvent({...req.params, ...req.query})
        .then(eventId => {
            res.status(200).send({ eventId });
        })
        .catch(next);
};

exports.eventExists = (req, res, next) => {
  eventExists({...req.params, ...req.query})
    .then(eventId => {
      res.status(200).send({ eventId });
    })
    .catch(next);
};

exports.currentRound = (req, res, next) => {
  currentRound({...req.params, ...req.query})
    .then(eventId => {
      res.status(200).send({ eventId });
    })
    .catch(next);
};

exports.getPairingsForRound = (req, res, next) => {
  getPairingsForRound({...req.params, ...req.query})
    .then(eventId => {
      res.status(200).send({ eventId });
    })
    .catch(next);
};

exports.reportResult = (req, res, next) => {
  reportResult({...req.params, ...req.query})
    .then(eventId => {
      res.status(200).send({ eventId });
    })
    .catch(next);
};
