const bcrypt = require("bcrypt");
const mongoCollections = require("../config/mongoCollections")
const users = mongoCollections.users
const uuid = require("node-uuid")
const categories = require("./categories")

module.exports = {


    


    async getAllUsers()
    {
        const userCollection = await users();
        const allUsers = await userCollection.find({}).toArray();
        return allUsers;
    },

     async getUserByUserId(id,callback){
         
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

        const categoriesResult = await categories.addCategoryForNewUser(username)

     },//End of addNewUser

     async verifyPassword(password,hashedpassword)
    {

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





    
