const Hotel = require("../models/Hotel")
const Room = require("../models/Room")
const createError = require("../utils/createError")


const addHotel = async (req , res , next) => {
    try {
        const newHotel = new Hotel(req.body)
        await newHotel.save()
        res.status(201).json(newHotel)   
    } catch (error) {
        // passing the error to the error handler middleware by the next(error)
        next(error)
    }
}






const updateHotel = async (req , res , next) => {
    try {
        const {id} = req.params

        // $set operator will change values depends on data that we sent , key_name_in_the_schema : new_value  , has an access to all schema document keys
        const updatedHotel = await Hotel.findByIdAndUpdate(id , {$set : req.body} , {new : true})
        res.status(200).json(updatedHotel)

    } catch (error) {
        next(error)
    }
}






const deleteHotel = async (req , res , next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted !")
    } catch (error) {
        next(error)   
    }
}






const getSpecificHotel = async (req , res , next) => {
    try {
        const hotel = await Hotel.findById(req.params.id) 
        // const hotel = await Hotel.findOne({_id : req.params.id})
        res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}






const getHotels = async (req , res , next) => {

    const {min , max , ...others} = req.query

    try {
        // req.query is an object {} , so we put as a fillter object inside find()
        // find({...others : any of the hotel schema key , and if there as a min , max query we will use cheapestPrice key to return specific documents})
        // {$operator : value} , or the value were key&& value  {$operator : {key : value}}
        const hotels = await Hotel.find({...others , cheapestPrice : {$gte : min || 1 , $lte : max || 999 }})
        res.status(200).json(hotels)        
    } catch (error) {
        next(error)
    }
}







const countByCity = async (req , res , next) => {
    
    try {
        
        // ?cities=madrid,berlin,moscow
        // extract them then convert them to an array by split
        const cities = req.query.cities.split(",")

        // will return array on counted numbers
        // inside Promise.all([promise1 , promise2 , promise3]) or Promise.all(one array that return multi promise operation inside it)
        const list = await Promise.all(cities.map((city) => {
            return Hotel.countDocuments({city : city})
        }))

        res.status(200).json(list)

    } catch (error) {
        next(error)
    }
}






const countByType = async (req, res, next) => {
    try {

        const hotelCounts = await Hotel.countDocuments({type : "hotel"})
        const apartmentCounts = await Hotel.countDocuments({type : "apartment"})
        const resortCounts = await Hotel.countDocuments({type : "resort"})
        const villaCounts = await Hotel.countDocuments({type : "villa"})
        const cabinCounts = await Hotel.countDocuments({type : "cabin"})

        res.status(200).json([
            {type : "hotel" , count : hotelCounts},
            {type : "aprtment" , count : apartmentCounts},
            {type : "resort" , count : resortCounts},
            {type : "villa" , count : villaCounts},
            {type : "cabin" , count : cabinCounts},
        ])

    } catch (error) {
        next(error)
    }
} 






const getHotelRooms = async (req , res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelId)
        
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room)
        }))

        res.status(200).json(list)
        
    } catch (error) {
        next(error)
    }
}





module.exports = {addHotel , updateHotel , deleteHotel , getSpecificHotel , getHotels , countByCity , countByType , getHotelRooms}