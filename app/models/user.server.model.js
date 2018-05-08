'uses strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        trim: true,
        unique: true, // Unique Index 唯一索引
        required: '请填写用户名'
    },
    password: String,
    email: {
            type: String,
            index: true, // Secondary Index 辅助索引
            match: /.+\@.+\..+/
    },
    role: {
        type: String,
        enum: ['Admin', 'Owner', 'User']
    },
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

UserSchema.set('toJSON', { // 一下两个设置中的任何一个 都会使整个res.json()的返回文档中多出一个id属性 其值是等于_id属性的
    getters: true, // 在res.json()等方法中, 文档转换为JSON默认不会执行getter修饰符的操作, 所以这里保证在这种情况下强制执行getter修饰符
    virtuals: true // 在toJSON方法的时候, 能支持虚拟属性功能
});

// UserSchema.statics.findOneByUsername = function(username, callback) {
//     this.findOne({ username: new RegExp(username, 'i')}, callback);
// };

// UserSchema.methods.authenticate = function(password) {
//     return this.password === password;
// };

mongoose.model('User', UserSchema, 'users');