
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
    const username = req.session.passport.user;
    console.log("Username logged is "+username)
    const allExpenses = await transactionData.getAllExpenses(username);
    
    //res.send(`username ${userData}`);
    res.render("transactions/all_expenses",{ title: "ALL EXPENSES", expenses: allExpenses })

    await transactionData.getSumOfTransactions(username,1)
})

router.get("/showExpensesByBank/:account_number",async(req,res)=>{
    const username = req.session.passport.user;
    const expenses = await transactionData.getAllTransactionsByBank(username,1,req.params.account_number)
    console.log("Expenses for a bank - "+expenses)
    const account_name = await bankData.getAccountName(req.params.account_number,username)
    const title = "ALL EXPENSES IN "+account_name.toUpperCase()
    res.render("transactions/all_expenses",{ title: title ,expenses: expenses })
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
        var amount = expenseInfo.amount
        const desc = expenseInfo.description
        const categoryDetails = expenseInfo.selected_category
        const bankAccountNumber = expenseInfo.selected_bank_account
        const date = expenseInfo.dt
        console.log("Date is "+date)
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

        if(!date)
            throw 'Date not selected'

        amount = parseFloat(expenseInfo.amount)

        var username = req.session.passport.user;
        const newTransaction = await transactionData.addTransaction(username,1,amount,desc,categoryDetails,bankAccountNumber,date)

        if(!newTransaction)
            throw 'New Transaction not added' 

        console.log("Expense save to db..redirect to all expenses")
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
    const username = req.session.passport.user
    let bank_accounts = await bankData.getAllAccounts(username)
    const categories = await categoryData.getAllCategories(username)

    console.log("Bank accounts size "+bank_accounts.length)
    console.log("Categories size "+categories.length)

    res.render('transactions/add_expense',{ bank_accounts: bank_accounts , categories: categories })  // handlebar
})

router.put("/updateExpense",async(req,res)=>{




})


router.get("/editExpense/:id",async(req,res)=>{
    const username = req.session.passport.user
    let bank_accounts = await bankData.getAllAccounts(username)
    const categories = await categoryData.getAllCategories(username)

    const expense = await transactionData.getTransactionById(req.params.id)
    console.log("Expense to be updated "+expense)

    res.render('transactions/edit_expense',{ expense: expense,  bank_accounts: bank_accounts , categories: categories })
})

router.post("/addNewCategory",async(req,res) => {

    let userData = req.session.passport.user;
    let category = req.body.category;

        try
        {
            let newCategory = await categoryData.addNewCategory(userData,category,"");
            res.json({success : true, message : req.body.category});
        }
        catch(e)
        {
            res.json({success : false,message : "Category Already Exists"});
        }
        
    
    
    //console.log("New Category = "+newCategory.insertedId);
})


router.delete("/delete/:id",async(req,res)=>{

    try{

        const deleteResult = await transactionData.deleteTransactionById(req.params.id)

        if(!deleteResult){

            res.redirect("/showAllExpenses")

        }

    }
    catch(e){
        console.log(e)
    }
})

module.exports = router