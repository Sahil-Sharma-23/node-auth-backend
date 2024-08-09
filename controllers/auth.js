const pool = require("../db")
const bcrypt = require('bcrypt')
const {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateUsername,
} = require("../utils/validate")

async function handleLoginUser(req, res) {
  const { email, password } = req.body

  // Validate data
  if (!validateEmail(email)) {
    res.status(300).send({
      message: "Invalid email."
    })
  }
  if (!validatePassword(password)) {
    res.status(300).send({
      message: "Invalid password."
    })
  }
}

async function handleRegisterNewUser(req, res) {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    phoneNumber,
    profilePicture,
    gender,
  } = req.body;

  // Add validation for all fields
  if (!validateUsername(username)) {
    res.status(300).send({
      message: "Invalid username."
    })
  }
  if (!validatePassword(password)) {
    res.status(300).send({
      message: "Invalid password."
    })
  }
  if (!validateEmail(email)) {
    res.status(300).send({
      message: "Invalid email."
    })
  }
  if (phoneNumber !== "" && !validatePhoneNumber(phoneNumber)) {
    res.status(300).send({
      message: "Invalid phone number."
    })
  }

  // Hash the password
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      try {
        const result = await pool.query(`
          INSERT INTO users 
            (first_Name, last_name, username, email, password_hash, password_salt, phone_number, profile_picture, gender)
          VALUES 
            ('${firstName}', '${lastName}', '${username}', '${email}', '${salt}', '${hash}', '${phoneNumber}', '${profilePicture}', '${gender}')
        `)

        res.status(200).send(result)
      } catch (err) {
        console.error(err); // DEBUG
        res.status(500).send({
          message: err.detail
        })
      }
    });
  });
}


module.exports = {
  handleRegisterNewUser,
  handleLoginUser
}