'use strict';

module.exports = {
    db: 'mongodb://localhost/mean',
    sessionSecret: 'developmentSessionSecret',
    facebook: {
        clientID: 'facebookClientID',
        clientSecret: 'facebookClientSecret',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    },
    twitter: {
        consumerKey: 'tybP8KZMI5Qer0LIpES3vLMva',
        consumerSecret: 'ZJDVmyNdmRtkkN1cnRZSVVaN4vgqV1c1j5nb2rd8MdvVmcxltu',
        callbackURL: 'http://localhost:3000/oauth/twitter/callback'
    },
    google: {
        clientID: '361041994869-v5vl8amkgtbfg493meps1nmk52augacp.apps.googleusercontent.com',
        clientSecret: '2k0IT3Vdrh1QXN6Q0y8CruEa',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    }
};