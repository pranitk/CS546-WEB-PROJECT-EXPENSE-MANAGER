const mongoCollections = require("../config/mongoCollections")
const bankac = mongoCollections.bankac
const uuid = require("uuid")
module.exports = {
    //Add new Bank Account
    async addBankAC(user_id,ac_name,ac_number,ac_bal) {
        if(!user_id) 
            throw "User ID not provided"
        if(!ac_name && !ac_number && !ac_bal)
            throw "Form is EMPTY - Bank Name, Bank Number and Bank Balance not provided!"
        if(!ac_name && !ac_number)
            throw "Form is EMPTY - Bank Name and Bank Number not provided!"
        if(!ac_number && !ac_bal)
            throw "Form is EMPTY - Bank Number and Bank Balance not provided!"
        if(ac_number && ac_number.length <6)
            throw "Bank Account number should be at least 6 characters long"
        if(!ac_name && !ac_bal)
            throw "Form is EMPTY - Bank Name and Bank Balance not provided!"
        if(!ac_name)
            throw "Bank Account NAME not provided"
        if(!ac_number)
            throw "Bank Account NUMBER not provided"
        if(!ac_bal)
            throw "Bank Account BALANCE not provided"
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

    async getAccountByNumber(ac_no,user_id) {
        console.log("Finding account by "+ac_no)
        if(!ac_no)
            throw "Account number not provided"
        
        const bankCollection = await bankac()
        const acc = await bankCollection.findOne({ac_number : ac_no, user_id: user_id})
        return acc
    },

    async getAllAccounts(user_id) {
        if(!user_id)
            throw "User ID not provided"
        const bankCollection = await bankac()
        return await bankCollection.find({user_id : user_id}).toArray()
    },

    async hasAccounts(user_id) {
        if(!user_id)
            throw "User ID not provided"
        const bankCollection = await bankac()
        let doc = await bankCollection.findOne({user_id : user_id})
        console.log(doc)
        if(doc == null)
            return false
        else
            return true
    },

    async deleteAccountByNumber(user_id,ac_no) {
        if(!ac_no)
            throw "You must provide the account number to confirm deletion of the account"
        console.log(user_id,ac_no)
        const bankCollection = await bankac()
        const accounts = await this.getAllAccounts(user_id)
        if(accounts.length > 1) {
            console.log("deleting acno-",ac_no)
            const delacc = await bankCollection.removeOne({ac_ending : ac_no})
            if(delacc.deletedCount === 0) {
                throw "Could not remove account - Either the account does not exist or you have entered wrong account number";
            } else {
                return delacc
            }
        } else {
            throw "Cannot delete account - Atleast one account should be present to continue using this application"
        }
        
    },

    async updateAccount(user_id,ac_no,type,amount) { //type 1 - expense, type 2 - income
        if(!user_id) { throw "User ID not provided" }
        if(!ac_no) { throw "Account number not provided" }
        if(!type) { throw "Expense type not provided" }
        if(!amount) { throw "Amount not provided" }
        let updatedbal = 0
        const bankCollection = await bankac()
        //const accounts = await this.getAllAccounts(user_id)
        // for(let i=0; i<accounts.length ; i++) {
        //     if(accounts[i].ac_number == ac_no) {
        //         let acc = accounts[i]
        //     }
        // }
        let acc = await this.getAccountByNumber(ac_no,user_id)

        if(type == 1) {
            acc.ac_bal = acc.ac_bal - amount
            updatedbal = acc.ac_bal
        } else if(type == 2) {
            acc.ac_bal = acc.ac_bal + amount
            updatedbal = acc.ac_bal
        }
        let updateAcc = await bankCollection.updateOne({user_id:user_id,ac_number:ac_no},{$set: {ac_bal:updatedbal}});
        if (updateAcc.modifiedCount == 0) {
            throw "Could not update account balance successfully!";
        }
    },

    async transferAmount(user_id,ac_no1,ac_no2,amount) { //from-ac_no1 to-ac_no2
        if(!user_id) { throw "User ID not provided" }
        if(!ac_no1) { throw "Account number 1 not provided" }
        if(!ac_no2) { throw "Account number 2 not provided" }
        if(!amount) { throw "Amount not provided" }
        let updatedbal1 = 0
        let updatedbal2 = 0
        const bankCollection = await bankac()
        const accounts = await this.getAllAccounts(user_id)
        const acc1 = await this.getAccountByNumber(ac_no1,user_id)
        const acc2 = await this.getAccountByNumber(ac_no2,user_id)
        acc1.ac_bal = acc1.ac_bal - amount
        updatedbal1 = acc1.ac_bal
        acc2.ac_bal = acc2.ac_bal + amount
        updatedbal2 = acc2.ac_bal

        console.log("New account 1 balance is $"+acc1.ac_bal)

        console.log("New account 2 balance is $"+acc2.ac_bal)
        // For ac_no1
        let updateAcc1 = await bankCollection.updateOne({user_id:user_id,ac_number:ac_no1},{$set: {ac_bal:updatedbal1}});
        if (updateAcc1.modifiedCount == 0) {
            throw "Could not update account balance successfully!";
        }
        //for ac_no2
        let updateAcc2 = await bankCollection.updateOne({user_id:user_id,ac_number:ac_no2},{$set: {ac_bal:updatedbal2}});
        if (updateAcc2.modifiedCount == 0) {
            throw "Could not update account balance successfully!";
        }
    }
}
