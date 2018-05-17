'use strict';
const registerUser = require('./createPost');

module.exports = {
  create: {
    post(req, res) {
      registerUser(req, res);
    }
  }
}