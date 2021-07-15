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

eventManagerRouter.route('/eventExists/:eventId')
    .get(eventExists)
    .all(errHandle405)

eventManagerRouter.route('/currentRound/:eventId')
    .get(currentRoundNumber)
    .all(errHandle405)

eventManagerRouter.route('/pairings/:eventId/:roundNumber')
    .get(getPairingsForRound)
    .all(errHandle405)

eventManagerRouter.route('/result/:eventId/:playerId/:result')
    .post(reportResult)
    .all(errHandle405)

eventManagerRouter.route('/standings/:eventId')
    .get(getStandings)
    .all(errHandle405)


module.exports = { eventManagerRouter };
