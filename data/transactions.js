const mongoCollections = require("../config/mongoCollections")
const transactions = mongoCollections.transactions
const categories = mongoCollections.categories
const bankData = require("./bank")
const uuid = require("node-uuid")

module.exports = {

    //Add New Transactions
    async addTransaction(user_id,transaction_type,amount,desc,category_details,account_number,date){

       var valid_date = new Date(date)
       var month = valid_date.getMonth();
       console.log("month" +valid_date.getMonth())
        const temp = category_details.split("  ")
        const category_icon = temp[0]
        const category_name = temp[1]

        console.log("Getting bank account for "+account_number)
        const bank_account = await bankData.getAccountByNumber(account_number,user_id)
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
            //bank_account_number: account_number,
            bank_account:bank_account,
            date: date,
            month : month
        }

        if(transaction_type == 1){  // Expense
            if(bank_account.ac_bal < amount)
                throw 'Expense amount is greater than the existing bank balance' 
        }

        const transactionCollection = await transactions()
        const insertedInfo = await transactionCollection.insertOne(transaction)

        if(insertedInfo.insertedCount == 0)
            throw 'Insertion failed'
            
        console.log("inserted expense: "+insertedInfo)

        const result = await bankData.updateAccount(user_id,account_number,1,amount)

        console.log("Updated bank balance")

        return transaction
    },

    async addTransactionForIncome(user_id,transaction_type,amount,desc,account_number,date){
        
              
               
                const valid_date = new Date(date);
                var month = valid_date.getMonth();
                console.log("Getting bank account for "+account_number)
                const bank_account = await bankData.getAccountByNumber(account_number,user_id)
                // GET BANK ACCOUNT BY ID
        
        
                console.log("inserting into database")
                let transaction = {
                    user_id : user_id, 
                    transaction_type: transaction_type, // 1 - Expense, 2 - Income
                    _id: uuid.v4(),
                    amount: amount,
                    desc: desc,
                    //category_name: category_id,
                
                    bank_account:bank_account,
                    date: date,
                    month: month
                }
        
                const transactionCollection = await transactions()
                const insertedInfo = await transactionCollection.insertOne(transaction)
        
                if(insertedInfo.insertedCount == 0)
                    throw 'Insertion failed'
                    
                //console.log("inserted income: "+insertedInfo)
        
                const result = await bankData.updateAccount(user_id,account_number,2,amount)

                return transaction
    },


    async saveTransfer(user_id,amount,sender_account_number,receiver_account_number,desc,date){

        const valid_date = new Date(date);
        var month = valid_date.getMonth();
        const sender_bank_account = await bankData.getAccountByNumber(sender_account_number,user_id)
        const receiver_bank_account = await bankData.getAccountByNumber(receiver_account_number,user_id)

        const transaction = {
            user_id: user_id,
            transaction_type: 3,    // transfer
            _id: uuid.v4(),
            amount: amount,
            desc: desc,
            sender_bank_account: sender_bank_account,
            receiver_bank_account: receiver_bank_account,
            date: date,
            month : month
        }

        const transactionCollection = await transactions()
        const insertedInfo = await transactionCollection.insertOne(transaction)

        if(insertedInfo.insertedCount == 0)
            throw 'Insertion failed'
        
        console.log("inserted transfer result: "+insertedInfo)
        console.log("Inserted transfer obj: "+transaction)

        const result = await bankData.transferAmount(user_id,sender_account_number,receiver_account_number,amount)

        console.log("Transfer amount updated in bank")

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
    },

    async getAllTransactionsByBank(user_id,transaction_type,bank_account_number){
        
        console.log("User name passed -> "+user_id)
        console.log("Transaction type -> "+transaction_type)
        console.log("Account number -> "+bank_account_number)

        const transactionCollection = await transactions()
        //return await transactionCollection.find({ transaction_type: transaction_type ,user_id : user_id, bank_account_number: bank_account_number}).toArray()

        return await transactionCollection.find({ transaction_type: transaction_type ,user_id : user_id, 'bank_account.ac_number': bank_account_number}).toArray()
    },

    async getAllTransactions(user_id,transaction_type){
        const transactionCollection = await transactions()
        return await transactionCollection.find({ transaction_type: transaction_type ,user_id : user_id}).toArray()
    },

    async getAllIncome(user_id){
        const transactionCollection = await transactions()
        return await transactionCollection.find({
            transaction_type: 2,
            user_id: user_id,

        }).toArray();
    },

    async getSumOfAllIncome(user_id){
        const transactionCollection = await transactions()
        return await transactionCollection.find({
            transaction_type: 2,
            user_id: user_id,

        }).toArray();

    },

    async getSumOfTransactions(user_id){

        if(!user_id)
            throw 'User name not provided' 

        //let today = new Date();
        //let current_month = today.getMonth();
        var now = new Date();
        var current_month = now.getMonth();
        console.log("Date = "+now);
        //console.log("Current Month : "+now.getMonth());
        let result = [];
        //var monthlyExpenses = await this.getAllExpenses(user_id);
    
                //console.log("checking months")
                console.log("Transactions "+user_id);   
                const transactionCollection = await transactions()
                result = await transactionCollection.aggregate([
                    {
                        $match:{month : {$gte : current_month},user_id : user_id}
                    }
                    ,{
                    
                    $group: {   
                        _id : {trans_type : "$transaction_type"},
                        amount: { $sum: "$amount"}
                    }
                },
            ]).toArray();
            
        
        

        // const result = await transactionCollection.aggregate([{
        //     $group: {
        //         _id : {trans_type : {transaction_type : "$transaction_type"}},
        //         amount: { $sum: "$amount"}
        //     }
        // }]).toArray();
        //result = JSON.stringify(result)
        //console.log(result)
        return result;

        //console.log("Sum result is "+JSON.stringify(result))

    },

    async deleteTransactionById(transactionId){
        if(!transactionId)
            throw "Transaction not found"

        const transactionCollection = await transactions()

        //const thatTransaction = await this.getAllIncome()
        //console.log("I got all Incomes")

        const delTransaction = await transactionCollection.removeOne({_id: transactionId})
        //const result = await bankData.updateAccount(req.session.passport.user,account_number,2,-amount)

        return delTransaction

        

    }


}