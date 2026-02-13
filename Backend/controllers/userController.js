const todoModel = require("../models/todoModel")

const addUser = async (req, res) => {

    console.log(req.body)
    await todoModel.create(req.body)
    res.status(201).json(req.body)

}

const getAllUsers = async (req, res) => {

    const data = await todoModel.find({})
    res.status(201).json(data)

}

const getSingleUser = async (req, res) => {

    const id = req.params.id
    const data = await todoModel.findById(id)
    res.status(201).json(data)

}

const updateUser = async (req, res) => {

    const id = req.params.id
    const data = await todoModel.findByIdAndUpdate(id, req.body, { new: true })
    res.status(201).json(data)

}

const deleteUser = async (req, res) => {

    const id = req.params.id
    await todoModel.findByIdAndDelete(id)
    res.status(201).json({ message: "successfully deleted!.." })

}


module.exports = {
    addUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}