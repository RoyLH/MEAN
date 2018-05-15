'use strict';

const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = () => {
    // passport.use()方法对策略进行注册
    // LocalStrategy()构造函数需要两个参数
    // 第一个: 应用信息对象
    // 第二个: 准备进行用户验证时会被调用的回调函数
    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({
                username: username
            })
            .exec()
            .then((user) => {
                if (!user) return done(null, false, {
                    message: 'Unknown user'
                });

                if (!user.authenticate(password)) return done(null, false, {
                    message: 'Invalid password'
                });
                
                return done(null, user);
            })
            .catch((err) => done(err));
    }));
};