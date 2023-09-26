const jwt = require("jsonwebtoken")
const createError = require("./createError")



const verifyToken = (req , res , next) => {

    const token = req.cookies.access_token

    if(!token) {
        return next(createError(401 , "you are not authenticated :( "))
    }

    // decodedToken will be the payload object inside the token
    jwt.verify(token , process.env.JWT_SECRET , (err , decodedToken) => {
        if(err) return next(createError(403 , "Invalid token !"))

        // create a property inside our req called user which will contain the decodedToken(payload obj)
        req.user = decodedToken
        
        next()
        
    })
}





// verify user could be a user or an admin
const verifyUser = (req , res , next) => {
    // called the verifyToken middleware if its okk then the callback fun will excecute and check the user id
    verifyToken(req , res , next , () => {
        if(req.user.userId === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403 , "you are not authorized :( "))
        } 
    })
}





const verifyAdmin = (req , res , next) => {
    // called the verifyToken middleware if its okk then the callback fun will excecute and check the isAdmin permission
    verifyToken(req , res , next , () => {
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403 , "you are not authorized as an Admin :( "))
        } 
    })
}





module.exports = {verifyToken , verifyUser , verifyAdmin}