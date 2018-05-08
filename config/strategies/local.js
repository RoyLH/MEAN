'use strict';

const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = () => {
    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({
                username: username
            })
            .exec()
            .then((user) => {
                if (!user) return done(null, false, {
                    message: 'Unknown user'
                });

                if (!user.authenticate(password)) return done(null, false, {
                    message: 'Invalid password'
                });
                
                return done(null, user);
            })
            .catch((err) => done(err));
    }));
};

