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
        required: 'Username can not be blank'
    },
    password: {
        type: String,
        validate: [(password) => password.length >= 6, 'Password should be longer']
    },
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

// 预处理中间件 在操作执行前触发
UserSchema.pre('save', (next) => {
    if (true) {
        next();
    } else {
        next(new Error('An Error Accured'));
    }
});

// 后置处理中间件 在操作执行完成后触发
UserSchema.post('save', (next) => {
    if (this.isNew) { // 用isNew判断是创建操作还是更新操作
        console.log('A new user was crated.');
    } else {
        console.log('A user updated is details.');
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

UserSchema.statics.findOneByUsername = function(username, callback) {
    this.findOne({ username: new RegExp(username, 'i')}, callback);
};

UserSchema.methods.authenticate = function(password) {
    return this.password === password;
};

mongoose.model('User', UserSchema, 'users');