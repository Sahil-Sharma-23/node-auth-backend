const express = require("express")
const {
  handleRegisterNewUser,
  handleLoginUser
} = require("../controllers/authController")
const router = express.Router()

router.post("/signup", handleRegisterNewUser)
router.post("/login", handleLoginUser)

module.exports = router