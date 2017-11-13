const express = require("express");
const configRoutes = require("./routes");


const app = express();
const static = express.static(__dirname + "/public");
configRoutes(app);

app.use("/public",static);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});