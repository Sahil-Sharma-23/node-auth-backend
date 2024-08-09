const express = require("express")
const app = express()
require('dotenv').config()  // Use env variables 'process.env.VAR'

const userRouter = require("./routes/user")
const healthRouter = require("./routes/health")
const authRouter = require("./routes/auth")

const { logReqRes } = require("./middlewares")

// Middlewares
app.use(express.json()) // Allow app to use JSON
if (process.env.ENABLE_FILE_BASED_LOGS) { // Only use if flag is set to true
  app.use(logReqRes("Log.txt"))
}

// Routes
app.use("/api/user", userRouter)
app.use("/", healthRouter)
// Auth routes
app.use("/api/auth/v1", authRouter)

app.listen(process.env.SERVER_PORT, () => {
  return ("Listening at Port 8000")
})