const { Pool } = require("pg")
require('dotenv').config()  // Use env variables 'process.env.VAR'

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
})

module.exports = pool