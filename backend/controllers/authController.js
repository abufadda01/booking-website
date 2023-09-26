const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createError = require("../utils/createError")


const register = async (req , res , next) => {

    try {
        const {username , email , password} = req.body
        
        const newUser = new User({
            username , 
            email ,
            password
        })

        await newUser.save()
        res.status(201).json(newUser)

    } catch (error) {
        next(error)
    }
}






const login = async (req , res , next) => {
    
    try {
        const {username , password} = req.body
        
        const user = await User.findOne({username})

        if(!user){
            return next(createError(404 , "User not found !"))
        }

        const isPasswordMatch = await bcrypt.compare(password , user.password)
        
        if(!isPasswordMatch){
            return next(createError(400 , "Password not match !"))
        }

        user.password = undefined

        // ..otherKeys will contain the rest (all) of the user object keys except the password , isAdmin 
        // const {isAdmin , password , ...otherKeys} = user

        const token = jwt.sign({userId : user._id , isAdmin : user.isAdmin} , process.env.JWT_SECRET)


        const {isAdmin , ...otherDetails} = user
        // create a cookie by using res.cookie("cookie-name" , cookie_value , cookie_options)
        // access the created cookie by req.cookies.cookie-name
        res.cookie("access_token" , token , {httpOnly : true}).status(200).json({details : {...otherDetails} , isAdmin})

    } catch (error) {
        next(error)
    }
}




module.exports = {register , login}