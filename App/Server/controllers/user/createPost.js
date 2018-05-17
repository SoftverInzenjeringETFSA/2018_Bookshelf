'use strict';

let User = require('../../models/user');

module.exports = (req, res) => {
    console.log('tu smo');
    
    const name = req.body.name;
    const last_name = req.body.last_name;
    const birth_date = req.body.birth_date;
    const email = req.body.email;
    const gender = req.body.gender;
    const username = req.body.username;
    const password = req.body.password;

    console.log(req.body);

    let newUser = new User({
        name: name,
        last_name: last_name,
        birth_date: birth_date,
        email: email,
        gender: gender,
        username: username,
        password: password
    });

    newUser.hashPassword(newUser.password);
    console.log(newUser.password);
    newUser.save(err => {
        if (err) {
            console.log(err);
            res.json({ error: err });
        } else {
            res.json({ message: 'Registration successful' });
        }
    });
};