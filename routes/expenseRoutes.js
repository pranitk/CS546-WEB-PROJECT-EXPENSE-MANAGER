const express = require("express")
const router = express.Router()
//const data = require("../data")
var User = require("../data/register");
const transactionData = require("../data/transactions")
const categoryData = require("../data/categories");
const bankData = require("../data/bank")
var expressValidator = require("express-validator");
//const xss = require('xss');

router.get("/showAllExpenses",async(req,res)=>{
    const userName = req.session.user;
    //console.log("Username logged is "+userData)
    const allExpenses = await transactionData.getAllExpenses(userName);
    
    //res.send(`username ${userData}`);
    res.render("transactions/all_expenses",{ expenses: allExpenses })
})

router.get("/viewExpense/:id",async(req,res)=>{
    const userData = req.session.user;
    //console.log("Username logged is "+userData)
    let id = req.params.id
    //console.log("Fetching expense details for "+id)

    const expense = await transactionData.getTransactionById(id)

    if(!expense)
        throw 'Expense not found'

    res.render("transactions/view_expense",{ expense: expense})

    //return expense
})

router.post("/saveNewExpense",async(req,res)=>{
    

    try{

        console.log("Add expense route method called")
        const expenseInfo = req.body
        const amount = expenseInfo.amount
        const desc = expenseInfo.description
        const categoryDetails = expenseInfo.selected_category
        const bankAccountNumber = expenseInfo.selected_bank_account
        console.log("Date is "+expenseInfo.dt)
        console.log("Selected category is "+expenseInfo.selected_category)
        console.log("Selected bank account is "+bankAccountNumber)

        if(!amount)
            throw 'Amount not specified'

        if(!desc)
            throw 'Description not specified'
        

        if(!categoryDetails)
            throw 'Category not specified'

        if(!bankAccountNumber)
            throw 'Bank account not selected' 


        var username = req.session.user;
        const newTransaction = await transactionData.addTransaction(username,1,amount,desc,categoryDetails,bankAccountNumber,"")

        if(!newTransaction)
            throw 'New Transaction not added' 

        console.log("Expense save to db..redirect to all expenses")
        //let updateResult = await bankData.updateAccount(loggedUser,account_number,1,amount)
        res.redirect('showAllExpenses')

    }catch(e){
        res.sendStatus(500).json({ error: e})
    }
})



//Show the add expense page.
router.get("/addExpense",async(req,res)=>{
    console.log("Add expense get page route called")
    //let bank_accounts = await bankData.getAllAccounts(req.session.user._id)
    //res.render('transactions/add_expense')
    //res.render('transactions/add_expense',{ bank_accounts: bank_accounts })  // handlebar
    const username = req.session.user
    let bank_accounts = await bankData.getAllAccounts(username)
    const categories = await categoryData.getAllCategories(username)

    console.log("Bank accounts size "+bank_accounts.length)
    console.log("Categories size "+categories.length)

    res.render('transactions/add_expense',{ bank_accounts: bank_accounts , categories: categories })  // handlebar
})

router.post("/addNewCategory",async(req,res) => {

    let userData = req.session.user;
    let category = req.body.category;

    
        let newCategory = await categoryData.addNewCategory(userData,category,"");
        res.json({success : true, message : req.body.category});
    
    
    //console.log("New Category = "+newCategory.insertedId);
})

module.exports = router