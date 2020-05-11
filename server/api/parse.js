const router = require('express').Router()
const parse = require('./../services/csvparse')
const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dummy-qbp',
  port: 5432
})

module.exports = router

// make sure the userId is being identified when the front-ends sends the array of filepaths

router.post('/:userId', (req, res, next) => {
  try {
    const getFile = req.body.filepaths
    let nameArr = []
    getFile.forEach(file => {
      let fileName = file.split('/') // to get the file name for the table name
      fileName = fileName[fileName.length - 1].split('.') //gettting last leg of the path of the file name
      parse(`user${req.params.userId}_${fileName[0]}`, file) //use last leg of the file name to convert it into a table name in addition to the user.id identifier
      nameArr.push(`user${req.params.userId}_${fileName[0]}`.toLowerCase())
    })
    res.status(201).send({nameArr: nameArr})
  } catch (error) {
    console.log(error)
  }
})

router.get('/:tableNames', async (req, res, next) => {
  try {
    const hold = () => {
      return 'Loading'
    }
    const allTables = []
    const tables = req.params.tableNames.split(',')
    for (let i = 0; i < tables.length; i++) {
      let table = tables[i]
      let query = `SELECT * FROM ${table}`
      let rows = await pool.query(query)
      allTables.push({[table]: rows})
    }
    res.send(allTables)
  } catch (error) {
    next(error)
  }
})
