'use strict';

const fs = require('fs');
const dotenv = require('dotenv');

// 获取当前环境
const env = process.env.NODE_ENV || 'development';
// 根据环境加载相应的 .env 文件
const envFile = `.env.${env}`;

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  dotenv.config();
}

const mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    db = mongoose(),
    app = express(db);
    
require('./config/passport')();

app.listen(3000);

module.exports = app;

console.log('Server running at http://localhost:3000/');