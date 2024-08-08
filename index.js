const express = require("express")
const app = express()
const pool = require("./db")
require('dotenv').config()  // Use env variables 'process.env.VAR'

// Middleware
app.use(express.json()) // Allow app to use JSON

// Routes
app.get("/health-check", (req, res) => {
  res.send("Woohoooo... You're good to go!!!")
})

// Get all users
app.get("/users", async (req, res) => {
  // Fetch all the users from users table
  try {
    const result = await pool.query("SELECT * FROM users")
    res.status(200).send(result.rows)
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error."
    })
  }
})

// Create new user in DB
app.post("/user", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const result = await pool.query(`INSERT INTO users (first_Name, last_name, email, password)
      VALUES ('${firstName}', '${lastName}', '${email}', '${password}')`)
    console.log("Result: ", result);

    res.status(200).send(result)
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Internal server error."
    })
  }
})

app.listen(process.env.SERVER_PORT, () => {
  return ("Listening at Port 8000")
})