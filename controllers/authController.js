const pool = require("../db")
const {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateUsername,
} = require("../utils/validate")
require('dotenv').config()  // Use env variables 'process.env.VAR'
const jwt = require("jsonwebtoken")
const { encryptPassword, matchPassword } = require("../utils/authUtils")

const tableName = process.env.TABLE_NAME
const jwtSecret = process.env.JWT_SECRET_KEY

async function handleLoginUser(req, res) {
  const { email, password } = req.body

  // Validate data
  if (!validateEmail(email)) {
    return res.status(300).send({
      message: "Invalid email."
    })
  }
  if (!validatePassword(password)) {
    return res.status(300).send({
      message: "Invalid password."
    })
  }

  try {
    const result = await pool.query(`
        SELECT id, email, password_hash, role
        FROM ${tableName}
        WHERE email = '${email}'
      `)

    // Return no such user exist if no rows returned
    if (result.rows.length === 0) {
      return res.status(401).send({
        message: "No such user. Please Signup first!"
      })
    }

    // Verify if the password matches the password in the DB
    const isPasswordCorrect = matchPassword(password, result.rows[0].password_hash)
    if (!isPasswordCorrect) {
      return res.status(401).send({
        message: 'Password does not match... TRY AGAIN!'
      })
    }
    // TODO: create and store the JWT token in cookie store
    const payload = {
      userId: result.rows[0].id,
      role: result.rows[0].role,
      email: result.rows[0].email
    }
    const token = jwt.sign(payload, jwtSecret)

    // Store the token in cookies
    res.cookie("token", token, {
      httpOnly: false,
      // maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'None', // Required if your frontend is on a different origin
      secure: true, // Must be true if sameSite is 'None'
    })

    return res.status(200).send({ token })
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Internal server error"
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
    return res.status(300).send({
      message: "Invalid username."
    })
  }
  if (!validatePassword(password)) {
    return res.status(300).send({
      message: "Invalid password."
    })
  }
  if (!validateEmail(email)) {
    return res.status(300).send({
      message: "Invalid email."
    })
  }
  if (phoneNumber !== "" && !validatePhoneNumber(phoneNumber)) {
    return res.status(300).send({
      message: "Invalid phone number."
    })
  }

  // TODO: create and store the JWT token in cookie store

  // Hash the password
  const hash = encryptPassword(password)
  try {
    const result = await pool.query(`
      INSERT INTO ${tableName} 
        (first_Name, last_name, username, email, password_hash, phone_number, profile_picture, gender)
      VALUES 
        ('${firstName}', '${lastName}', '${username}', '${email}', '${hash}', '${phoneNumber}', '${profilePicture}', '${gender}')
    `)

    return res.status(200).send(result)
  } catch (err) {
    console.error(err); // DEBUG
    return res.status(500).send({
      message: err.detail
    })
  }
}

module.exports = {
  handleRegisterNewUser,
  handleLoginUser
}