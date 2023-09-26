const User = require("../models/User")
const createError = require("../utils/createError")




const updateUser = async (req , res , next) => {
    try {
        const {id} = req.params

        // $set operator will change values depends on data that we sent , key_name_in_the_schema : new_value  , has an access to all schema document keys
        const updatedUser = await User.findByIdAndUpdate(id , {$set : req.body} , {new : true})
        res.status(200).json(updatedUser)

    } catch (error) {
        next(error)
    }
}






const deleteUser = async (req , res , next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted !")
    } catch (error) {
        next(error)   
    }
}






const getSpecificUser = async (req , res , next) => {
    try {
        const user = await User.findById(req.params.id) 
        // const user = await User.findOne({_id : req.params.id})
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}






const getUsers = async (req , res , next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)        
    } catch (error) {
        next(error)
    }
}





module.exports = {updateUser , deleteUser , getSpecificUser , getUsers}
