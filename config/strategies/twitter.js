'use strict';

const passport = require('passport'),
    url = require('url'),
    TwitterStrategy = require('passport-twitter').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = () => {
    passport.use(new TwitterStrategy({
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callbackURL: config.twitter.callbackURL,
        passReqToCallback: true
    }, function (req, token, tokenSecret, profile, done) {
        let providerData = profile._json;
        providerData.token = token;
        providerData.tokenSecret = tokenSecret;

        let providerUserProfile = {
            fullName: profile.displayName,
            username: profile.username,
            provider: 'twitter',
            providerId: profile.id,
            providerData: providerData
        };

        users.saveOAuthUserProfile(req, providerData, done);
    }));
};