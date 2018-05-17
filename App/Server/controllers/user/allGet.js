'use strict';

let User = require('../../models/user');

module.exports = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.error(err);
            res.status(404).json({ message: 'Not found' })
        }
        res.status(200).json(users);
    });
};