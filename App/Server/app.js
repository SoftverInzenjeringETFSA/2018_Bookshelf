var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var chalk = require('chalk');

var indexRouter = require('./routes/index');
var registrationRouter = require('./routes/registrationRoute');
// var usersRouter = require('./routes/users');

//database string
// const MongoClient = require('mongodb').MongoClient;

// const MONGO_URL = 'mongodb://userdb:userdb@ds016148.mlab.com:16148/bookshelfdb';
// MongoClient.connect(MONGO_URL, (err,db)=> {
//   if(err) {
//     return console.log(err);
//   }
//   console.log("moze baza ");
  

// });


// const mongoose = require('mongoose');
// const config = require('./config');

// mongoose.Promise = global.Promise;
// mongoose.connect(config.database.connectionString);

// let db = mongoose.connection;

// // Check connection
// db.once('open', function(){
//     console.log('Connected to MongoDB');
// });
  
// // Check for DB errors
// db.on('error', function(err){
//     console.error(err);
// });

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/registration', registrationRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    //eslint-disable-next-line no-console
    console.log(chalk.bgBlue.whiteBright.bold("Listening on port: " + PORT + " "));
});

module.exports = app;
