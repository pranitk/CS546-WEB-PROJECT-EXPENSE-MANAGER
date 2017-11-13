const path = require("path")

const constructorMethod = (app) => {

    app.get("/",(req,res) => {
        res.sendFile(path.resolve("static/add_expense.html"))
    })

}

module.exports = constructorMethod