'use strict';

module.exports = {
    db: 'mongodb://localhost/mean',
    sessionSecret: 'developmentSessionSecret',
    facebook: {
        clientID: 'facebook',
        clientSecret: 'facfacebookClientSecret',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    }
};