'use strict';

const passport = require('passport'),
    TwitterStrategy = require('passport-twitter'),
    HttpsProxyAgent = require('https-proxy-agent').HttpsProxyAgent,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = () => {
    const twitterStrategy = new TwitterStrategy({
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callbackURL: config.twitter.callbackURL,
    }, function verify(token, tokenSecret, profile, cb) {
        console.log('token =>', token);
        console.log('tokenSecret =>', tokenSecret);
        console.log('profile =>', profile);

        // let providerData = profile._json;
        // providerData.token = token;
        // providerData.tokenSecret = tokenSecret;

        // let providerUserProfile = {
        //     fullName: profile.displayName,
        //     username: profile.username,
        //     provider: 'twitter',
        //     providerId: profile.id,
        //     providerData: providerData
        // };

        // users.saveOAuthUserProfile(req, providerUserProfile, done);
    });

    // 伟大的“墙”。。。
    const agent = new HttpsProxyAgent(process.env.HTTP_PROXY || 'http://127.0.0.1:17890');
    console.log('twitterStrategy._oauth', twitterStrategy)
    // twitterStrategy._oauth2.setAgent(agent);

    passport.use(twitterStrategy);
};