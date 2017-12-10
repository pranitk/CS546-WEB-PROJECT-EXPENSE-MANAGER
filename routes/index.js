const path = require("path")

const loginRoute = require("./loginRoute")
//const singupRoute = require("./signupRoute")

const expenses = require("./expenseRoutes")
const income = require("./incomeRoute")
const transfers = require("./transferRoutes")
const bankacRoute = require("./bankac")
const dashboard = require("./dashboardRoutes")

const constructorMethod = (app) => {


   
    app.use("/", loginRoute);
    

    app.use("/expenses",expenses)
    app.use("/income", income)
    app.use("/transfer", transfers)
    app.use("/bankac",bankacRoute)
    //app.use("/expenses",expenses)
    //app.use("/income", income)
    //app.use("/transfer", transfers)
    app.use("/dashboard",dashboard)

   


}

module.exports = constructorMethod
