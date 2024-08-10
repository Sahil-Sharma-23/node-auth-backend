const pool = require("../db")
const bcrypt = require('bcrypt')
const {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateUsername,
} = require("../utils/validate")
require('dotenv').config()  // Use env variables 'process.env.VAR'
const jwt = require("jsonwebtoken")
const { checkPassword, hashPassword } = require("../utils/authUtils")

const jwtSecret = process.env.JWT_SECRET
const tableName = process.env.TABLE_NAME

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

  try {
    const result = await pool.query(`
        SELECT id, email, password_hash, password_salt
        FROM ${tableName}
        WHERE email = '${email}'
      `)

    // Return no such user exist if no rows returned
    if (result.rows.length === 0) {
      res.status(401).send({
        message: "No such user. Please Signup first!"
      })
    }

    console.log(password, result.rows[0].password_hash); // DEBUG
    // Verify if the password matches the password in the DB
    const isPasswordCorrect = await checkPassword
      (password, result.rows[0].password_hash, result.rows[0].password_salt)

    console.log(isPasswordCorrect); // DEBUG
    res.status(200).send({
      message: isPasswordCorrect
    })
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Internal server error"
    })
  }

  // TODO: create and store the JWT token in cookie store
  // const token = jwt.sign({
  //   id: user.id,
  //   email: user.email,
  //   role: user.role
  // }, jwtSecret)
  // console.log("Token generated: ", token);  // DEBUG
  // res.cookie('token', token, { maxAge: 900000, httpOnly: true });
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

  // TODO: create and store the JWT token in cookie store

  // Hash the password
  const { salt, hash } = await hashPassword(password)
  try {
    const result = await pool.query(`
      INSERT INTO ${tableName} 
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
}

module.exports = {
  handleRegisterNewUser,
  handleLoginUser
}