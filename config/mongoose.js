require('dotenv').config()
const mongoose = require('mongoose');
const msp = require('mongo-parser');
const parser = require('mongo-parse');
// connect from mongodb
 //const dataBASE = process.env.DATABASE;
mongoose.connect(process.env.MongoDB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true
      });
      
      //.then(() => console.log('MongoDB Connected...'))
      //.catch((err) => console.log(err));
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
