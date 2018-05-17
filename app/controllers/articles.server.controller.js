'use strict';

const mongoose = require('mongoose'),
    Article = mongoose.model('Article');

let getErrorMessage = (err) => {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = (req, res, next) => {
    let article = new Article(req.body);
    article.user = req.user;

    article.save()
        .then((article) => res.json(article))
        .catch((err) => {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        });
};

exports.list = (req, res, next) => {
    Article.find({})
        .populate('creator', 'firstName lastName fullName')
        .sort('-created')            
        .exec()
        .then((articles) => res.json(articles))
        .catch((err) => {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        });
};

exports.articleById = (req, res, next, id) => {
    Article.findById(id)
        .populate('creator', 'firstName lastName fullName')
        .exec()
        .then((article) => {
            if(!article) return next(new Error(`Failed to load article ${id}`));

            return next();
        })
        .catch((err) => {
            return res.json({
                message: err.message
            });
        });
};

exports.read = (req, res, next) => {
    return res.json(req.article);
};

exports.update = (req, res, next) => {
    let article = req.article;

    article.title = req.body.title;
    article.content = req.body.content;

    article.save()
        .then((article) => res.json(article))
        .catch((err) => {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        });
};

exports.delete = (req, res, next) => {
    let article = req.article;

    article.remove()
        .then((article) => res.json(article))
        .catch((err) => {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        });
};



exports.hasAuthorization = (req, res, next) => {
    if (req.article.creator.id !== req.user.id) {
        return res.status(401).send({
            message: 'User is not authorized'
        });
    }

    next();
};