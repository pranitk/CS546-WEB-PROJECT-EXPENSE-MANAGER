const express = require("express")
const router = express.Router()
//const data = require("../data")
var User = require("../data/register");
const transactionData = require("../data/transactions")
const categoryData = require("../data/categories");
const bankData = require("../data/bank")
var expressValidator = require("express-validator");


router.get("/", async(req, res) => {
    const userName = req.session.passport.user;

    res.render("dashboard")
})


// router.post('/signout',async(req,res)=>{ 
//     console.log("ready to signout")   
//     await req.session.destroy(function(err){  
//         if(err){  
//             console.log(err);  
//         }  
//         else  
//         {  
//             res.redirect("login");  
//         }  
//     });  

// }); 

module.exports = router