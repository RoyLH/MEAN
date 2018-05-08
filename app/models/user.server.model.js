'uses strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true // Secondary Index 辅助索引
    },
    username: {
        type: String,
        trim: true,
        unique: true // Unique Index 唯一索引
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

UserSchema.virtual('fullName')
    .get(function () {
        return this.firstName + ' ' + this.lastName;
    })
    .set(function(fullName) {
        let splitName = fullName.split(' ');
        this.firstName = splitName[0] || '';
        this.lastName = splitName[1] || '';
    });

UserSchema.set('toJSON', {
    getters: true, // 在res.json()等方法中, 文档转换为JSON默认不会执行getter修饰符的操作, 所以这里保证在这种情况下强制执行getter修饰符
    virtuals: true
});

UserSchema.statics.findOneByUsername = function(username, callback) {
    this.findOne({ username: new RegExp(username, 'i')}, callback);
};

UserSchema.methods.authenticate = function(password) {
    return this.password === password;
};

mongoose.model('User', UserSchema, 'users');