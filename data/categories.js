const mongoCollections = require("../config/mongoCollections");
const categories = mongoCollections.categories;
const uuid = require("node-uuid");

const default_categories = ["Groceries","Rent","Wifi","Electricity Bill","Phone","Transport","Appliances","Education","Food & Dining"];
const default_category_icons = ["shopping_cart","home","wifi","flash_on","sim_card","train","devices_other","school","local_dining"]

module.exports = {

    async addCategoryForNewUser(username)
    {
        
        for(let i = 0; i < default_categories.length; i++)
        {
            //this.addNewCategory(username,default_categories[i],default_category_icons[i]);
            let newCategory = {
                _id : uuid.v4(),
                user : username,
                category_name : default_categories[i],
                icon_name : default_category_icons[i]
            }
            categoryCollection = await categories();
            const insertedInfo = await categoryCollection.insertOne(newCategory);
            if(insertedInfo.insertedCount == 0)
                throw "Insertion Failed"
            console.log("inserted category : "+insertedInfo);
        }
    },

    async addNewCategory(username,category_name,icon_name)
    {
        console.log("in add new category")
        if(icon_name == undefined || icon_name == "")
        {
            icon_name = "loyalty"
        }
        let newCategory = {
            _id : uuid.v4(),
            user : username,
            category_name : category_name,
            icon_name : icon_name
        }

        //console.log("inserting new category"+newCategory);
        categoryCollection = await categories();

        let allCategories = await this.getAllCategories(username);
        let flag = 0;

        for(let i = 0; i < allCategories.length; i++)
        {
            console.log("Looping through categories");
            if(category_name.toLowerCase() === allCategories[i].category_name.toLowerCase())
            {
                 console.log(category_name+", "+allCategories[i]);
                 console.log("Checking for equality true")
                 
                 flag = 1;
                 break;
            }
            /*else
            {
                const insertedInfo = await categoryCollection.insertOne(newCategory);
                if(insertedInfo.insertedCount == 0)
                    throw "Insertion Failed"
                console.log("inserted category : "+insertedInfo);
            }*/

        }

        if(flag == 1)
        {
            throw "Category Already Exists";
        }
        else
        {
            console.log("Insert");
            const insertedInfo = await categoryCollection.insertOne(newCategory);
            if(insertedInfo.insertedCount == 0)
                throw "Insertion Failed"
            console.log("inserted category : "+insertedInfo);
        }
        //categoryCollection.createIndex({"category_name": 1},{ unique: true })   // To have category name unique
        //const insertedInfo = await categoryCollection.insertOne(newCategory);

        
        //return insertedInfo;
    },

    async getCategory(username)
    {

    },

    async getAllCategories(username){

        const categoriesCollection = await categories()
        return await categoriesCollection.find({user: username}).toArray();

    }
}
