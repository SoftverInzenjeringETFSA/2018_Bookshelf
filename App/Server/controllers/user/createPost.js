'use strict';

let User = require('../../models/user');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();

module.exports = (req, res) => {
    
    const name = req.body.name;
    const last_name = req.body.last_name;
    const birth_date = req.body.birth_date;
    const email = req.body.email;
    const gender = req.body.gender;
    const username = req.body.username;
    const password = req.body.password;

    console.log('-------------------------');

    console.log(req.body);

    console.log('-------------------------');    
    
    let newUser = new User({
        name: name,
        last_name: last_name,
        birth_date: birth_date,
        email: email,
        gender: gender,
        username: username,
        password: bcrypt.hashSync(password, salt)
    });

    console.log(newUser.password);
    newUser.save(err => {
        if (err) {
            console.log(err);
            res.json({ error: err });
        } else {
            console.log('user saved');           
            res.json({ message: 'Registration successful' });
        }
    });
};