const express = require("express")
const router = express.Router()
//const data = require("../data")
var User = require("../data/register");
const transactionData = require("../data/transactions")
const categoryData = require("../data/categories");
const bankData = require("../data/bank")
var expressValidator = require("express-validator");


router.get("/", async(req, res) => {
    const userName = req.session.user;

    res.render("dashboard")
})

module.exports = router