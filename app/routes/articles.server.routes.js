'use strict';

const users = require('../../app/controllers/users.server.controller'),
    articles = require('../../app/controllers/articles.server.controller');

module.exports = (app) => {
    app.route('/api/articles')
        .get(articles.list)
        .post(users.requireLogin, articles.create);
    
    app.route('/api/articles/:articleId')
        .get(articles.read)
        .put(users.requireLogin, articles.hasAuthorization, articles.update)
        .delete(users.requireLogin, articles.hasAuthorization, articles.delete);
    
    app.param('articleId', articles.articleById);
};