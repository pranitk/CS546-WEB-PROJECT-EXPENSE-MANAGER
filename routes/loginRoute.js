var express = require("express");
var router = express.Router();
var User = require("../data/register");
var UserCategory = require("../data/categories");

//Get Login Page
router.get("/",async(req,res)=>{
    res.render("login");
})



router.get("/signup",async(req,res)=>{
    res.render("signup");
})


router.post("/", async(req, res) => {
    console.log("aalas ka parat")

    var username = req.body.username;
    var password = req.body.password;

    try{

        if(!username){
            throw "Username not specified"
        }

        if(!password){
            throw "Password not specified"
        }
        console.log("Chutiya tulach kahi yet nahi")
        const existingUser = await User.getUserByIdforLogin(username, password)
        console.log(existingUser)
       // console.log(existingUser)
        //console.log(existingUserPassword)
        if(existingUser){
            console.log("login Successful")
            const firstName = await User.getUserByName(username)
            res.render("transactions/all_expenses", {firstname: firstName })
        }else{
            throw "Invalid UserID or password"

        }
    }catch(e){
        console.log("Session failed..slapped "+e)
        //res.sendStatus(500).json({ error: e})
        res.render("login",{error : e })
    }

})

router.post("/createNewUser", async(req, res) => {

    console.log("Mi aloy ikde chutiya")
    var username = req.body.username;
    var Fname = req.body.firstname;
    var Lname = req.body.lastname;
    var password = req.body.password;
    var confirmPassword = req.body.confirmpassword;


    try
    {

        //Validations
        if(!username)
        {
            throw 'Username not specified'
        }
                    
        
        if(!Fname)
        {
            throw 'First Name not specified'
        }

        if(!Lname)
        {
            throw 'Last Name not specified'
        }

        if(!password)
        {
            throw 'Password not specified'
        }

        if(!confirmPassword)
        {
            throw 'Please Confirm Password'
        }

        
        const newUser = await User.addNewUser(username,Fname,Lname,password);
        const newUserCategory = await UserCategory.addCategoryForNewUser(username); 
        res.render("transactions/all_expenses")
        
    }
    catch(e)
    {
        console.log("Session failed..slapped "+e)
        
        res.render("signup",{error : e })//If any errors, render the same page with all errors.
    } 

})

module.exports = router;