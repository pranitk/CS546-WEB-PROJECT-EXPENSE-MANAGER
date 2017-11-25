const path = require("path")

const loginRoute = require("./loginRoute")
//const singupRoute = require("./signupRoute")

const expenses = require("./expenseRoutes")
const income = require("./incomeRoute")


const constructorMethod = (app) => {


   
    app.use("/", loginRoute);
    

    app.use("/expenses",expenses)
    app.use("/income", income)

   


}

module.exports = constructorMethod