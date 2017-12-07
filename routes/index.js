const path = require("path")

const loginRoute = require("./loginRoute")
//const singupRoute = require("./signupRoute")

const expenses = require("./expenseRoutes")
const income = require("./incomeRoute")
const bankacRoute = require("./bankac")

const constructorMethod = (app) => {


   
    app.use("/", loginRoute);
    

    app.use("/expenses",expenses)
    app.use("/income", income)
    app.use("/bankac",bankacRoute)

   


}

module.exports = constructorMethod
