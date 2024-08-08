const express = require("express")
const router = express.Router()

router.get("/health", (req, res) => {
  res.send("Woohoooo... You're good to go!!!")
})

module.exports = router