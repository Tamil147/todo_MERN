const mongoose = require("mongoose")




const connectMongoDb = async () => {
    await mongoose.connect("mongodb://localhost:27017/todo")
        .then(() => console.log("database is connected")
        ).catch((err) => console.log(err)
        )
}

module.exports = connectMongoDb;