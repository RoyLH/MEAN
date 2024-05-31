'use strict';

exports.config = {
	specs: ['public/*[!lib]*/tests/e2e/*.js'],
  directConnect: true,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--disable-gpu', '--window-size=800,600']
    }
  },
  chromeDriver: '/usr/local/bin/chromedriver',
}