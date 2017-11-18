

var express = require("express");
var router = express.Router();
var expressValidator = require("express-validator");
router.use(expressValidator());
var User = require("../data/register");
// var expressValidator = require("express-validator");
// router.use(expressValidator());




router.get("/",function(req,res){
    res.render("login");


})

router.get("/signup",function(req,res){
    res.render("signup");
})

router.post("/login", (req, res) => {
    var username = req.body.unm;
    var Fname = req.body.fn;
    var Lname = req.body.ln;
    var password = req.body.pwd;
    var confirmPassword = req.body.cpwd;


    var errors = req.validationErrors();
    if(errors){
        res.render("signup",{
            errors : errors
        })
    }
    else{
        var newUser = new User({
            username : username,
            firstName: Fname,
            lastName: Lname,
            password : password,
            
        })
        User.createUser(newUser, function(err, user){
            if(err){
                throw err;
            }
        })

        req.flash("success_msg","You are registered and can now login");
        res.redirect("/home");
    }

})

module.exports = router;