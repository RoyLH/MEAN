'use strict';

const users = require('../../app/controllers/users.server.controller');

module.exports = (app) => {
    app.route('/users')
        .post(users.create)
        .get(users.list);

    app.route('/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);

    app.route('/signup')
        .get(user.renderSignup)
        .post(users.signup);

    app.route('/signin')
        .get(user.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failuredirect: '/signin',
            failureFlash: true
        }));

    app.get('/signout', users.signout);

    app.param('userId', users.userByID);
};