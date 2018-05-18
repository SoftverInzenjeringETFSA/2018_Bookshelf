const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

book = require('./models/book');
user = require('./models/user');

userbook = require('./models/userbook');
commentt = require('./models/comment');
// Connect to Mongoose
//mongoose.connect('mongodb://localhost:27017/bookshelf');
mongoose.connect('mongodb://userdb:userdb@ds016148.mlab.com:16148/bookshelfdb');

var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Hey there');
});

app.post('/searchBooks',(req,res)=>{
	let name = req.body.name;
	book.getBooksByName((err,name)=>{
		if(err){
			throw err;
		}
		res.json(books);
	});
	res.send('ok')
});

app.get('/books', (req, res) => {
	book.getBooks((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});


app.get('/books/:_id', (req, res) => {
  
	book.getBooks((err, books) => {
  
		if(err){
		throw err;
    }
    commentt.getComments((err, comments) => {
      var theBook ='';
      var com = [];
			for (i = 0; i < books.length; i++) {
        for(j = 0; j< comments.length; j++){
				if(books[i]['_id']== req.params._id && books[i]['_id'] == comments[j]['bookId']) {
          com.push(comments[j]['text']);
          console.log("KOMENTARI" + comments[j]['text']);
         theBook = books[i];
        }
				}
      }
      res.json(theBook + com);
    });
    
     
		
      
    });
    
  });
  app.post('/books/:_id', (req, res) => {
    let body = req.body;
    let id = req.params._id;
    let grade = body.grade;
    var average_grade = 0;
    book.getBooks((err, books) => {
  
      if(err){
      throw err;
      }
      var theBook = [];
        for (i = 0; i < books.length; i++) {
          if(books[i]['_id']== req.params._id) {
            theBook.push(books[i]);
            average_grade = theBook[0].average_grade;
          }
        }
        console.log("STARI AVERAGE: " + average_grade);
        average_grade = (average_grade + parseInt(grade) )/2;
        var n = average_grade.toString();
        console.log("AVERAGE : " + n);
        
       var collection = db.collection('books');
       db.collection('books').updateOne(
         {
          "_id" : req.params._id.toString()
         
       },{
         $set: {
          "average_grade" : n
         }
       }, function(err, results){
         db.close();
       });
          
  
  res.send("Sve je super");
        });
      });

    app.get('/comments', (req, res) => {
      commentt.getComments((err, comments) => {
        if(err){
          throw err;
        }
        res.json(comments);
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


app.post('/myreadbooks/:_id/:_bid', (req, res) => {
  
  let body = req.body;
  let id = req.params._bid;
  let grade = body.grade;
  let text = body.text;
  let date = body.date_written;
  var myobj = { text: text, date_written: date, bookId: id };
  var average_grade = 0;
  book.getBooks((err, books) => {

    if(err){
    throw err;
    }
    var theBook = [];
      for (i = 0; i < books.length; i++) {
        if(books[i]['_id']== req.params._bid) {
          theBook.push(books[i]);
          average_grade = theBook[0].average_grade;
        }
      }
      average_grade = (average_grade + parseInt(grade) )/2;
      var n = average_grade.toString();
      db.collection("comments").insertOne(myobj, function(err, res) {
        if (err) throw err;
        db.close();
      });
        var newvalues = { $set: {average_grade: n} };
     
        var myquery = { "_id" : req.params._bid.toString()};
db.collection("books").updateOne(myquery, newvalues, function(err, res) {
  if (err) throw err;
  db.close();
});
res.send("Sve je super");
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

/*app.get('/myreadbooks/:_id/details/:_id', (req, res) => {
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
});*/

  




app.listen(3000);