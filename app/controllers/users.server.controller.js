'use strict';

const mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.create = async (req, res, next) => {
    let user = new User(req.body);

    try {
        user = await user.save();
        return res.json(user);
    } catch (err) {
        return next(err);
    } 
};