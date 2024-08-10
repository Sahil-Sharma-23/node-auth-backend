const bcrypt = require("bcrypt")
const saltRounds = 10;

async function checkPassword(password, passwordHash, passwordSalt) {
  const hash = await bcrypt.hash(password, passwordSalt)
  console.log("Match : ", hash === passwordHash); // DEBUG
  if (hash === passwordHash) {
    return true
  }
  return false;
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)

  return {
    salt: salt,
    hash: hashedPassword
  }
}

module.exports = { checkPassword, hashPassword }