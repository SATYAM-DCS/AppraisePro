require('dotenv').config() // require .env
const session = require('express-session');
//const MongoStore = require('connect-mongo');
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
//const session = require("express-session");
//const dotenv = require("dotenv"); //require dotenv package
//dotenv.config({ path: "./config.env" }); //import config.env file
//require('dotenv').config({ path: './.env' });


const passport = require("passport");
const passportLocal = require("./config/passport-local");
const MongoStore = require("connect-mongo");

const db = require("./config/mongoose");

// const DB = process.env.DATABASE;
const PORT = process.env.PORT;

const app = express();
//const dbUrl = process.env.DB_URL;

// for static files
app.use(expressLayouts);
app.use(express.static("./assets"));
// view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//------BodyParser--------//
app.use(express.urlencoded({ extended: false }));

// to render css file link in header
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// middleware for use session cookie
app.use(
  session({
    name: "employeeReview",
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl:  "mongodb : process.env.MONGO_URI",  //process.env.MONGO_URI , //process.env.DATABASE, //"mongodb : //localhost:27017/habit",  
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use("/", require("./routes/index"));

app.listen(process.env.PORT, function (err) {
  if (err) {
    console.log("Error while connecting to server");
    return;
  }
  console.log(`Server running on port ${process.env.PORT}.`);
});
