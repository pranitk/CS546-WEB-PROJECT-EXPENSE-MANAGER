const express = require("express")
const router = express.Router()
const bankData = require("../data/bank")

router.get("/showAllAccounts", async(req,res)=> {
    const allAccounts = await bankData.getAllAccounts(07) // update with user_id
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
                
            const newAccount = bankData.addBankAC(07,accountInfo.name,accountInfo.number,accountInfo.balance) //update with user_id
    
            if(!newAccount)
                throw 'New Bank Account not added' 
            
            const allAccounts = await bankData.getAllAccounts(07) //update with user_id
            console.log(allAccounts)
            res.render("bankac/all_accounts",{accounts : allAccounts})
    
        }catch(e){
            res.sendStatus(500).json({ error: e})
        }
    })
    
    
    //Show the add bank account page.
    router.get("/addBankAC",async(req,res)=>{
        console.log("Add Bank account get page route called")
        res.render('bankac/add_bankac')  // handlebar
    })

    module.exports = router
