# MEAN

MEAN Stack (MongoDB Express AngularJS Node.js)

## ENV Install

### Node.js 20.13.1

```bash
nvm install v20.13.1
nvm use v20.13.1
```

### MongoDB latest

```bash
sudo docker run -p 27017:27017 --name mongo-container  \
-v ~/docker_home/mongo/data/configdb:/data/configdb \
-v ~/docker_home/mongo/data/db:/data/db \
-d mongo:latest \
--auth (加此项登录时需要用户名密码鉴权)

db.version() // 运行当前是7.0.9版本

sudo docker exec -it mongo-container mongosh admin

db.createUser({ 
 user: "root", 
 pwd: "123gogogo", 
 roles: [ 
  { role: "root", db: "admin" } 
 ] 
});

db.auth("root", "123gogogo");
```

### Express

```bash
see bower.json
```

### AngularJS

```bash
see package.json
```

## Deps Install

```bash
npm install bower -g
bower install

npm install
```

## Node Server Test

```bash
npm install mocha -g
NODE_ENV=test mocha --reporter spec app/tests
```

## Angular Clint Unit Test

```bash
npm install karma-cli -g
NODE_ENV=test karma start

# 注意：karma-jasmine需要更新到2.0.0以上版本
```

## Angular Clint E2E Test

```bash
npm install -g protractor
webdriver-manager update

NODE_ENV=test node server
protractor //新开命令行执行protractor
```

注意运行可能报错：

```bash
E/launcher - session not created: This version of ChromeDriver only supports Chrome version 114
Current browser version is 125.0.6422.77 with binary path /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
```

这是因为protractor npm已经不维护了，而protractor包中的：
webdriver-manager/selenium目录下面只有chromedriver_114.0.5735.90版本的驱动

要解决这个问题 需要在protractor.conf.js文件中添加以下配置项

```js
'use strict';

exports.config = {
  specs: ['public/*[!lib]*/tests/e2e/*.js'],
  // directConnect 选项用于直接连接到浏览器驱动程序（如 ChromeDriver 或 GeckoDriver）
  // 而不需要通过 Selenium Server 作为中间层。这可以简化测试环境的设置，并提高测试的启动速度和稳定性。
  directConnect: true,
  // capabilities 选项用于配置浏览器的特性和选项，它告诉 Protractor 在测试中应该如何启动和配置浏览器。
  capabilities: {
    // 这行配置指定了要使用的浏览器是 Chrome。
    browserName: 'chrome', 
    chromeOptions: {
      args: [
        // 禁用 GPU 硬件加速。这在某些情况下可以提高兼容性，尤其是在使用虚拟机或远程服务器时
        '--disable-gpu',
        // 设置浏览器窗口的大小为 800 像素宽和 600 像素高。这在需要以特定分辨率运行测试时特别有用 
        '--window-size=800,600' 
      ]
    }
  },
  // 手动下载和当前使用Chrome浏览器版本相匹配的驱动，将可执行文件放置在/usr/local/bin目录下，
  // 配置于chromeDriver选项中
  // 下载地址： https://developer.chrome.com/docs/chromedriver?hl=zh-cn
  chromeDriver: '/usr/local/bin/chromedriver', 
}
```
