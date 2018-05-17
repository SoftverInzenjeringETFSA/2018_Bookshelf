'use strict';
const login = require('./loginUser');

module.exports = {
  create: {
    post(req, res) {
      login(req, res);
    }
  }
}