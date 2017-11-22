

// var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");



var mongo= require('mongodb');
var mongodb= mongo.MongoClient;
const mongoCollections = require("../config/mongoCollections")
const users = mongoCollections.users
const uuid = require("node-uuid")
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


module.exports = {


    


    async getAllUsers()
    {
        const userCollection = await users();
        const allUsers = await userCollection.find({}).toArray();
        return allUsers;
    },

    async getUserById(id){
        if(!id) 
            throw "You must provide an username"
        
        const userCollection = await users();
       
        const userByUsername = await userCollection.findOne({_id : id });

        if(!userByUsername) {
            
            return true
        }
        console.log("Already exists")
        return false
        
     
    },

    async getUserByName(id){
        if(!id) 
        throw "You must provide an username"
        const userCollection = await users();
        
         const userByName = await userCollection.findOne({_id : id });
         var firstname = userByName.firstname

         return firstname;
    },




    async getUserByIdforLogin(id, password){
        let validUser = false;
        if(!id) 
            throw "You must provide an username"
        
        const userCollection = await users();
       
        const userByUsername = await userCollection.findOne({_id : id });
        //console.log(userByUsername)
        if(!userByUsername) {
            
            validUser = false;
            return validUser;
        }else{
            //console.log("Already exists")
            
            const userPassword = await userCollection.findOne({_id: id})
            //console.log(userPassword)
            var hashPassword = userPassword.password
            
            console.log(hashPassword)
            console.log(password)

            if(bcrypt.compareSync(password, hashPassword)) {
                console.log("match")
                return true;
               } else {
                console.log("mis- match")
                return false
               }
            // //bcrypt.compare(password, userPassword, function(err, res) {
            //     console.log("I am in here")
            //     if(res){
            //         console.log("match")
            //     }else{
            //         console.log("mis - match")
            //     }
            //     return res;
            // });

            
        }


        
       
        
     
    },
    
    async addNewUser(username, Fname, Lname, password){

        let newUser;
        let existing_user;
        let allUsers = [];
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                            // Store hash in your password DB.
                password = hash;
                

                newUser = {
                    _id: username,
                    firstname: Fname,
                    lastname: Lname,
                    password: password
        
                }
                
                //console.log(password)
            })
        })
        
        allUsers = await this.getAllUsers();

        let noOfUsers = allUsers.length;
        console.log(noOfUsers);

        if(noOfUsers <= 0)
        {
            let userCollection = await users();
            let insertedInfo = await userCollection.insertOne(newUser)
        }
        else
        {
            userDoesNotExist = await this.getUserById(username);
            console.log(existing_user);
            if(userDoesNotExist)
            {
                let userCollection = await users();
                let insertedInfo = await userCollection.insertOne(newUser)
        
                if(insertedInfo.insertedCount == 0)
                    throw 'Insertion failed'
                
                console.log("inserted user: "+insertedInfo)
                
            }
            else
            {
                throw "User Already Exists. Please login"
            }
        }
        

    }

        
}




//   https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt

    
