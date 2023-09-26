const express = require("express")
const router = express.Router()
const {updateUser , deleteUser , getSpecificUser , getUsers} = require("../controllers/userController")
const {verifyToken , verifyUser , verifyAdmin} = require("../utils/verifyToken")



router.put("/:id" , verifyUser , updateUser)

router.delete("/:id" , verifyUser , deleteUser)

router.get("/:id" , verifyUser , getSpecificUser)

router.get("/" , verifyAdmin , getUsers)



module.exports = router