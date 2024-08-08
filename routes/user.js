const express = require("express")
const { handleGetAllUsers, handleCreateNewUser } = require("../controllers/user")
const router = express.Router()

// Get all users
router.get("/", handleGetAllUsers)

// Create new user in DB
router.post("/", handleCreateNewUser)

module.exports = router