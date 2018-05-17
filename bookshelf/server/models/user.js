const mongoose = require('mongoose');

// user Schema
const userSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	last_name:{
		type: String,
		required: true
	},
	birth_date:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	gender:{
		type: String,
		required: true
	},
	username:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	}
});

const User = module.exports = mongoose.model('User', userSchema, 'user');

// Get User
module.exports.getUsers = (callback, limit) => {
	User.find(callback).limit(limit);
}
