'use strict';

const users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = app => {
    
    app.param('userId', users.userByID);
    
    app.route('/users')
        .post(users.create)
        .get(users.list);

    app.route('/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);

    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);

    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));

    app.get('/signout', users.signout);
    
    // 通过使用passport.authenticate()方法来启动身份验证流程
    app.get('/oauth/facebook', passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
    }));
    // 在上面的路由成功获取facebook上的用户资料之后, 下面路由将同样使用passport.authenticate()方法来结束这一验证流程
    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/signin'
    }));

    // 通过使用passport.authenticate()方法来启动身份验证流程
    app.get('/oauth/twitter', passport.authenticate('twitter', {
        // failureRedirect: '/signin'
        scope: ['tweet.read', 'users.read'],
    }));
    // 在上面的路由成功获取twitter上的用户资料之后, 下面路由将同样使用passport.authenticate()方法来结束这一验证流程
    app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/signin'
    }));

    // 通过使用passport.authenticate()方法来启动身份验证流程
    app.get('/oauth/google', passport.authenticate('google'));
    // 在上面的路由成功获取google上的用户资料之后, 下面路由将同样使用passport.authenticate()方法来结束这一验证流程
    app.get('/oauth/google/callback', passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/signin'
    }));
};