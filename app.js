const express = require("express");
const handlebars = require('express-handlebars')
const session = require("express-session");
const configRoutes = require("./routes");
const bodyParser = require("body-parser");
const path = require("path");
const bcryptjs = require("bcryptjs");
var mongo = require("mongodb");



//Init app
const app = express();

//Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//View Engine
app.engine('handlebars',handlebars({defaultLayout: 'main'}))
app.set('view engine','handlebars')

//Set Static Folder
const static = express.static(__dirname + "/public");
app.use("/public",static)

app.use(session({
    secret : "secret",
    saveUninitialized : true,
    resave : true
}));


configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});