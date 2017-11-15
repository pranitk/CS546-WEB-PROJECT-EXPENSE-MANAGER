const path = require("path")

const constructorMethod = (app) => {

    app.get("/",(req,res) => {
        res.sendFile(path.resolve("static/add_expense.html"))
    })

    app.get("/login",(req,res) => {
        res.sendFile(path.resolve("static/login.html"))
    })

    app.get("/signup",(req,res) => {
        res.sendFile(path.resolve("static/signup.html"))
    })

}

module.exports = constructorMethod