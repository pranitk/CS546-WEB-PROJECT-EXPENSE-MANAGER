

var express = require("express");

//var express = require("express");

var router = express.Router();
// var expressValidator = require("express-validator");
// router.use(expressValidator());
var User = require("../data/register");
// var expressValidator = require("express-validator");
// router.use(expressValidator());




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
        const existingUser = await User.getUserByIdforLogin(username)
        
       // console.log(existingUser)
        //console.log(existingUserPassword)
        if(existingUser){
            console.log("login Successful")
            res.render("transactions/all_expenses")
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
                    
        //console.log("Validations done")
        const newUser = await User.addNewUser(username,Fname,Lname,password);
        //console.log("Save kelay mi..tumhalach kahi yet nahi")
        
        /*if(!newUser)
        {
            throw 'New User not added' 
        }*/
                    
        res.render("transactions/all_expenses")
        
    }
    catch(e)
    {
        console.log("Session failed..slapped "+e)
        //res.sendStatus(500).json({ error: e})
        res.render("signup",{error : e })
    } 

})

module.exports = router;