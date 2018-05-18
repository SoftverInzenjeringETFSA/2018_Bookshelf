'use strict';
const registerUser = require('./createPost');
const getAllUsers = require('./allGet');
const getUser = require('./readGet');
const deleteUser= require('./deleteDelete');

module.exports = {
    register: {
        post(req, res) {
        	registerUser(req, res);
    	}
	},
	all: {
		get(req, res) {
			getAllUsers(req, res);
		}
	},
	read: {
		get(req, res) {
			getUser(req, res);
		}
	},
	delete: {
		delete(req, res) {
			deleteUser(req, res);
		}
	}
}