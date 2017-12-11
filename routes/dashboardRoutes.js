const express = require("express")
const router = express.Router()
//const data = require("../data")
var User = require("../data/register");
const transactionData = require("../data/transactions")
const categoryData = require("../data/categories");
const bankData = require("../data/bank")
var expressValidator = require("express-validator");


router.get("/", async(req, res) => {
    const userName = req.session.passport.user;
    const allExpenses = await transactionData.getAllExpenses(userName);
    console.log(allExpenses)
    let all_Expenses = []
    if(allExpenses.length >= 3) {
        for(let i = 0;i<3;i++) {
            all_Expenses.push(allExpenses[i])
        }
    }
    else if( allExpenses.length == 1 || allExpenses.length == 2) {
        all_Expenses = allExpenses
    }
    else {
        all_Expenses = undefined
    }
    res.render("dashboard",{ expenses: all_Expenses })
})

module.exports = router