const fs = require('fs')
require('dotenv').config()  // Use env variables 'process.env.VAR'

// Custom middleware to log requests served
function logReqRes(fileName) {
  return (req, res, next) => {
    fs.appendFile(fileName, `${new Date(Date.now())}: ${req.method} : ${req.path}\n`, (err, data) => {
      next();
    })
  }
}

module.exports = {
  logReqRes,
}