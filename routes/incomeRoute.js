const express = require("express")
const router = express.Router()
//const data = require("../data")
var User = require("../data/register");
const transactionData = require("../data/transactions")

router.get("/showAllExpenses",async(req,res)=>{
    const allExpenses = await transactionData.getAllExpenses()
    res.render("transactions/all_expenses",{ expenses: allExpenses })
})

router.post("/saveNewIncome",async(req,res)=>{
    
        console.log("Add income route method called")
        const incomeInfo = req.body
    
        try{
    
            if(!incomeInfo.amount)
                throw 'Amount not specified'
    
            if(!incomeInfo.description)
                throw 'Description not specified'

            if(!incomeInfo.dt)
                throw 'Date not specified'
                
                var loggedUser = req.session.user;
            const newTransaction = transactionData.addTransaction(loggedUser,2,incomeInfo.amount,incomeInfo.description,0,100,incomeInfo.dt)
    
            if(!newTransaction)
                throw 'New Transaction not added' 
            
    
            //res.send("Hello from Shreyas 2")
            res.redirect("/expenses/showAllExpenses")
    
        }catch(e){
            res.sendStatus(500).json({ error: e})
        }
    })
    
    
    //Show the add expense page.
    router.get("/addIncome",async(req,res)=>{
        console.log("Add Income get page route called")
        res.render('transactions/add_income')  // handlebar
    })

    module.exports = router