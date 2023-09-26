const Room = require("../models/Room")
const Hotel = require("../models/Hotel")
const createError = require("../utils/createError")



const createRoom = async (req , res , next) => {
    try {
        const hotelId = req.params.hotelId
        const room = new Room(req.body)

        await room.save()

        try {
            await Hotel.findByIdAndUpdate(hotelId , {
                // $push operator used with arrays ,  $push {key_name_in_the_schema : value}
                $push : {rooms : room._id}
            })
        } catch (error) {
            next(error)
        }

        res.status(200).json(room)

    } catch (error) {
        next(error)
    }
}







const updateRoom = async (req , res , next) => {
    try {
        const {id} = req.params

        // $set operator will change values depends on data that we sent , key_name_in_the_schema : new_value  , has an access to all schema document keys
        const updatedRoom = await Room.findByIdAndUpdate(id , {$set : req.body} , {new : true})
        res.status(200).json(updatedRoom)

    } catch (error) {
        next(error)
    }
}






const updateRoomAvailability = async (req , res , next) => {
    try {
        await Room.updateOne(
          { "roomNumbers._id": req.params.id },
          {
            $push: {
              "roomNumbers.$.unavailableDates": req.body.dates
            },
          }
        );
        res.status(200).json("Room status has been updated.");
      } catch (err) {
        next(err);
      }
    };








const deleteRoom = async (req , res , next) => {
    try {
        const {roomId , hotelId} = req.params
        await Room.findByIdAndDelete(roomId)

        try {
            await Hotel.findByIdAndUpdate(hotelId , {
                $pull : {rooms : roomId}
            })
        } catch (error) {
            next(error)
        }

    } catch (error) {
        next(error)   
    }

    res.status(200)
}






const getSpecicRoom = async (req , res , next) => {
    try {
        const room = await Room.findById(req.params.id) 
        // const room = await Room.findOne({_id : req.params.id})
        res.status(200).json(room)
    } catch (error) {
        next(error)
    }
}







const getRooms = async (req , res , next) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)        
    } catch (error) {
        next(error)
    }
}





module.exports = {createRoom , updateRoom , deleteRoom , getSpecicRoom , getRooms , updateRoomAvailability}