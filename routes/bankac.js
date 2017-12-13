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
        let bal_floattype = parseFloat(accountInfo.balance)
        let response1 = req.body.nob
        let response2 = req.body.yesb
        try {
            const newAccount = await bankData.addBankAC(req.session.passport.user,accountInfo.name,accountInfo.number,bal_floattype)
            
            if(response1) {
                res.redirect("/dashboard")
            }
            else {
                res.redirect("/bankac/addBankAC")
            }
        } catch(e) {
            res.render("bankac/add_bankac",{error:e})
        }

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
            try {
                const delAccount = await bankData.deleteAccountByNumber(req.session.passport.user,acno)
                res.redirect("/bankac/showAllAccounts")
            } catch(e) {
                const allAccounts = await bankData.getAllAccounts(req.session.passport.user) // update with user_id
                res.render("bankac/all_accounts", {accounts : allAccounts,error:e})
            }
        }
    })
    //Show the add bank account page.
    router.get("/addBankAC",async(req,res)=>{
        console.log("Add Bank account get page route called")
        res.render('bankac/add_bankac')  // handlebar
    })

    module.exports = router
