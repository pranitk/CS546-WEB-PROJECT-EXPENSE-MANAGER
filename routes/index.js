const path = require("path")
const expenses = require("./expenseRoutes")

const constructorMethod = (app) => {


    // app.get("/",(req,res) => {
    //     res.sendFile(path.resolve("static/add_expense.html"))
    // })

    //app.use("/expenses",expenses)
    
    /*app.use("/showAllExpenses",expenses)
    app.use("/addExpense",expenses)*/

    app.use("/expenses",expenses)

    /*app.use("*",(req,res) => {
        //res.sendFile(path.resolve("static/header-material.html"))
        //res.render("/transactions/index")
        res.redirect("/add_expense");
    })*/

    /*app.get("/add_expense",(req,res) => {
        res.sendFile(path.resolve("static/add_expense.html"))
    })


    app.get("/login",(req,res) => {
        res.sendFile(path.resolve("static/login.html"))
    })

    app.get("/signup",(req,res) => {
        res.sendFile(path.resolve("static/signup.html"))
    })*/

}

module.exports = constructorMethod