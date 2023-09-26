const express = require("express")
const connect = require("./db/connect")
const cookieParser = require("cookie-parser")
const cors = require("cors")

require("dotenv").config()

const app = express()


// middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())






// routes middlewares
const authRoutes = require("./routes/authRoutes")
app.use("/api/auth" , authRoutes)

const usersRoutes = require("./routes/usersRoutes")
app.use("/api/users" , usersRoutes)

const hotelsRoutes = require("./routes/hotelsRoutes")
app.use("/api/hotels" , hotelsRoutes)

const roomsRoutes = require("./routes/roomsRoutes")
app.use("/api/rooms" , roomsRoutes)





// error handler middleware , we access any of the error object properties by the err paramerter 
// we send error for this middleware error handler by using : next(error) in the catch block , inside the controllers , custom middleware , etc ...
// error parameter inside the next(error) must be an error object , then we extract any wanted proprties from this object such as status , messgae ... by the err parameter
app.use((err , req , res , next) => {
    
    const errorObject = {
        errorStatus : err.status || 500 ,
        errorMessage : err.message || "Something went wrong :( "
    }

    return res.status(errorObject.errorStatus).json({
        success : false ,
        status : errorObject.errorStatus ,
        message : errorObject.errorMessage ,
        stack : err.stack
    })

})





// connect the server and the database
const PORT = process.env.PORT || 5000
const start = async () => {
    try {
        app.listen(PORT , () => console.log(`booking website started on port ${PORT}`))
        await connect(process.env.MONGO_COMPASS_URL)        
    } catch (error) {
        console.log(error)
    }
}


start()