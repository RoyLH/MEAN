'us strict';

const config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport');

module.exports = () => {
    let app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress);
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // express-session模块通过浏览器的cookie来存储用户的唯一标识
    // session 中间件会为应用中所有的请求对象增加一个session对象(req.session)，通过这个对象可以设置或者获取当前会话的任意属性(req.session.xxx)。

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret // 为了标记会话，需要使用一个密钥，这可以有效防止恶意的会话污染。为了安全起见，建议在不同的环境使用不同的cookie密钥
    }));
    
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    // 在Express应用中注册passport中间件
    // 1. passport.initialize()用于启动passport模块 对passport进行初始化，否则后面的验证方法无法执行
    app.use(passport.initialize());
    // 2. passport.session()用于Express应用追踪用户会话(session) 这个主要是为了记住用户的登录状态，可以指定session过期时间
    app.use(passport.session());

    // 一一将路由文件加载入Express应用中，初始化Express路由
    require('../app/routes/index.server.routes')(app);
    require('../app/routes/users.server.routes')(app);

    app.use(express.static('./public'));

    return app;
};