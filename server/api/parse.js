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

router.post('/:userId', async (req, res, next) => {
  try {
    console.log(
      'in parse post route sent req.body as filepaths: filepaths',
      req.body
    )
    const getFile = req.body.filepaths
    let nameArr = []
    await getFile.forEach(file => {
      console.log(
        file,
        'file in parse post route in forEach which is then sent for parsing after setting table names'
      )
      let fileName = file.split('/') // to get the file name for the table name
      fileName = fileName[fileName.length - 1].split('.') //gettting last leg of the path of the file name
      console.log(
        fileName[0],
        'fileName[0] after getting the last leg of the file name and splitting it for a "."'
      )
      parse(`user${req.params.userId}_${fileName[0]}`, file) //use last leg of the file name to convert it into a table name in addition to the user.id identifier
      nameArr.push(`user${req.params.userId}_${fileName[0]}`.toLowerCase())
      console.log(
        'nameArr for storing name of tables after parsing and to be sent as response',
        nameArr
      )
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
    console.log(
      '---------req.params in get route fired by gotTables thunk',
      req.params
    )
    const tables = req.params.tableNames.split(',')
    console.log(
      '----------tables const after splitting req.params.tableNames to get array of table names ',
      tables
    )
    for (let i = 0; i < tables.length; i++) {
      let table = tables[i]
      let query = `SELECT * FROM ${table}`
      console.log(
        'Inside for loop -----> query = select * from table name in get route',
        query
      )
      let rows = await pool.query(query)
      // setTimeout(hold() ,10000)
      console.log('rows = pool.query(select * query with table name)', rows)
      allTables.push({[table]: rows})
    }
    console.log(
      allTables,
      'allltabes in get route after completing the for loop'
    )
    res.send(allTables)
  } catch (error) {
    next(error)
  }
})
