const mongoose = require('mongoose');

// userbook Schema
const userbookSchema = mongoose.Schema({
	userId:{
		type: Object,
		required: true
	},
	bookId:{
		type: Object,
		required: true
	},
	list_type:{
		type: String,
		required: true
	}
});

const Userbook = module.exports = mongoose.model('Userbook', userbookSchema, 'user_book');

// Get Userbooks
module.exports.getUserbooks = (callback, limit) => {
	Userbook.find(callback).limit(limit);
}
