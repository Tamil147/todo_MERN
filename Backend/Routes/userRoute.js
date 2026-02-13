const express = require("express")
const { addUser, getAllUsers, getSingleUser, updateUser, deleteUser } = require("../controllers/userController")

const route = express.Router()

route.post("/", addUser)
route.get('/', getAllUsers)
route.get("/:id", getSingleUser)
route.put("/:id", updateUser)
route.patch("/:id", updateUser)
route.delete("/:id", deleteUser)

module.exports = route

