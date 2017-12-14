const express = require("express")
const router = express.Router()
//const data = require("../data")
var User = require("../data/register");
const transactionData = require("../data/transactions")
const categoryData = require("../data/categories");
const bankData = require("../data/bank")
var expressValidator = require("express-validator");

router.get("/showAllIncome",async(req,res)=>{
    const userName = req.session.passport.user;
   // console.log("Username logged is "+userData)
    const allIncome = await transactionData.getAllIncome(userName)
    const incomeToAdd = await transactionData.getSumOfAllIncome(userName);
    console.log(incomeToAdd)

    // for(i = 0; i < incomeToAdd.length; i++){
    //     // total += incomeToAdd[i].amount;
    //     // console.log(total)
    //     console.log("total")
    // }
    

    res.render("transactions/all_income",{ income: allIncome })
})


router.get("/viewIncome/:id",async(req,res)=>{
    const userName = req.session.user;
   // console.log("Username logged is(/viewIncome/:id)"+userName)
    let id = req.params.id
    //console.log("Fetching income details for "+id)

    const income = await transactionData.getTransactionById(id)
    //const incomeToAdd = await transactionData.getSumOfAllIncome(id);
    


    if(!income)
        throw 'income not found'

    res.render("transactions/view_income",{ income: income})

})

router.post("/saveNewIncome",async(req,res)=>{
    
        console.log("Add income route method called")
        const incomeInfo = req.body

        var amount = incomeInfo.amount
        const desc = incomeInfo.description
       // const categoryDetails = expenseInfo.selected_category
        const bankAccountNumber = incomeInfo.selected_bank_account

        console.log("Acc Number" + bankAccountNumber)
        const date = incomeInfo.dt
        //console.log(incomeInfo)
        //console.log("Selected bank account is "+incomeInfo.selected_account)
        console.log("Date is" + date)
        
    try{
            if(!amount)
                throw 'Amount not specified'
    
            if(!desc)
                throw 'Description not specified'

            if(!bankAccountNumber)
                throw 'Bank account not selected'

            if(!date)
                 throw 'Date not specified'

            //req.checkBody("amount","Amount Is Required!").notEmpty();
            //req.checkBody("description","Description Is Required!").notEmpty();
            //req.checkBody("selected_bank_amount","Bank Account Not Selected").notEmpty();
            //req.checkBody("dt","Date Is Required!").notEmpty();

            amount = parseFloat(amount)
            console.log(amount)

            var username = req.session.passport.user;
                const newTransaction = await transactionData.addTransactionForIncome(username,2,amount,desc,bankAccountNumber,date)

                // if(!newTransaction)
                //     throw 'New Transaction not added' 
                
                    res.redirect("/income/showAllIncome")
            }

        catch(e){
            let bank_accounts = await bankData.getAllAccounts(req.session.passport.user)
            res.render("transactions/add_income",{errors: e, bank_accounts : bank_accounts})
                
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

        let bank_accounts = await bankData.getAllAccounts(req.session.passport.user)
        
            console.log("Bank accounts size "+bank_accounts.length)
        
            res.render('transactions/add_income',{ bank_accounts: bank_accounts })
    })

    router.get("/delete/:id", async(req, res) =>{
        console.log("Delete Income get page route called")
        const incomeID = req.params.id
        //console.log(incomeID)
        let deletedTransaction = await transactionData.deleteTransactionById(req.session.passport.user,incomeID)
       // console.log("Success in deleting")
        
        res.redirect("/income/showAllIncome")
        



    })
    module.exports = router