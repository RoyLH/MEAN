'use strict';

const passport = require('passport'),
    url = require('url'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    // GoogleStrategy = require('passport-google-oidc'),
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = () => {
    passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        passReqToCallback: true,
        scope: ['profile', 'email'] // https://developers.google.com/identity/protocols/oauth2?hl=zh-cn
    }, function verify(req, accessToken, refreshToken, profile, done) {
        console.log('accessToken =>', accessToken)
        console.log('refreshToken =>', refreshToken)
        console.log('profile =>', profile)

        // let providerData = profile._json;
        // providerData.accessToken = accessToken;
        // providerData.refreshToken = refreshToken;

        // let providerUserProfile = {
        //     firstName: profile.name.givenName,
        //     lastName: profile.name.familyName,
        //     fullName: profile.displayName,
        //     email: profile.emails[0].value,
        //     username: profile.username,
        //     provider: 'google',
        //     providerId: profile.id,
        //     providerData: providerData
        // };

        // users.saveOAuthUserProfile(req, providerUserProfile, done);
    }));

    // passport.use(new GoogleStrategy({
    //     clientID: config.google.clientID,
    //     clientSecret: config.google.clientSecret,
    //     callbackURL: config.google.callbackURL,
    //     scope: [ 'profile', 'email' ]
    // }, function verify(issuer, profile, cb) {
    //     console.log('issuer =>', issuer)
    //     console.log('profile =>', profile)
    //     console.log(cb)
    // }));
};