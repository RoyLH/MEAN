'use strict';

module.exports = {
    db: 'mongodb://localhost/mean',
    sessionSecret: 'developmentSessionSecret',
    facebook: {
        clientID: 'facebookClientID',
        clientSecret: 'facfacebookClientSecret',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    },
    twitter: {
        consumerKey: 'twitterConsumerKeyD',
        consumerSecret: 'twitterConsumerSecret',
        callbackURL: 'http://localhost:3000/oauth/twitter/callback'
    }
};