const express = require("express")
const { handleRegisterNewUser, handleLoginUser } = require("../controllers/auth")
const router = express.Router()

router.post("/signup", handleRegisterNewUser)
router.post("/login", handleLoginUser)

module.exports = router