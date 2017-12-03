const bcrypt = require("bcrypt");
const mongoCollections = require("../config/mongoCollections")
const users = mongoCollections.users
const uuid = require("node-uuid")

module.exports = {


    


    async getAllUsers()
    {
        const userCollection = await users();
        const allUsers = await userCollection.find({}).toArray();
        return allUsers;
    },

     async getUserByUserId(id,callback){
         console.log("called from passport");
        if(!id) 
            throw "You must provide an username"
        
        const userCollection =  await users();
       
        const userByUsername = await userCollection.findOne({_id : id });

        
        
        return callback(null,userByUsername);
        
     
    },

    async getUserByName(id){
        if(!id) 
        throw "You must provide an username"
        const userCollection = await users();
        
         const userByName = await userCollection.findOne({_id : id });
         var firstname = userByName.firstname

         return firstname;
    },

    async hash(password)
    {
        let hp;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    
    //Create New User
    async addNewUser(username, Fname, Lname, password){

        let newUser;
        let userCollection = await users()
        
        let hp = await this.hash(password);     

                newUser = {
                    _id: username,
                    firstname: Fname,
                    lastname: Lname,
                    password: hp
        
                }

                
                //let insertedInfo = await userCollection.insertOne(newUser)

                
                
                console.log("Inside bcrypt")
        
    
        console.log("Inserting");
        //let userCollection = await users()
        let insertedInfo = await userCollection.insertOne(newUser)
        console.log("Insertion done");
     },//End of addNewUser

     async verifyPassword(password,hashedpassword)
    {
        
        //     var user = this.getUserByUserId(username);
        //     console.log("User ID = "+user);
        //     if(user._id == username)
        //     {
        
        //         let hashedPassword = user.password;
        //         console.log("User "+user.firstName+" hashed password is "+hashedPassword)
        //         if(bcrypt.compareSync(password,hashedPassword))
        //         {
        //           return true;
        //         }
        //         else
        //         {
        //           return false;
        //         }
                
        //     }
        //  return false

        if(bcrypt.compareSync(password,hashedpassword))
                {
                  return true;
                }
                else
                {
                  return false;
                }
    },//End of verifyPassword

    

        
}




//   https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt

    
