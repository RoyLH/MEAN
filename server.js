'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const mongoose = require('./config/mongoose'),
    express = require('./config/express');
    

let db = mongoose(),
    app = express(),
    passport = require('./config/passport')();

app.listen(3000);

module.exports = app;

console.log('Server running at http://localhost:3000/');