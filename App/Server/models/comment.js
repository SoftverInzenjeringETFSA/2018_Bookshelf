const mongoose = require('mongoose');

// Book Schema
const commentSchema = mongoose.Schema({
	_id:{
		type: Object,
		required: true
	},
	text:{
		type: String,
		required: true
	},
	date_written:{
		type: String,
		required: true
	},
	bookId:{
		type: Object,
		required: true
	}
});

var Comments = module.exports = mongoose.model('Comments', commentSchema, 'comments');

// Get Books
module.exports.getComments = (callback, limit) => {
	Comments.find(callback).limit(limit);
}

// Get Comment
module.exports.getCommentById = (id, callback) => {
	Comments.findById(id, callback);
}

// Update Book
module.exports.updateComment = (id, comment, options, callback) => {
	var query = {_id: id};
	var update = {
		text: comment.text,
		date_written: comment.date_written,
		bookId: comment.bookId
	}
	Comments.findOneAndUpdate(query, update, options, callback);
}