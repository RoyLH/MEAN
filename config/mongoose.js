'use strict';

const config = require('./config'),
    mongoose = require('mongoose');

module.exports = () => {
    let db = mongoose.connect(config.db);
     return db;
};
