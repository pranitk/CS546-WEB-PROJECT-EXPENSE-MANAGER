var express = require("express");
var router = express.Router();
var User = require("../data/register");

//Get Login Page
router.get("/",async(req,res)=>{
    res.render("login");
})

//Get Signup Page
router.get("/signup",async(req,res)=>{
    res.render("signup");
})

//Create New User
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

        // if(password != confirmPassword)
        // {
        //     throw 'Passwords do not match'
        // }
                    
        console.log("Validations done")
        const newUser = await User.addNewUser(username,Fname,Lname,password);//Insert into database
        console.log("Save kelay mi..tumhalach kahi yet nahi")
        
        if(!newUser)
        {
            throw 'New User not added' 
        }
                    
        res.render("transactions/all_expenses")
        
    }
    catch(e)
    {
        console.log("Session failed..slapped "+e)
        
        res.render("signup",{error : e })//If any errors, render the same page with all errors.
    } 

})

module.exports = router;