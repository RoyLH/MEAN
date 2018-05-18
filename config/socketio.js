'use strict';

const config = require('./config'),
    cookieParser = require('cookie-parser'),
    passport = require('passport');

module.exports = (server, io, mongoStore) => {
    io.use(function (socket, next) {
        // cookie-parser解析握手请求的cookie 并获取对应的 express 的 sessionId
        cookieParser(config.sessionSecret)(socket.request, {}, function (err) {
            let sessionId = socket.request.signedCookies['connect.sid'];

            // connect-mongo实例根据sessionId从MongoDB存储中检索会话信息
            // 一旦获取到会话对象 便使用passport.initialize()和passport.session()中间件根据会话信息来填充会话的user对象
            // 如果用户通过了身份验证 握手中间件便会执行回调函数next() 继续执行socket的初始化过程
            // 否则该我握手中间件便会执行next()通知socket.io不要打开这一连接 防止非法用户与socket.io服务器建立连接
            mongoStore.get(sessionId, function (err, session) {
                socket.request.session = session;

                passport.initialize()(socket.request, {}, function () {
                    passport.session()(socket.request, {}, function () {
                        if (socket.request.user) {
                            next(null, true);
                        } else {
                            next(new Error('User is not authenticated'), false);
                        }
                    });
                });
            });
        });
    });

    io.on('connection', function (socket) {
        require('../app/controllers/chat.server.controller')(io, socket);
    });
};