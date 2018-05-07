'use strict';

exports.render = (req, res) => {
    if (req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }
    req.session.lastVisit = new Date();
    
    return res.render('index', {
        title: 'Hello World'
    });
};
