'use strict';

require('../../server')

const should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article')

let user, article

describe('Article Model Unit Tests:', () => {
    beforeEach(async () => {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: 'username',
            password: 'password',
            provider: 'local'
        })

        const savedUser = await user.save()

        article = new Article({
            title: 'Article Title',
            content: 'Article Content',
            user: savedUser
        })
    })

    describe('Testing the save method', () => {
        it('Should be able to save without problems', async() => {
            try {
                await article.save();
            } catch (err) {
                should.not.exist(err);
            }
        })

        it('should not be able to save an article without a article', async() => {
            article.title = ''

            try {
                await article.save()
            } catch (err) {
                should.exist(err)
            }
        });
    });

    afterEach(async () => {
        await Article.deleteMany({})
        await User.deleteMany({})
    })
})
