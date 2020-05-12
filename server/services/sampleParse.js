const fs = require('fs')
const Pool = require('pg').Pool
const fastcsv = require('fast-csv')
// const pool =require('./../api/parse')

//table name will have our unique indentifier for user tables
//pay attention to filepath, is it relational to where this is being called, or where this file is
function sampleParser(table_name, filepath) {
  let stream = fs.createReadStream(filepath)
  let csvData = []
  let csvStream = fastcsv
    .parse({maxRows: 3})
    .on('data', function(data) {
      console.log(data)
      csvData.push(data)
    })
    .on('end', function() {
      console.log('Finished read')
    })
  console.log(stream)
  //   stream.pipe(csvStream)
  //   console.log('csvStream:', csvStream)
}

module.exports = sampleParser
