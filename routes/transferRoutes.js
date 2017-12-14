const express = require("express")
const router = express.Router()
const transactionData = require("../data/transactions")
const bankData = require("../data/bank")
const categoryData = require("../data/categories");

router.get("/showAllTransfers",async(req,res)=>{

    const username = req.session.passport.user;
    const allTransfers = await transactionData.getAllTransactions(username,3)

    res.render("transactions/all_transfers", { transfers: allTransfers })
})

router.post("/saveNewTransfer",async(req,res)=>{

    const username = req.session.passport.user
    const info = req.body

    const amount = parseFloat(info.amount)
    const desc = info.desc
    const sender_bank_account_number = info.selected_bank_account1
    const receiver_bank_account_number = info.selected_bank_account2
    const date = info.dt
    try{

    if(!amount)
        throw 'Amount not provided'

    if(!desc)
        throw 'Description not provided'

    if(!sender_bank_account_number)
        throw 'Sender bank account details not provided'


    if(!receiver_bank_account_number)
        throw 'Receiver bank account details not provided'

    if(!date)
        throw 'Date not provided'

    
    const transferInfo = await transactionData.saveTransfer(username,amount,sender_bank_account_number,receiver_bank_account_number,desc,date)

    if(!transferInfo)
        throw 'Saving transfer failed'

    console.log("Transfer transaction added -> "+transferInfo)

    res.redirect("/bankac/showAllAccounts")

    }catch(e){
        let bank_accounts = await bankData.getAllAccounts(req.session.passport.user)
        res.render("transactions/add_transfer",{errors: e, bank_accounts : bank_accounts})

    }

})

router.get("/addNewTransfer",async(req,res) => {

    const username = req.session.passport.user
    let bank_accounts = await bankData.getAllAccounts(username)

    res.render("transactions/add_transfer",{ bank_accounts: bank_accounts})
})

module.exports = router