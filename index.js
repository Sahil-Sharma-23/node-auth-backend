const express = require("express")
const app = express()
require('dotenv').config()  // Use env variables 'process.env.VAR'

const userRouter = require("./routes/user")

const { logReqRes } = require("./middlewares")

// Middlewares
app.use(express.json()) // Allow app to use JSON
app.use(logReqRes("Log.txt"))

// Health check route
app.get("/health-check", (req, res) => {
  res.send("Woohoooo... You're good to go!!!")
})

// Routes
app.use("/api/user", userRouter)

app.listen(process.env.SERVER_PORT, () => {
  return ("Listening at Port 8000")
})