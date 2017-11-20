// var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");


// var UserSchema = mongoose.Schema({
//     email : {
//         type: String,
//         index: true
//     },
//     Fname : {
//         type: String
//     },
//     Lname : {
//         type: String
//     },
//     password : {
//         type: String
//     },
//     confirmPassword : {
//         type: String
//     },

// });

// var User =module.exports = mongoose.model("user", UserSchema)

// module.exports.createUser = function(newUser,callback){
//     var bcrypt = require('bcryptjs');
//     bcrypt.genSalt(10, function (err, salt) {
//         bcrypt.hash(newUser.password, salt, function (err, hash) {
//             // Store hash in your password DB.
//             //newUser.password = hash;
//             newUser.save(callback); 
//         });
//     });
// } 


// module.exports.getUserByUsername = function(username,callback){
//     var query = {username : username};
//     User.findOne(query,callback);
// }

// module.exports.getUserById = function(id,callback){
//     User.findById(id,callback);
// }

// module.exports.comparePassword = function(candidatePassword,hash,callback){
//     bcrypt.compare(candidatePassword,hash,function(err,isMatch){
//         if(err) throw err;
//         callback(null,isMatch);
//     });
// }

const mongoCollections = require("../config/mongoCollections")
const users = mongoCollections.users
const uuid = require("node-uuid")

module.exports = {

    async getUserByUsername(username){
        if(!username) 
            throw "You must provide an username"
        
        const userCollection = await users();
        const userByUsername = await userCollection.findOne({username:username});

        if(!userByUsername) 
            return true
        
        return false
        
     
    },
    
    async addNewUser(username, Fname, Lname, password){

        var existing_user = await this.getUserByUsername(username);
        console.log(existing_user);
        if(existing_user)
        {
            
            var newUser;
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                                // Store hash in your password DB.
                    password = hash;
    
                    newUser = {
                        _id: uuid.v4(),
                        username: username,
                        firstname: Fname,
                        lastname: Lname,
                        password: password
            
                    }
                    
                    //console.log(password)
                })
            })
    
            
    
            const userCollection = await users();
            const insertedInfo = await userCollection.insertOne(newUser)
    
            if(insertedInfo.insertedCount == 0)
                throw 'Insertion failed'
            
            console.log("inserted expense: "+insertedInfo)
            
        }
        else
        {
            throw "User Already Exists. Please login"
        }

        }

        
}



    
