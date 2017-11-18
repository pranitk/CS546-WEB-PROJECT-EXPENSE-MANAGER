const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require('express-handlebars')
const configRoutes = require("./routes");


//Init app
const app = express();

//Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//View Engine
app.engine('handlebars',handlebars({defaultLayout: 'main'}))
app.set('view engine','handlebars')

//Set Static Folder
const static = express.static(__dirname + "/public");
app.use("/public",static)



configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});