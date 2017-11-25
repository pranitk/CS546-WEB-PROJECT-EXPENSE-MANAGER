const path = require("path")

const loginRoute = require("./loginRoute")
//const singupRoute = require("./signupRoute")

const expenses = require("./expenseRoutes")
const income = require("./incomeRoute")


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
    //app.use("/signup",singupRoute);

    //app.use("/expenses",expenses)
    
    /*app.use("/showAllExpenses",expenses)
    app.use("/addExpense",expenses)*/

    app.use("/expenses",expenses)
    app.use("/income", income)

    /*app.use("*",(req,res) => {
        //res.sendFile(path.resolve("static/header-material.html"))
        //res.render("/transactions/index")
        res.redirect("/add_expense");
    })*/

    /*app.get("/add_expense",(req,res) => {
        res.sendFile(path.resolve("static/add_expense.html"))
    })
>>>>>>> 6920bd1597e5a4ab1e3598305985b52f0b13a9d7



<<<<<<< HEAD
=======
    app.get("/signup",(req,res) => {
        res.sendFile(path.resolve("static/signup.html"))
    })*/


}

module.exports = constructorMethod