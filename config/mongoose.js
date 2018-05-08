'use strict';

const config = require('./config'),
    mongoose = require('mongoose');

module.exports = () => {
    let db = mongoose.connect(config.db);

    require('../app/models/user.server.model');
    
    return db;
};
