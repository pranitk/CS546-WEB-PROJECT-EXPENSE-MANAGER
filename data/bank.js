const mongoCollections = require("../config/mongoCollections")
const bankac = mongoCollections.bankac
const uuid = require("uuid")
module.exports = {
    //Add new Bank Account
    async addBankAC(user_id,ac_name,ac_number,ac_bal) {
        if(!user_id) 
            throw "User ID not provided"
        if(!ac_name)
            throw "Account name not provided"
        if(!ac_number)
            throw "Account number not provided"
        if(!ac_bal)
            throw "Account balance not provided"
        let flag = 0
        const bankCollection = await bankac()
        const accounts = await this.getAllAccounts(user_id)
        if(accounts.length > 1) {
            for(let i=0;i<accounts.length;i++) {
                if(accounts[i].ac_number == ac_number) {
                    flag = 0
                    throw "Cannot add account with same account number as an existing account"
                    break
                } else {
                    flag = 1
                }
            }
            if(flag == 1) {
                //add
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
                console.log("2")
                const insertedInfo = await bankCollection.insertOne(acc)
                console.log("3")
                if(insertedInfo.insertedCount == 0) 
                    throw "Failed to add account"
                console.log("4")
                console.log("Bank Account added: " +insertedInfo)
                acc = {}
            }
        } else {
            //add
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
            console.log("2")
            const insertedInfo = await bankCollection.insertOne(acc)
            console.log("3")
            if(insertedInfo.insertedCount == 0) 
                throw "Failed to add account"
            console.log("4")
            console.log("Bank Account added: " +insertedInfo)
            acc = {}
        }
    },

    async getAccountByID(id) {

        if(!id)
            throw "Account ID not provided"

        const bankCollection = await bankac()
        const acc = await bankCollection.findOne({_id : id})
        return acc
    },

    async getAccountByNumber(ac_no) {
        console.log("Finding account by "+ac_no)
        if(!ac_no)
            throw "Account number not provided"
        
        const bankCollection = await bankac()
        const acc = await bankCollection.findOne({ac_number : ac_no})
        return acc
    },

    async getAllAccounts(user_id) {
        if(!user_id)
            throw "User ID not provided"
        const bankCollection = await bankac()
        return await bankCollection.find({user_id : user_id}).toArray()
    },

    async deleteAccountByNumber(ac_no) {
        if(!ac_no)
            throw "Account number not provided"
        const bankCollection = await bankac()
        const accounts = await this.getAllAccounts(user_id)
        if(accounts.length > 1) {
            const delacc = await bankCollection.removeOne({ac_number : ac_no})
            if(delacc.deletedCount === 0) {
                throw "Could not remove account with acc_number:${ac_no}";
            } else {
                return delacc
            }
        } else {
            throw "Cannot delete account - Atleast one account should be present to continue using this application"
        }
        
    },

    async updateAccount(user_id,ac_no,type,amount) { //type 1 - expense, type 0 - income
        if(!user_id) { throw "User ID not provided" }
        if(!ac_no) { throw "Account number not provided" }
        if(!type) { throw "Expense type not provided" }
        if(!amount) { throw "Amount not provided" }
        const bankCollection = await bankac()
        const accounts = await this.getAllAccounts(user_id)
        for(let i=0; i<accounts.length ; i++) {
            if(accounts[i].ac_number == ac_no) {
                let acc = accounts[i]
            }
        }
        if(type == 1) {
            acc.ac_bal = acc.ac_bal - amount
        } else {
            acc.ac_bal = acc.ac_bal + amount
        }
    },

    async transferAmount(user_id,ac_no1,ac_no2,type,amount) { // type 1 - transfer from 1 to 2 , 2 - transfer from 2 to 1
        if(!user_id) { throw "User ID not provided" }
        if(!ac_no1) { throw "Account number 1 not provided" }
        if(!ac_no2) { throw "Account number 2 not provided" }
        if(!type) { throw "Type not provided" }
        if(!amount) { throw "Amount not provided" }
        const bankCollection = await bankac()
        const accounts = await this.getAllAccounts(user_id)
        for(let i=0; i<accounts.length ; i++) {
            if(accounts[i].ac_number == ac_no1) {
                let acc1 = accounts[i]
            }
            if(accounts[i].ac_number == ac_no2) {
                let acc2 = accounts[i]
            }
        }
        if(type == 1) {
            acc1.ac_bal = acc1.ac_bal - amount
            acc2.ac_bal = acc2.ac_bal + amount
        }
        else if(type == 2) {
            acc2.ac_bal = acc2.ac_bal - amount
            acc1.ac_bal = acc1.ac_bal + amount
        }
    }
}
