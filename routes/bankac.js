const express = require("express")
const router = express.Router()
const bankData = require("../data/bank")
var expressValidator = require("express-validator");

router.get("/showAllAccounts", async(req,res)=> {
    const allAccounts = await bankData.getAllAccounts(req.session.passport.user) // update with user_id
    res.render("bankac/all_accounts",{accounts : allAccounts})
})

router.post("/saveNewAccount",async(req,res)=>{
    
        console.log("Add bankac route method called")
        const accountInfo = req.body

        req.checkBody("accountInfo.name","Bank Name not specified!").notEmpty();
        req.checkBody("accountInfo.number","Account Number not specified!").notEmpty();
        req.checkBody("accountInfo.balance","Bank Balance not specified!").notEmpty();
        
        let bal_floattype = parseFloat(accountInfo.balance)

        var errors = req.validationErrors();
        if(errors)
        {
           
            res.render("bankac/add_bankac",{errors : errors});
            
            return;
        }
        else{

                
            const newAccount = bankData.addBankAC(req.session.passport.user,accountInfo.name,accountInfo.number,bal_floattype)
            
                    if(!newAccount)
                        throw 'New Bank Account not added' 
                    
                    const allAccounts = await bankData.getAllAccounts(req.session.passport.user) // update with user_id
                    console.log(allAccounts)
                    // res.render("bankac/all_accounts",{accounts : allAccounts})
                    let response1 = req.body.nob
                    let response2 = req.body.yesb
                    //modal handling
                    if(response1) {
                        res.redirect("/dashboard")
                    }
                    else {
                        res.redirect("/bankac/addBankAC")
                    }
            
        }
    
        // try{
    
        //     if(!accountInfo.name)
        //         throw 'Bank Name not specified'
    
        //     if(!accountInfo.number)
        //         throw 'Account Number not specified'

        //     if(!accountInfo.balance)
        //         throw 'Bank Balance not specified'

        //     if(accountInfo.number.length < 6)
        //         throw "Account Number must be at least 6 charcters long"
            
        //     let bal_floattype = parseFloat(accountInfo.balance)
        //     const newAccount = bankData.addBankAC(req.session.passport.user,accountInfo.name,accountInfo.number,bal_floattype)
    
        //     if(!newAccount)
        //         throw 'New Bank Account not added' 
            
        //     const allAccounts = await bankData.getAllAccounts(req.session.passport.user) // update with user_id
        //     console.log(allAccounts)
        //     // res.render("bankac/all_accounts",{accounts : allAccounts})
        //     let response1 = req.body.nob
        //     let response2 = req.body.yesb
        //     //modal handling
        //     if(response1) {
        //         res.redirect("/dashboard")
        //     }
        //     else {
        //         res.redirect("/bankac/addBankAC")
        //     }
    
        // }catch(e){
        //     res.sendStatus(500).json({ error: e})
        // }
    })
    
    router.post("/deleteAccount", async(req,res) => {
        let response1 = req.body.nob
        let response2 = req.body.yesb
        let acno = req.body.acn
        console.log("acno-",acno)
        //modal handling
        if(response1) {
            res.redirect("/bankac/showAllAccounts")
        }
        else if(response2 && acno != undefined) {
            //let accno = response2.substr(4,)
            console.log("Deleting account with account number-",acno)
            const delAccount = bankData.deleteAccountByNumber(req.session.passport.user,acno)
            res.redirect("/bankac/showAllAccounts")
        }
    })
    //Show the add bank account page.
    router.get("/addBankAC",async(req,res)=>{
        console.log("Add Bank account get page route called")
        res.render('bankac/add_bankac')  // handlebar
    })

    module.exports = router
