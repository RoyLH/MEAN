'us strict';

const config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session);
    flash = require('connect-flash'),
    passport = require('passport'),
    socketio = require('socket.io');

module.exports = (db) => {
    let app = express();
    let server = http.createServer(app); // 用http模块的创建的server对象来包装express的app对象
    let io = socketio.listen(server); // 使用socket.io模块的listen()方法将socket.io服务器附加给server对象

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // 由于socket.io是一个独立的模块, 给它发的请求与express应用没有任何关系，也就是说没办法在socket连接中使用express会话
    // 导致一个严重问题就是无法再应用的socket层中使用passport来进行身份验证 为此需要配置一个持久的会话存储 以便于在socket的握手中访问express的会话信息
    // express会话信息都是存储在内存中的，所以socket.io无法对其进行访问 因此更好的办法是将会话信息保存在MongoDB中
    let mongoStore = new MongoStore({
        db: db.connection.db
    });
    // express-session模块通过浏览器的cookie来存储用户的唯一标识
    // session 中间件会为应用中所有的请求对象增加一个session对象(req.session)，通过这个对象可以设置或者获取当前会话的任意属性(req.session.xxx)。
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret, // 为了标记会话，需要使用一个密钥，这可以有效防止恶意的会话污染。为了安全起见，建议在不同的环境使用不同的cookie密钥
        store: mongoStore // express会话信息的存储位置
    }));
    
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash()); // 提供了req.flash()方法用于创建和检索flash消息 其实质是对req.session.flash的操作
    // flash是session中一个用于存储信息的特殊区域。 消息写入到flash中，在跳转目标页中显示该消息。flash是配置redirect一同使用的，以确保消息在目标页面中可用。
    // flash 可用于一次性的消息提示， 比如注册， 登录页面， 当你再次刷新时， flash就没有提示消息了。

    // 在Express应用中注册passport中间件
    // 1. passport.initialize()用于启动passport模块 对passport进行初始化，否则后面的验证方法无法执行
    app.use(passport.initialize());
    // 2. passport.session()用于Express应用追踪用户会话(session) 这个主要是为了记住用户的登录状态，可以指定session过期时间
    app.use(passport.session());

    app.use(express.static('./public'));
    
    // 一一将路由文件加载入Express应用中，初始化Express路由
    require('../app/routes/index.server.routes')(app);
    require('../app/routes/users.server.routes')(app);
    require('../app/routes/articles.server.routes')(app);

    return server;
};