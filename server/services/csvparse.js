const fs = require('fs')
const Pool = require('pg').Pool
const fastcsv = require('fast-csv')

let stream = fs.createReadStream('mockCSV.csv')
let csvData = []
let csvStream = fastcsv
  .parse()
  .on('data', function(data) {
    csvData.push(data)
  })
  .on('end', function() {
    // remove the first line: header
    csvData.shift()

    // create a new connection to the database
    const pool = new Pool({
      host: 'localhost',
      user: 'postgres',
      database: 'dummy-qbp',
      //   password: "123",
      port: 5432
    })

    const query1 =
      'CREATE TABLE account (id serial PRIMARY KEY, first_name VARCHAR (50) NOT NULL, last_name VARCHAR (50) NOT NULL, email VARCHAR (355) UNIQUE NOT NULL, gender VARCHAR (50) NOT NULL, ip_address VARCHAR (50))'

    const query =
      'INSERT INTO account (id, first_name, last_name, email, gender, ip_address) VALUES ($1, $2, $3, $4, $5, $6)'

    pool.connect((err, client, done) => {
      if (err) throw err
      try {
        client.query(query1, (err, res) => {
          if (err) {
            console.log(err.stack)
          } else {
            console.log('created table')
          }
        })
      } catch (error) {
        console.log(error, 'ERROR')
      }

      try {
        csvData.forEach(row => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack)
            } else {
              console.log('inserted ' + res.rowCount + ' row:', row)
            }
          })
        })
      } finally {
        done()
      }
    })
  })

stream.pipe(csvStream)
