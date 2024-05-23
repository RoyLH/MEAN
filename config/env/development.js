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
    // https://console.cloud.google.com/apis/credentials?project=capable-hexagon-424213-i1
    // https://console.cloud.google.com/apis/credentials/consent?project=capable-hexagon-424213-i1
    // https://myaccount.google.com/connections
    google: {
        clientID: '350806475579-qov112h26jncladda46t30sf1juupdcp.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    }
};