const express = require('express');
const eventManagerRouter = express.Router();
const {
    newEvent,
 } = require('../controllers');
const { errHandle405 } = require('../errHandle');



eventManagerRouter.route('/new')
    .get(newEvent)
    .all(errHandle405)

eventManagerRouter.route('/:event_id')
    .get(sendArticleById)
    .patch(updateArticleById)
    .all(errHandle405)


eventManagerRouter.route('/:article_id/comments')
    .get(sendCommentsByArticleId)
    .post(addCommentByArticleId)
    .all(errHandle405)


module.exports = { eventManagerRouter };
