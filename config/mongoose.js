require('dotenv').config()
const mongoose = require('mongoose');

// connect from mongodb
 //const dataBASE = process.env.DATABASE;
mongoose.connect(process.env.DATABASE);
    /*{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });*/
// mongoose.connect('tabase?retryWrites=true&w=majority');

// aquire connection if it is succesful
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error connecting to db'));

// up and running then print the message
db.once('open', function(){
    console.log("successfully connected to database!");
});

module.exports = db;
