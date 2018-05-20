'use strict';

const app = require('../../server'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article');

let user, article;

describe('Article Model Unit Tests:', (params) => {
    beforeEach((done) => {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'username',
            passpord: 'password'
        });

        user.save(() => {
            article = new Article({
                title: 'Article Title',
                content: 'Article Content',
                user: user
            });

            done();
        });
    });

    describe('Testing the save method', () => {
        it('Should be able to save without problems', () => {
            article.sava((err) => {
                should.not.exist(err);
            });
        });

        it('should not be able to save an article without a article', () => {
            article.title = '';

            article.save((err) => {
                should.exist(err);
            });
        });
        
    });

    afterEach((done) => {
        Article.remove(() => {
            User.remove(() => {
                done();
            });
        });
    });

});
