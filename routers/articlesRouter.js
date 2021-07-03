const express = require("express");
const articlesRouter = express.Router();
const {
    sendArticles,
    sendArticleById,
    updateArticleById,
    sendCommentsByArticleId,
    addCommentByArticleId
 } = require('../controllers');
const { errHandle405 } = require('../errHandle');



articlesRouter.route('/')
    .get(sendArticles)
    .all(errHandle405)

articlesRouter.route('/:article_id')
    .get(sendArticleById)
    .patch(updateArticleById)
    .all(errHandle405)


articlesRouter.route('/:article_id/comments')
    .get(sendCommentsByArticleId)
    .post(addCommentByArticleId)
    .all(errHandle405)


module.exports = { articlesRouter };