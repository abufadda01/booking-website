const mongoose = require("mongoose")


const connect = (url) => {
    // mongoose.connect() return a promise so we must await the connect() function when we call it 
    return mongoose.connect(url , {useNewUrlParser : true , useUnifiedTopology : true})
        .then(() => console.log("BOOKING WEBSITE DATABASE CONNECTED SUCCESSFULLY"))
        .catch((err) => console.log(`FAILED TO CONNECT TO THE DATABASE : ${err}`))
}


module.exports = connect