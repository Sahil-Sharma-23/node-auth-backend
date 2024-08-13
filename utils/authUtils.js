require('dotenv').config()  // Allow to use env variables
const { createHmac } = require('node:crypto')
const secret = process.env.HMAC_SECRET

function matchPassword(password, passwordHash) {
  const newPasswordHash = createHmac('sha256', secret).update(password).digest('hex')
  return newPasswordHash === passwordHash
}

async function encryptPassword(password) {
  const hash = createHmac('sha256', secret).update(password).digest('hex')
  return hash
}

module.exports = { matchPassword, encryptPassword }