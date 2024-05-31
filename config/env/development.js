'use strict';

module.exports = {
    db: 'mongodb://localhost/mean',
    sessionSecret: 'developmentSessionSecret',
    // https://developers.facebook.com/apps/470787615336311/dashboard/ facebook 一言难尽。。。无法发布APP 用不了
    facebook: {
        clientID: '470787615336311',
        clientSecret: 'df918f04ea5cb8a4132188d7d4cad601',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    },
    // https://developer.x.com/en/portal/projects-and-apps
    twitter: {
        consumerKey: 'Ge0QK0k89PKWUz7tnnV6VlP6R',
        consumerSecret: 'fYpdmAxJemsU0BNBNbM9dahdsJKGMWHYeTWGrHJt6P1kf8u0kS',
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