'use strict';

const passport = require('passport'),
    url = require('url'),
    FacebookStrategy = require('passport-facebook').Strategy,
    HttpsProxyAgent = require('https-proxy-agent').HttpsProxyAgent,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = () => {
    const facebookStrategy = new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {
        console.log('accessToken =>', accessToken);
        console.log('refreshToken =>', refreshToken);
        console.log('profile =>', profile);

        let providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        let providerUserProfile = {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            fullName: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'facebook',
            providerId: profile.id,
            providerData: providerData
        };

        users.saveOAuthUserProfile(req, providerUserProfile, done);
    });

    // 伟大的“墙”。。。
    if (process.env.HTTP_PROXY) {
        const agent = new HttpsProxyAgent(process.env.HTTP_PROXY);
        facebookStrategy._oauth2.setAgent(agent);
    }

    passport.use(facebookStrategy);
};