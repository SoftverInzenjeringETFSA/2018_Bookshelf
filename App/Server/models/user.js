const mongoose = require('../models/index');
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
    // return bcrypt.hashSync(password, salt);
    console.log('Im called');
    this.password = bcrypt.hashSync(password, salt);
    console.log('this.password: ' + this.password);
}

const User = module.exports = mongoose.model('User', UserSchema, 'user');
