'use strict';

const mongoose = require('mongoose'),
    User = mongoose.model('User');

// 私有方法getErrorMessage主要用于处理Mongoose错误对象并返回统一格式的错误消息
// 这里重要存在以下两种错误
let getErrorMessage = (err) => {
    let message = '';
    
    if (err.code) { // 第一种错误: 来自MongoDB索错误的错误代码
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Somrthing went wrong';
                break;
        }
    } else { // 第二种错误: Mongoose校验错误的error.errors对象
        for (let errName in err.errors) {
            message = err.errors[errName].message ? err.errors[errName].message : '';
        }

        return message;
    }
};

exports.renderSignin = (req, res, next) => {
    if (!req.user) {
        res.render('signin', {
            title: 'Sign-in Form',
            message: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderSignup = (req, res, next) => {
    if (!req.user) {
        res.render('signup', {
            title: 'Sign-up Form',
            message: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

exports.signup = (req, res, next) => {
    if (!req.user) {
        let user = new User(req.body);
        let message = null;

        user.provider = 'local';

        user.save()
            .then((user) => {
                // 1. passport.authenticate()方法会自动调用 req.login()方法, 所以我们只需要在注册的时候手动在这里调用一次req.login()方法.
                // 2. 如果成功, user会被挂到req.user对象上
                req.login(user, (err) => {
                    if (err) return next(err);
                    return res.redirect('/');
                });
            })
            .catch((err) => {
                let message = getErrorMessage(err);

                req.flash('error', message);
                return res.redirect('/signup');
            });
    } else {
        return res.redirect('/');
    }
};

// 为什么没有 export.signin()方法 这是因为 passport提供了一个专门的身份验证方法, 可以直接用于定义路由 即passport.authenticate()方法

exports.signout = (req, res, next) => {
    req.logout();
    return res.redirect('/');
};



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
    User.findByIdAndUpdate(req.user._id, req.body) // 注意这里req.user.id 和 req.user._id都是可以的
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