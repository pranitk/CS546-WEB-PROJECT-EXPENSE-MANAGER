/*var express = require("express");
var router = express.Router();
var expressValidator = require("express-validator");
router.use(expressValidator());


//Get Home Page
router.get("/",(req,res) => {
    res.render("login");
});


router.post("/login", (req, res) => {
    var username = req.body.unm;
    var password = req.body.pswd;
    req.checkBody("unm","username is required").notEmpty();
    req.checkBody("pwd","Please enter password").notEmpty();

    var errors = req.validationErrors()
    if(errors){
        res.render("register", {
            errors: error
        })
    }else{
        var newUser = new User({
            username : username,
            password : password,
            
        })

        User.createUser(newUser,function(err,user){
            if(err) throw err;
            console.log(user);
        })

        req.flash("success_msg","You are registered and can now login");
        res.redirect("/home");
    }
})

module.exports = router;*/