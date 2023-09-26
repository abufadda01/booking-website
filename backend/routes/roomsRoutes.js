const express = require("express")
const router = express.Router()
const {verifyToken , verifyAdmin , verifyUser} = require("../utils/verifyToken")

const {createRoom , updateRoom , updateRoomAvailability , deleteRoom , getSpecicRoom , getRooms} = require("../controllers/roomsController")



router.post("/:hotelId" , verifyAdmin , createRoom)

router.put("/:id" , verifyAdmin , updateRoom)

router.put("/availability/:id"  , updateRoomAvailability)

router.delete("/:roomId/:hotelId" , verifyAdmin , deleteRoom)

router.get("/:id" , getSpecicRoom)

router.get("/" , getRooms)




module.exports = router