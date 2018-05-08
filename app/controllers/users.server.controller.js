'use strict';

const mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.create = (req, res, next) => {
    let user = new User(req.body);

    user.save()
        .then((user) => res.json(user)) // 这里的user是插入后的新文档
        .catch((err) => {
            if (err) return res.json({
                message: err.message
            });
        });
};

exports.list = (req, res, next) => {
    User.find({})
        .exec()
        .then((users) => res.json(users))
        .catch((err) => {
            if (err) return res.json({
                message: err.message
            });
        });
};

exports.userByID = (req, res, next, id) => {
    User.findOne({
            _id: id
        })
        .exec()
        .then((user) => {
            if (!user) {
                res.json({
                    message: '不存在此用户'
                });
            }
            req.user = user;
            next();
        })
        .catch((err) => {
            if (err) return res.json({
                message: err.message
            });
        });
};
exports.read = (req, res, next) => {
    return res.json(req.user);
};

exports.update = (req, res, next) => {
    User.findByIdAndUpdate(req.user.id, req.body) // 注意这里req.user.id 和 req.user._id都是可以的
        .then((user) => res.json(user)) // 注意这里的user是修改之前的 不是修改之后的user
        .catch((err) => {
            if (err) return res.json({
                message: err.message
            });
        });
};

exports.delete = (req, res, next) => {
    req.user.remove() //这里直接从req.user删除了
        .then((user) => res.json(user)) // 这里是删除前的user 这是因为在 userByID 方法中, req.user = user 这两个对象的指向是相同的 都是实例 可以删除
        .catch((err) => {
            if (err) return res.json({
                message: err.message
            });
        });
};