const fs = require('fs')
const Pool = require('pg').Pool
const fastcsv = require('fast-csv')

//table name will have our unique indentifier for user tables
//pay attention to filepath, is it relational to where this is being called, or where this file is
function parseCSVtoDB(table_name, filepath) {
  let stream = fs.createReadStream(filepath)
  let csvData = []
  let csvStream = fastcsv
    .parse()
    .on('data', function(data) {
      csvData.push(data)
    })
    .on('end', function() {
      // remove the first line: header
      const header = csvData.shift()
      // create a new connection to the database
      const pool = new Pool({
        host: 'localhost',
        user: 'postgres',
        database: 'dummy-qbp',
        //   password: "123",
        port: 5432
      })

      const query1 =
        header.reduce((string, h, index) => {
          if (index === 0) {
            string += `${h} serial PRIMARY KEY, `
          } else if (index === header.length - 1) {
            string += `${h} VARCHAR(355)`
          } else {
            string += `${h} VARCHAR(355), `
          }

          return string
        }, `CREATE TABLE ${table_name} (`) + ')'

      // const query1 =
      //   'CREATE TABLE account (id serial PRIMARY KEY, first_name VARCHAR (50) NOT NULL, last_name VARCHAR (50) NOT NULL, email VARCHAR (355) UNIQUE NOT NULL, gender VARCHAR (50) NOT NULL, ip_address VARCHAR (50))'

      let values = ``

      const query = header.reduce((string, h, index) => {
        if (index === header.length - 1) {
          string += `${h}) VALUES (`
        } else {
          string += `${h},`
        }
        if (index === header.length - 1) {
          values += `$${index + 1})`
          string += values
        } else {
          values += `$${index + 1}, `
        }

        return string
      }, `INSERT INTO ${table_name} (`)

      pool.connect((err, client, done) => {
        if (err) throw err
        try {
          client.query(query1, (err1, res) => {
            if (err1) {
              console.log(err1.stack)
            } else {
              console.log('created table')
            }
          })
        } catch (error) {
          console.log(error, 'ERROR')
        }

        try {
          csvData.forEach(row => {
            client.query(query, row, (err2, res) => {
              if (err2) {
                console.log(err2.stack)
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
}

module.exports = parseCSVtoDB
