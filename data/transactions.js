const mongoCollections = require("../config/mongoCollections")
const transactions = mongoCollections.transactions
const uuid = require("node-uuid")

module.exports = {

    //Add New Transactions
    async addTransaction(transaction_type,amount,desc,category_id,account_id,date){

        console.log("inserting into database")
        let transaction = {
            transaction_type: transaction_type, // 1 - Expense, 2 - Income
            _id: uuid.v4(),
            amount: amount,
            desc: desc,
            category_id: category_id,
            account_id: account_id,
            date: date
        }

        const transactionCollection = await transactions()
        const insertedInfo = await transactionCollection.insertOne(transaction)

        if(insertedInfo.insertedCount == 0)
            throw 'Insertion failed'
            
        console.log("inserted expense: "+insertedInfo)
    },

    async getTransactionById(id){

        if(!id)
            throw 'Transaction ID not provided'
            
        const transactionCollection = await transactions()
        const transaction = await transactionCollection.findOne({ _id: id})

        /*if(transaction === null)
            thow 'Transaction with this ID not found'*/

        return transaction

    },

    async getAllExpenses(){

        const transactionCollection = await transactions()
        return transactionCollection.find({}).toArray()

    }


}