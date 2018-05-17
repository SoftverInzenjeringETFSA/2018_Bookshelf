'use strict';

let User = require('../../models/user');

module.exports = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            console.error(err);
            res.status(404).json({ message: 'Not found' })
        }
        res.status(200).json(user);
    })
};