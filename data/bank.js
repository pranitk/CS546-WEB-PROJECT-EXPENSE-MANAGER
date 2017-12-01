const mongoCollections = require("../config/mongoCollections")
const bankac = mongoCollections.bankac
const uuid = require("node-uuid")
module.exports = {
    //Add new Bank Account
    async addBankAC(user_id,ac_name,ac_number,ac_bal) {
        console.log("adding account")
        let new_ac_id = uuid.v4();
        let acc = {
            user_id : user_id,
            ac_id : new_ac_id,
            ac_name : ac_name,
            ac_number : ac_number,
            ac_bal : ac_bal
        }
        console.log("1")
        console.log(acc)
        const bankCollection = await bankac()
        console.log("2")
        const insertedInfo = await bankCollection.insertOne(acc)
        console.log("3")
        if(insertedInfo.insertedCount == 0) 
            throw "Failed to add account"
        console.log("4")
        console.log("Bank Account added: " +insertedInfo)

    },

    async getAccountByID(id) {

        if(!id)
            throw "Account ID not provided"

        const bankCollection = await bankac()
        const acc = await bankCollection.findOne({ac_id : id})
        return acc
    },

    async getAllAccounts(user_id) {
        const bankCollection = await bankac()
        return bankCollection.find({user_id : user_id}).toArray()
    }
}