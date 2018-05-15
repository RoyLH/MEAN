'use strict';

const passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({
                _id: id
            }, '-password -salt')
            .exec()
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });

    require('./strategies/local')();
    require('./strategies/facebook')();
    require('./strategies/twitter')();
    require('./strategies/google')();
};