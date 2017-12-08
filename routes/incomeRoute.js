const express = require("express")
const router = express.Router()
//const data = require("../data")
var User = require("../data/register");
const transactionData = require("../data/transactions")

router.get("/showAllIncome",async(req,res)=>{
    const userName = req.session.user;
   // console.log("Username logged is "+userData)
    const allIncome = await transactionData.getAllIncome(userName)
    res.render("transactions/all_income",{ income: allIncome })
})


router.get("/viewIncome/:id",async(req,res)=>{
    const userName = req.session.user;
    console.log("Username logged is(/viewIncome/:id)"+userName)
    let id = req.params.id
    console.log("Fetching income details for "+id)

    const income = await transactionData.getTransactionById(id)

    if(!income)
        throw 'income not found'

    res.render("transactions/view_income",{ income: income})

    //return expense
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
            
                res.redirect("showAllIncome")
            //let updateResult = await bankData.updateAccount(loggedUser,account_number,2,amount)
            //res.send("Hello from Shreyas 2")
            
    
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