'use strict';

const mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.create = (req, res, next) => {
    let user = new User(req.body);

    user.save()
        .then((user) => {
            return res.json(user);
        })
        .catch(next);
};