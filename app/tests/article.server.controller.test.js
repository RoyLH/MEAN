'use strict';

const app = require('../../server'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article')

let user, article

describe('Articles Controller Unit Tests:', () => {
    beforeEach(async () => {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: 'username',
            password: 'password',
            provider: 'local'
        });

        const savedUser = await user.save()
        
        article = new Article({
            title: 'Article Title',
            content: 'Article Content',
            user: savedUser
        });

        await article.save();
    });

    describe('Testing the GET mothods:', () => {
        it('Should be able to get the list of articles', async () => {
            const res = await request(app)
                .get('/api/articles/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)

            // res.body.should.be.an.Array.and.have.lengthOf(1); 
            // Uncaught TypeError: Cannot read property 'have' of undefined 判断是否是一个数组 该方法已经不支持 改用下面一行
            res.body.should.be.an.instanceOf(Array).and.have.lengthOf(1);
            res.body[0].should.have.property('title', article.title);
            res.body[0].should.have.property('content', article.content);
        });

        it('Should be able to get the specific articles', async () => {
            const res = await request(app)
                .get('/api/articles/' + article.id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)

            // res.body.should.be.an.Object.and.have.property('title', article.title); 
            // Uncaught TypeError: Cannot read property 'have' of undefined
            res.body.should.be.an.instanceOf(Object).and.have.property('title', article.title);
            res.body.should.have.property('content', article.content);
        });
    });

    afterEach(async () => {
        await Article.deleteMany({})
        await User.deleteMany({})
    });
});