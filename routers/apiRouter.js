const express = require('express');
const apiRouter = express.Router();
const { errHandle405 } = require('../errHandle');
const { eventManagerRouter } = require('../routers')



apiRouter.use('/eventManager', eventManagerRouter);


module.exports = { apiRouter };
