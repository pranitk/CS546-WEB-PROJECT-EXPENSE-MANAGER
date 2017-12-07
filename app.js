const express = require("express");
const handlebars = require('express-handlebars')
const session = require("express-session");
const expressValidator = require("express-validator");
const configRoutes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require("path");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const passport = require("passport");
var Strategy = require("passport-local").Strategy;
var mongo = require("mongodb");



//Init app
const app = express();


//Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//View Engine
app.engine('handlebars',handlebars({defaultLayout: 'main'}))
app.set('view engine','handlebars');

//Initialize session
app.use(session({
  secret : "secret",
  saveUninitialized : true,
  resave : true
}));

//Configure For using Flash Messages
app.use(flash());

//Init Passport
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use(function(req,res,next){
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Set Static Folder
const static = express.static(__dirname + "/public");
app.use("/public",static)


app.use(cookieParser());

//Express validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));


  configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});