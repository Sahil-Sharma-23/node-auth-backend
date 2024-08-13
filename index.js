const express = require("express")
const app = express()
require('dotenv').config()  // Use env variables 'process.env.VAR'
const cookieParser = require('cookie-parser');
const cors = require('cors')

const userRouter = require("./routes/userRouter")
const healthRouter = require("./routes/healthRouter")
const authRouter = require("./routes/authRouter")

const { logReqRes } = require("./middlewares")

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};
// Middlewares
app.use(cors(corsOptions))  // Allow cors
app.use(cookieParser());  // Allow working with cookies
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); // Add headers to all responses
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