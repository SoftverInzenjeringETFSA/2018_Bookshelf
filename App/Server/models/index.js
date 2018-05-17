const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;
mongoose.connect(config.database.connectionString);

// Check connection
mongoose.connection.once('open', function(){
    console.log('Connected to MongoDB');
});
  
// Check for DB errors
mongoose.connection.on('error', function(err){
    console.error(err);
});

module.exports = mongoose;
