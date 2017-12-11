const express = require("express")
const router = express.Router()
const transactionData = require("../data/transactions")
const bankData = require("../data/bank")
const categoryData = require("../data/categories");

router.get("/showAllTransfers",async(req,res)=>{

    const username = req.session.user;
    const allTransfers = await transactionData.getAllTransactions(username,3)

    res.render("transactions/all_transfers", { transfers: allTransfers })
})

router.post("/saveNewTransfer",async(req,res)=>{

    const username = req.session.user
    const info = req.body

    const amount = info.amount
    const desc = info.desc
    const sender_bank_account_number = info.sender_bank_account1
    const receiver_bank_account_number = info.sender_bank_account2
    const date = info.date

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

    res.redirect("/showAllTransfers")

})

router.get("/addNewTransfer",async(req,res) => {

    const username = req.session.user
    let bank_accounts = await bankData.getAllAccounts(username)

    res.render("transactions/add_transfer",{ bank_accounts: bank_accounts})
})

module.exports = router