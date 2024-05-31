'use strict';

const passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    HttpsProxyAgent = require('https-proxy-agent').HttpsProxyAgent,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = () => {
    const googleStrategy = new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        passReqToCallback: true,
        scope: ['profile', 'email'] // https://developers.google.com/identity/protocols/oauth2?hl=zh-cn
    }, function verify(req, accessToken, refreshToken, profile, done) {
        

        let providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        let providerUserProfile = {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            fullName: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'google',
            providerId: profile.id,
            providerData: providerData
        };

        users.saveOAuthUserProfile(req, providerUserProfile, done);
    });

    // 伟大的“墙”。。。
    if (process.env.HTTP_PROXY) {
        const agent = new HttpsProxyAgent(process.env.HTTP_PROXY);
        googleStrategy._oauth2.setAgent(agent);
    }

    passport.use(googleStrategy);
};