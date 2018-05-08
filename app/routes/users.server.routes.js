'use strict';

const users = require('../../app/controllers/users.server.controller');

module.exports = (app) => {
    app.route('/users')
        .post(users.create)
        .get(users.list);

    app.route('/users/:userId')
        .get(users.read);

    app.param('userId', users.userByID);
};