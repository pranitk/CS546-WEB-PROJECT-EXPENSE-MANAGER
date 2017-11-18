const path = require("path")
const loginRoute = require("./loginRoute")
//const singupRoute = require("./signup")

const constructorMethod = (app) => {


    // app.get("/",(req,res) => {
    //     res.sendFile(path.resolve("static/add_expense.html"))
    // })

    // app.get("/",(req,res) => {
    //     res.sendFile(path.resolve("static/header-material.html"))
    // })

    // app.get("/add_expense",(req,res) => {
    //     res.sendFile(path.resolve("static/add_expense.html"))
    // })


    // app.get("/",(req,res) => {
    //     res.sendFile(path.resolve("static/login.html"))
    // })

    // app.get("/signup",(req,res) => {
    //     res.sendFile(path.resolve("static/signup.html"))
    // })

    app.use("/", loginRoute);
    app.use("/signup",loginRoute);




}

module.exports = constructorMethod