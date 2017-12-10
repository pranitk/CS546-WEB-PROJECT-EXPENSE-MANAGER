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


router.get("/addNewTransfer",async(req,res) => {

    const username = req.session.user
    let bank_accounts = await bankData.getAllAccounts(username)

    res.render("transactions/add_transfer",{ bank_accounts: bank_accounts})
})

module.exports = router