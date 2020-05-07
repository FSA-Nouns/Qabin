const router = require('express').Router()
const Pool = require('pg').Pool
module.exports = router

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'dummy-qbp',
  //   password: "123",
  port: 5432
})

router.get('/querie', async (req, res, next) => {})
