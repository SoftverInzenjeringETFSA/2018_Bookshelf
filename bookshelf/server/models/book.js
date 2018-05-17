const mongoose = require('mongoose');

// Book Schema
const bookSchema = mongoose.Schema({
	_id:{
		type: Object,
		required: true
	},
	name:{
		type: String,
		required: true
	},
	author:{
		type: String,
		required: true
	},
	isbn:{
		type: String,
		required: true
	},
	page_number:{
		type: String,
		required: true
	},
	average_grade:{
		type: String,
		required: true
	},
	imageUrl:{
		type: String,
		required: true
	}
});

var Book = module.exports = mongoose.model('Book', bookSchema, 'books');

// Get Books
module.exports.getBooks = (callback, limit) => {
	Book.find(callback).limit(limit);
}

// Get Book
module.exports.getBookById = (id, callback) => {
	Book.findById(id, callback);
}

// Update Book
module.exports.updateBook = (id, book, options, callback) => {
	var query = {_id: id};
	var update = {
		title: book.title,
		genre: book.genre,
		description: book.description,
		author: book.author,
		publisher: book.publisher,
		pages: book.pages,
		image_url: book.image_url,
		buy_url: book.buy_url
	}
	Book.findOneAndUpdate(query, update, options, callback);
}