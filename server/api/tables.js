const router = require('express').Router()
const isUserMiddleware = require('../auth/isUser')
const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dummy-qbp',
  port: 5432
})

router.get('/:userId', async (req, res, next) => {
  try {
    let {rows} = await pool.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'user${req
        .params.userId + '\\_'}%' ORDER BY table_name;`
    )
    let userTables = rows.reduce((tables, table) => {
      tables.push(table.table_name)
      return tables
    }, [])
    res.send(userTables)
  } catch (err) {
    next(err)
  }
})

module.exports = router
