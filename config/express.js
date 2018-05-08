'us strict';

const config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session');

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

    require('../app/routes/index.server.routes')(app);
    require('../app/routes/users.server.routes')(app);

    app.use(express.static('./public'));

    return app;
};