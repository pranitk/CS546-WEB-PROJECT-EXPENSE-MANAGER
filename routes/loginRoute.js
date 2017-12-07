var express = require("express");
var passport = require("passport");
var Strategy = require("passport-local").Strategy;
var expressValidator = require("express-validator");

var router = express.Router();
router.use(expressValidator());
var User = require("../data/register");
var UserCategory = require("../data/categories");

//Passport
passport.use(new Strategy({
    usernameField : 'username',
    passwordField : 'password',
},
async function(username, password, done) {
    await User.getUserByUserId(username, async function(err, user) {
        if(err) { return done(err); }
        if(!user) { return done(null, false, {message: "User NOT FOUND!"}); } 
        let chkpswd = await User.verifyPassword(password, user.password);
        if(chkpswd != true) { return done(null, false, {message: "Oops! Wrong Password."}); }
        return done(null, user);
    });
}));

passport.serializeUser(function(user,done) {
    done(null, user._id);
});

passport.deserializeUser( async function(username, done) {
    await User.getUserByUserId(username, function(err, user) {
        if(err) { return done(err); }
        done(null, user);
    });
});

//Get Login Page
router.get("/",async(req,res)=>{
    if(req.isAuthenticated()) {
        console.log("Hello");
        res.redirect('/expenses/showAllExpenses');
    }
    else {
        res.render('login',{message:req.flash('error')});
    }
})


//Get Signup Page
router.get("/signup",async(req,res)=>{
    res.render("signup");
})


//
router.post("/",passport.authenticate("local"),
async (req,res) => {
    let userSession = req.session;
    userSession.user = req.body.username;
    console.log(req.body.username);

    if(req.isAuthenticated())
    {
        res.redirect("/expenses/showAllExpenses");
    }
    else
    {
        res.redirect("/");
    }
    req.flash("success_msg","Welcome");
    //res.redirect("/private");
})

//Create New User
router.post("/createNewUser", async(req, res) => {

    var userSession = req.session;
    //console.log("Mi aloy ikde chutiya")
    
    var username = req.body.username;
    console.log(username);
    var Fname = req.body.firstname;
    var Lname = req.body.lastname;
    var password = req.body.password;
    var confirmPassword = req.body.confirmpassword;


    //Validations
    req.checkBody("username","Username Is Required!").notEmpty();
    req.checkBody("firstname","First Name Is Required!").notEmpty();
    req.checkBody("lastname","Last Name Is Required!").notEmpty();
    req.checkBody("password","Please Enter Password").notEmpty();
    req.checkBody("confirmpassword","Passwords Do Not Match").equals(password);

    var errors = req.validationErrors();
    if(errors)
    {
        res.render("signup",{errors : errors});
    }
    else
    {
        var newUser = await User.addNewUser(username,Fname,Lname,password);
        var categoriesForNewUser = await UserCategory.addCategoryForNewUser(username);
        res.render("login");
    }
})

module.exports = router;

//Old COde