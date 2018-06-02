'use strict';

const users = require('../../app/controllers/users.server.controller'),
    articles = require('../../app/controllers/articles.server.controller');

module.exports = (app) => {

    app.param('articleId', articles.articleById);

    app.route('/api/articles')
        .post(users.requireLogin, articles.create)    
        .get(articles.list);
    
    app.route('/api/articles/:articleId')
        .get(articles.read)
        .put(users.requireLogin, articles.hasAuthorization, articles.update)
        .delete(users.requireLogin, articles.hasAuthorization, articles.delete);
    
};