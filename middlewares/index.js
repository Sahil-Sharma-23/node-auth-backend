const fs = require('fs')
var jwt = require('jsonwebtoken');
// TODO: not yet complete

// Custom middleware to log requests served
function logReqRes(fileName) {
  return (req, res, next) => {
    fs.appendFile(fileName, `${new Date(Date.now())}: ${req.method} : ${req.path}\n`, (err, data) => {
      next();
    })
  }
}

function authorization() {
  return (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ error: "Access denied" })

    try {
      const tokenDecoded = jwt.verify(token, 'secret-key')
      // Add userId to the req object
      req.userId = tokenDecoded.userId
      next()
    } catch (err) {
      console.error(err); // DEBUG
      res.status(500).send({ message: "Internal server error" })
    }
  }
}

module.exports = {
  logReqRes,
  authorization
}