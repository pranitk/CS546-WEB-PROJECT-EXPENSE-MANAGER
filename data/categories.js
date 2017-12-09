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
            this.addNewCategory(username,default_categories[i],default_category_icons[i]);
        }
    },

    async addNewCategory(username,category_name,icon_name)
    {
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

        categoryCollection = await categories();
        const insertedInfo = await categoryCollection.insertOne(newCategory);

        if(insertedInfo.insertedCount == 0)
            throw "Insertion Failed"
        console.log("inserted category : "+insertedInfo);
        //return insertedInfo;
    },

    async getCategory(username)
    {

    },

    async getAllCategories(username){

        const categoriesCollection = await categories()
        return await categoriesCollection.find({ user: username }).toArray();

    }
}
