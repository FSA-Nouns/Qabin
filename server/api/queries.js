const router = require('express').Router()
const Pool = require('pg').Pool
const {queryParser} = require('../services/queryParser')
const isUserMiddleware = require('../auth/isUser')

let pool

if (process.env.NODE_ENV !== 'production') {
  pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'qabin',
    //   password: "123",
    port: 5432
  })
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  })
}

//queries/query/1
router.put('/:userId/query', async (req, res, next) => {
  try {
    const allTables = []
    const tables = Object.keys(req.body.queryBundle)

    for (let i = 0; i < tables.length; i++) {
      let table = tables[i]

      let query = queryParser(
        table,
        req.body.queryBundle[table],
        req.body.queryBundle
      )
      let rows = await pool.query(query)

      rows.query = query
      allTables.push({[table]: rows})
    }
    res.status(201).send(allTables)
  } catch (err) {
    next(err)
  }
})

module.exports = router
