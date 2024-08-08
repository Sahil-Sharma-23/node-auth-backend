const express = require("express")
const router = express.Router()
const pool = require("../db")

// Get all users
router.get("/", async (req, res) => {
  // Fetch all the users from users table
  try {
    const result = await pool.query("SELECT * FROM users")
    res.status(200).send(result.rows)
  } catch (err) {
    console.error(err); // DEBUG
    res.status(500).json({
      message: "Internal server error."
    })
  }
})

// Create new user in DB
router.post("/", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const result = await pool.query(`INSERT INTO users (first_Name, last_name, email, password)
      VALUES ('${firstName}', '${lastName}', '${email}', '${password}')`)

    res.status(200).send(result)
  } catch (err) {
    console.error(err); // DEBUG
    res.status(500).send({
      message: "Internal server error."
    })
  }
})

module.exports = router