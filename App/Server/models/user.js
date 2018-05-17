const mongoose = require('../db');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String, 
        enum: ['male', 'female'],            
        required: true
    },
    username: {
        type: String,      
        required: true
    },
    password: {
        type: String,      
        required: true
    }
}, { collection: 'user' });


// methods
UserSchema.methods.hashPassword = (password) => {
    this.password = bcrypt.hashSync(password, salt);
    console.log('this.password: ' + this.password);
}

const User = module.exports = mongoose.model('User', UserSchema, 'user');

// validations
UserSchema.path('password').validate(v => {
    return v.length > 6;
}, 'Password needs to be more than 6 characters long');

UserSchema.path('username').validate(v => {
    let exists = false;
    User.findOne({ username: v }, (err, user) => {
        if (err)
            console.error(err);
        exists = (user === null);
    });
    return exists;
}, 'Username already exists');

