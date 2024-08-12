const express = require("express")
const { handleGetAllUsers } = require("../controllers/userController")
const router = express.Router()

// Get all users
router.get("/", handleGetAllUsers)

module.exports = router