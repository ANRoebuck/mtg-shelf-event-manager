const express = require('express');
const apiRouter = express.Router();
const endPoints = require('../endpoints.json');
const { errHandle405 } = require('../errHandle');
const { eventManagerRouter } = require('../routers')



apiRouter.route('/')
    .get((req, res, next) => res.send(endPoints))
    .all(errHandle405)


apiRouter.use('/eventManager', eventManagerRouter);


module.exports = { apiRouter };
