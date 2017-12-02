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
            _id : new_ac_id,
            ac_name : ac_name,
            ac_number : ac_number,
            ac_bal : ac_bal,
            ac_ending : ac_number.substr(ac_number.length - 4)
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
        acc = {}
    },

    async getAccountByID(id) {

        if(!id)
            throw "Account ID not provided"

        const bankCollection = await bankac()
        const acc = await bankCollection.findOne({_id : id})
        return acc
    },

    async getAllAccounts(user_id) {
        const bankCollection = await bankac()
        return await bankCollection.find({user_id : user_id}).toArray()
    },

    async deleteAccountByNumber(ac_no) {
        const bankCollection = await bankac()
        const delacc = await bankCollection.removeOne({ac_number : ac_no})
        if(delacc.deletedCount === 0) {
            throw "Could not remove account with acc_number:${ac_no}";
        } else {
            return delacc
        }
    }
}
