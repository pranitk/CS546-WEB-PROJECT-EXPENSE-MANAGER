var bcrypt = require("bcryptjs");
const mongoCollections = require("../config/mongoCollections")
const users = mongoCollections.users
const uuid = require("node-uuid")

module.exports = {

    //Get Existing User
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

        //If user does not exist, Insert
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
            
            //console.log("inserted expense: "+insertedInfo)
            
        }
        else
        {
            throw "User Already Exists. Please login"
        }

    }

        
}



    
