const mongoCollections = require("../config/mongoCollections")
const transactions = mongoCollections.transactions
const categories = mongoCollections.categories
const bankData = require("./bank")
const uuid = require("node-uuid")

module.exports = {

    //Add New Transactions
    async addTransaction(user_id,transaction_type,amount,desc,category_details,account_number,date){

        // GET CATEGORY BY ID or NAME
        //const categoriesCollection = await categories();
        //const newCategory = categoriesCollection.findOne({user:user_id,category_name:category_name})
        const temp = category_details.split("  ")
        const category_icon = temp[0]
        const category_name = temp[1]

        console.log("Getting bank account for "+account_number)
        const bank_account = await bankData.getAccountByNumber(account_number)
        // GET BANK ACCOUNT BY ID


        console.log("inserting into database")
        let transaction = {
            user_id : user_id, 
            transaction_type: transaction_type, // 1 - Expense, 2 - Income
            _id: uuid.v4(),
            amount: amount,
            desc: desc,
            //category_name: category_id,
            category:{
                category_name: category_name, // Update this..
                icon_name: category_icon  // Update this..
            },
            bank_account:bank_account,
            date: date
        }

        const transactionCollection = await transactions()
        const insertedInfo = await transactionCollection.insertOne(transaction)

        if(insertedInfo.insertedCount == 0)
            throw 'Insertion failed'
            
        console.log("inserted expense: "+insertedInfo)

        return transaction
    },

    async getTransactionById(id){

        if(!id)
            throw 'Transaction ID not provided'
            
        console.log("Get transaction for "+id)
        
        const transactionCollection = await transactions()
        const transaction = await transactionCollection.findOne({ _id: id})

        /*if(transaction === null)
            thow 'Transaction with this ID not found'*/

        return transaction

    },

    async getAllExpenses(user_id){

        const transactionCollection = await transactions()
        return await transactionCollection.find({ transaction_type: 1 ,user_id : user_id}).toArray()

        // //let category = {}
        // allExpenses[0].push({
        //     category_id: 10001,
        //     category_name: "Shreyas",
        //     icon_name: "wifi"
        // })

        // return allExpenses;
    },

    async getAllIncome(user_id){
        const transactionCollection = await transactions()
        return await transactionCollection.find({
            transaction_type: 2,
            user_id: user_id,

        }).toArray();
    }


}