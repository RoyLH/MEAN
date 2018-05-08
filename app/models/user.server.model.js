'uses strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: {
        type: String,
        trim: true
    },
    password: String,
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('User', UserSchema, 'users');