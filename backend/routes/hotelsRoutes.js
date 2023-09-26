const express = require("express")
const router = express.Router()
const {addHotel , updateHotel , deleteHotel , getSpecificHotel , getHotels , countByCity , countByType , getHotelRooms} = require("../controllers/hotelsController")
const {verifyToken , verifyUser , verifyAdmin} = require("../utils/verifyToken")


router.post("/" , verifyAdmin , addHotel)

router.put("/:id" , verifyAdmin , updateHotel)

router.delete("/:id" , verifyAdmin , deleteHotel)

router.get("/find/:id" , getSpecificHotel)

router.get("/" , getHotels)

router.get("/countByCity" , countByCity)

router.get("/countByType" , countByType)

router.get("/room/:hotelId" , getHotelRooms)



module.exports = router