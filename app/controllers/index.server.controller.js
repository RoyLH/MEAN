'use strict';

exports.render = (req, res) => {
    if (req.session.lastVisit) {

        console.log('========== req.session.lastVisit ==========');
        console.log(req.session.lastVisit);

        console.log('========== req.session ==========');
        console.log(req.session);

        console.log('========== req.user ==========');
        console.log(req.user);
    }

    req.session.lastVisit = new Date();

    res.render('index', {
        title: 'Hello World',
        user: JSON.stringify(req.user)
    });
};
