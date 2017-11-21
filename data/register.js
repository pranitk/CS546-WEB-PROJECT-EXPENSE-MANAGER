

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

    async getUserByIdforLogin(id, password){
        let validUser;
        if(!id) 
            throw "You must provide an username"
        
        const userCollection = await users();
       
        const userByUsername = await userCollection.findOne({_id : id });
        //console.log(userByUsername)
        if(!userByUsername) {
            
            validUser = false;
        }else{
            //console.log("Already exists")
            
            const userPassword = await userCollection.findOne({_id: id})
            //console.log(userPassword)
            var hashPassword = userPassword.password
            console.log(hashPassword)
            bcrypt.compare(password, userPassword, function(err, res) {
                return true
            });
            
        }


        return validUser;
       
        
     
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



    
