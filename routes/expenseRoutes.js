const express = require("express")
const router = express.Router()
const transactionData = require("../data/transactions")


router.get("/showAllExpenses",async(req,res)=>{
    const allExpenses = await transactionData.getAllExpenses()
    res.render("transactions/all_expenses",{ expenses: allExpenses })
})

router.post("/saveNewExpense",async(req,res)=>{

    console.log("Add expense route method called")
    const expenseInfo = req.body

    try{

        if(!expenseInfo.amount)
            throw 'Amount not specified'

        if(!expenseInfo.description)
            throw 'Description not specified'
            
        const newTransaction = transactionData.addTransaction(1,expenseInfo.amount,expenseInfo.description,0,100,"")

        if(!newTransaction)
            throw 'New Transaction not added' 

        //res.send("Hello from Shreyas 2")
        res.render("transactions/all_expenses")

    }catch(e){
        res.sendStatus(500).json({ error: e})
    }
})

// router.get("/allExpenses",async(req,res)=>{

//     const allExpenses = await transactionData.getAllExpenses()
//     res.render("transactions/all_expenses")


// })

//Show the add expense page.
router.get("/addExpense",async(req,res)=>{
    console.log("Add expense get page route called")
    res.render('transactions/add_expense')  // handlebar
})

module.exports = router