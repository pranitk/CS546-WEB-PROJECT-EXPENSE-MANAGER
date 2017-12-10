const express = require("express")
const router = express.Router()
const bankData = require("../data/bank")

router.get("/showAllAccounts", async(req,res)=> {
    const allAccounts = await bankData.getAllAccounts(req.session.user) // update with user_id
    res.render("bankac/all_accounts",{accounts : allAccounts})
})

router.post("/saveNewAccount",async(req,res)=>{
    
        console.log("Add bankac route method called")
        const accountInfo = req.body
    
        try{
    
            if(!accountInfo.name)
                throw 'Bank Name not specified'
    
            if(!accountInfo.number)
                throw 'Account Number not specified'

            if(!accountInfo.balance)
                throw 'Bank Balance not specified'
                
            const newAccount = bankData.addBankAC(req.session.user,accountInfo.name,accountInfo.number,accountInfo.balance)
    
            if(!newAccount)
                throw 'New Bank Account not added' 
            
            const allAccounts = await bankData.getAllAccounts(req.session.user) // update with user_id
            console.log(allAccounts)
            // res.render("bankac/all_accounts",{accounts : allAccounts})
            let response1 = req.body.nob
            let response2 = req.body.yesb
            //modal handling
            if(response1) {
                res.redirect("/bankac/showAllAccounts")
            }
            else {
                res.redirect("/bankac/addBankAC")
            }
    
        }catch(e){
            res.sendStatus(500).json({ error: e})
        }
    })
    
    router.post("/deleteAccount", async(req,res) => {
        let response1 = req.body.nob
        let response2 = req.body.yesb
        //modal handling
        if(response1) {
            res.redirect("/bankac/showAllAccounts")
        }
        else if(response2) {
            let accno = response2.substr(4,)
            console.log("Deleting account with account number-",accno)
            const delAccount = bankData.deleteAccountByNumber(accno)
            res.redirect("/bankac/showAllAccounts")
        }
    })
    //Show the add bank account page.
    router.get("/addBankAC",async(req,res)=>{
        console.log("Add Bank account get page route called")
        res.render('bankac/add_bankac')  // handlebar
    })

    module.exports = router
