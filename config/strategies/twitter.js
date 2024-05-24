'use strict';

const passport = require('passport'),
    // TwitterStrategy = require('passport-twitter'),
    TwitterStrategy= require('@superfaceai/passport-twitter-oauth2').Strategy,
    HttpsProxyAgent = require('https-proxy-agent').HttpsProxyAgent,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = () => {
    // const twitterStrategy = new TwitterStrategy({
    //     consumerKey: config.twitter.consumerKey,
    //     consumerSecret: config.twitter.consumerSecret,
    //     callbackURL: config.twitter.callbackURL,
    // }, function verify(token, tokenSecret, profile, cb) {
    //     console.log('token =>', token);
    //     console.log('tokenSecret =>', tokenSecret);
    //     console.log('profile =>', profile);

    //     // let providerData = profile._json;
    //     // providerData.token = token;
    //     // providerData.tokenSecret = tokenSecret;

    //     // let providerUserProfile = {
    //     //     fullName: profile.displayName,
    //     //     username: profile.username,
    //     //     provider: 'twitter',
    //     //     providerId: profile.id,
    //     //     providerData: providerData
    //     // };

    //     // users.saveOAuthUserProfile(req, providerUserProfile, done);
    // });

    const twitterStrategy = new TwitterStrategy({
        clientID: 'eElZdWRnN1lIdmxWQTNWclp6MzQ6MTpjaQ',
        clientSecret: 'nInu7wgNdyAxAd_gdfYYvG5i-Kcc_wJ4TL5IFt_9z7UzanK_Lo',
        clientType: 'confidential',
        callbackURL: config.twitter.callbackURL,
        // state: true,
        proxy: true,
        // responseType: 'code'
    }, function verify(accessToken, refreshToken, profile, done) {
        console.log('accessToken =>', accessToken);
        console.log('refreshToken =>', refreshToken);
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
    const agent = new HttpsProxyAgent(process.env.HTTP_PROXY);
    twitterStrategy._oauth2.setAgent(agent);

    passport.use(twitterStrategy);
};