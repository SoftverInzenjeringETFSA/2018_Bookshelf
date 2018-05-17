const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

book = require('./models/book');
user = require('./models/user');
userbook = require('./models/userbook');
// Connect to Mongoose
//mongoose.connect('mongodb://localhost:27017/bookshelf');
mongoose.connect('mongodb://userdb:userdb@ds016148.mlab.com:16148/bookshelfdb');

var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Hey there');
});

app.get('/books', (req, res) => {
	book.getBooks((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/users', (req, res) => {
	user.getUsers((err, users) => {
		if(err){
			throw err;
		}
		res.json(users);
	});
});

app.get('/userbooks', (req, res) => {
	userbook.getUserbooks((err, userbooks) => {
		if(err){
			throw err;
		}
		res.json(userbooks);
	});
});

app.get('/myreadbooks/:_id', (req, res) => {
	userbook.getUserbooks((err, userbooks) => {
		if(err){
			throw err;
		}
		book.getBooks((err, books) => {
			if(err){
				throw err;
			}
			var readbooks = [];
			for (i = 0; i < userbooks.length; i++) {
				if(userbooks[i]['userId'] == req.params._id && userbooks[i]['list_type'] == "1") {
					for(j = 0; j < books.length; j++) {
						if (books[j]['_id'].toString() == userbooks[i]['bookId'].toString())
							readbooks.push(books[j]);
					}
				}
			}
			res.json(readbooks);
		});
	});
});

app.get('/mybooks/:_id', (req, res) => {
	userbook.getUserbooks((err, userbooks) => {
		if(err){
			throw err;
		}
		book.getBooks((err, books) => {
			if(err){
				throw err;
			}
			var readbooks = [];
			for (i = 0; i < userbooks.length; i++) {
				if(userbooks[i]['userId'] == req.params._id && userbooks[i]['list_type'] == "2") {
					for(j = 0; j < books.length; j++) {
						if (books[j]['_id'].toString() == userbooks[i]['bookId'].toString())
							readbooks.push(books[j]);
					}
				}
			}
			res.json(readbooks);
		});
	});
});

app.get('/myunreadbooks/:_id', (req, res) => {
	userbook.getUserbooks((err, userbooks) => {
		if(err){
			throw err;
		}
		book.getBooks((err, books) => {
			if(err){
				throw err;
			}
			var readbooks = [];
			for (i = 0; i < userbooks.length; i++) {
				if(userbooks[i]['userId'] == req.params._id && userbooks[i]['list_type'] == "3") {
					for(j = 0; j < books.length; j++) {
						if (books[j]['_id'].toString() == userbooks[i]['bookId'].toString())
							readbooks.push(books[j]);
					}
				}
			}
			res.json(readbooks);
		});
	});
});

app.listen(3000);