const path = require("path")

const constructorMethod = (app) => {

<<<<<<< HEAD
    // app.get("/",(req,res) => {
    //     res.sendFile(path.resolve("static/add_expense.html"))
    // })
=======
    app.get("/",(req,res) => {
        res.sendFile(path.resolve("static/header-material.html"))
    })

    app.get("/add_expense",(req,res) => {
        res.sendFile(path.resolve("static/add_expense.html"))
    })
>>>>>>> 8e24f54bad94bf4d4b2ac0814d1368446f8d8225

    app.get("/login",(req,res) => {
        res.sendFile(path.resolve("static/login.html"))
    })

    app.get("/signup",(req,res) => {
        res.sendFile(path.resolve("static/signup.html"))
    })

}

module.exports = constructorMethod