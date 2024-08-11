const pool = require("../db")

async function handleGetAllUsers(req, res) {
  try {
    const result = await pool.query("SELECT * FROM users")
    res.status(200).send(result.rows)
  } catch (err) {
    console.error(err); // DEBUG
    res.status(500).json({
      message: "Internal server error."
    })
  }
}

module.exports = {
  handleGetAllUsers,
}