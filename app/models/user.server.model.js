'uses strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String
});

mongoose.model('User', UserSchema, 'users');