const express = require("express")
const router = express.Router()
//const data = require("../data")
var User = require("../data/register");
const transactionData = require("../data/transactions")
const categoryData = require("../data/categories");
const bankData = require("../data/bank")
var expressValidator = require("express-validator");

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

        const amount = incomeInfo.amount
        const desc = incomeInfo.description
       // const categoryDetails = expenseInfo.selected_category
        const bankAccountNumber = incomeInfo.selected_bank_account
        const date = incomeInfo.dt
        console.log(incomeInfo)
        //console.log("Selected bank account is "+incomeInfo.selected_account)
    
        
    
            // if(!amount)
            //     throw 'Amount not specified'
    
            // if(!desc)
            //     throw 'Description not specified'

            // if(!bankAccountNumber)
            //     throw 'Bank account not selected'

            // if(!date)
            //     throw 'Date not specified'
            req.checkBody("amount","Username Is Required!").notEmpty();
            req.checkBody("description","Description Is Required!").notEmpty();
            req.checkBody("dt","Date Is Required!").notEmpty();

            var errors = req.validationErrors();
            if(errors)
            {
                res.render("transactions/add_income",{errors : errors});
                return;
            }
            else{

                    
                var loggedUser = req.session.user;
                const newTransaction = transactionData.addTransactionForIncome(loggedUser,2,amount,desc,bankAccountNumber,date)

                if(!newTransaction)
                    throw 'New Transaction not added' 
                
                    res.redirect("showAllIncome")
            }
            
       
            //let updateResult = await bankData.updateAccount(loggedUser,account_number,2,amount)
            //res.send("Hello from Shreyas 2")
            
    
        // }catch(e){
        //     //res.sendStatus(500).json({ error: e})
        //     console.log("I am here")
        //     res.render("transactions/add_income",{
        //         error: e
                
        //     })
        //     return;
        // }
    })
    
    
    //Show the add expense page.
    router.get("/addIncome",async(req,res)=>{
        console.log("Add Income get page route called")
        // res.render('transactions/add_income')  // handlebar

        let bank_accounts = await bankData.getAllAccounts(req.session.user)
        
            console.log("Bank accounts size "+bank_accounts.length)
        
            res.render('transactions/add_income',{ bank_accounts: bank_accounts })
    })

    router.get("/delete", async(req, res) =>{
        console.log("Delete Income get page route called")
        const incomeInfo = req.body

        console.log(incomeInfo)
        res.redirect("showAllIncome")



    })
    module.exports = router