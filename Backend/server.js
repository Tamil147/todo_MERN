const express = require("express")
const mongoDB = require('./db/mongodb')
const route = require("./Routes/userRoute")
const cors = require('cors')

const app = express()
mongoDB()

app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json())


app.use('/users', route)


app.listen(3000, () => {
    console.log("server is running in port" + 3000);
})