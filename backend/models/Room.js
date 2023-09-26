const mongoose = require("mongoose")


const roomSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true
    },
    price : {
        type : Number ,
        required : true
    },
    desc : {
        type : String ,
        required : true
    },
    maxPeople : {
        type : Number ,
        required : true
    },
    roomNumbers : [{number : Number , unavailableDates : {type : [Date]} }]

})



const Room = mongoose.model("rooms" , roomSchema)

module.exports = Room 

