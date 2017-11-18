const express = require("express");
const configRoutes = require("./routes");
const bodyParser = require("body-parser");
const exhbs = require("express-handlebars");
const path = require("path");
const bcryptjs = require("bcryptjs");
var mongo = require("mongodb");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;


//Init app
const app = express();

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


//View Engine
app.set("views",path.join(__dirname,"views"));
app.engine("handlebars",exhbs({defaultLayout : "main"}));
app.set("view engine","handlebars");

//Set Static Folders
const static = express.static(__dirname + "/public");
app.use("/public",static);


configRoutes(app);

app.use("/public",static);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});