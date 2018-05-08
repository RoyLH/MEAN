'uses strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: {
        type: String,
        trim: true
    },
    password: String,
    website: {
        type: String,
        set: function (url) {
            if (!url) return url;
            if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) return 'http://' + url;
        },
        get: function (url) {
            if (!url) return url;
            if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) return 'http://' + url;
        }
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// 在res.json()等方法中, 文档转换为JSON默认不会执行getter修饰符的操作, 所以这里调用UserSchema.set()方法 以保证在这种情况下强制执行getter修饰符
UserSchema.set('toJSON', {getters: true});

mongoose.model('User', UserSchema, 'users');