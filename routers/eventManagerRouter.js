const express = require('express');
const eventManagerRouter = express.Router();
const {
  currentRoundNumber,
  eventExists,
  getPairingsForRound,
  getStandings,
  newEvent,
  reportResult,
 } = require('../controllers');
const { errHandle405 } = require('../errHandle');


eventManagerRouter.route('/')
  .get((req, res, next) => res.send('ping'))

eventManagerRouter.route('/new/:numberOfPlayers')
    .get(newEvent)
    .all(errHandle405)

eventManagerRouter.route('/eventExists/:event_id')
    .get(eventExists)
    .all(errHandle405)

eventManagerRouter.route('/currentRound/:event_id')
    .get(currentRoundNumber)
    .all(errHandle405)

eventManagerRouter.route('/pairings/:event_id')
    .get(getPairingsForRound)
    .all(errHandle405)

eventManagerRouter.route('/result/:event_id/:result')
    .post(reportResult)
    .all(errHandle405)

eventManagerRouter.route('/standings/:event_id')
    .get(getStandings)
    .all(errHandle405)


module.exports = { eventManagerRouter };
