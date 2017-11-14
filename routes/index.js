const path = require("path")

const constructorMethod = (app) => {

    app.get("/",(req,res) => {
        res.sendFile(path.resolve("static/add_expense.html"))
    })

    app.get("/login",(req,res) => {
        res.sendFile(path.resolve("static/login.html"))
    })

}

module.exports = constructorMethod