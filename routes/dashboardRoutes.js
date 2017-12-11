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
    const allAcc = await bankData.getAllAccounts(userName);
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
    //EXPENSE BY CATEGORY CARD --- for trial...change this by actual function and values
    let expByCat = [
        {
        amount : 50,
        category : {
            category_name : "Food and Dining",
            icon_name : "local_dining"
            }
        },
        {
            amount : 120,
            category : {
                category_name : "Entertainment",
                icon_name : "loyalty"
            }
        }]
    res.render("dashboard",{ expenses: all_Expenses, expensesByCategory : expByCat ,accounts : allAcc})
})


// router.post('/signout',async(req,res)=>{ 
//     console.log("ready to signout")   
//     await req.session.destroy(function(err){  
//         if(err){  
//             console.log(err);  
//         }  
//         else  
//         {  
//             res.redirect("login");  
//         }  
//     });  

// }); 

module.exports = router