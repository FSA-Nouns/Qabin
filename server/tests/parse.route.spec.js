const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')

/* Description of Route Functionality in Parse.js

1. a post method, path '/:userId/parse', that pulls tableData off of req.body. and stores it in tables.
It then loops through tables and extracts the current table name into a property called tableName,
and extracts the filepath and headers for the current table by accessing table[tableName].
It then calles the cvs parse function to get the fields (a.k.a. headers) for that table. If
that process is successful, it responds with a 201. 

2. a post method, path '/:userId', that pulls filepaths off req.body and stores it in a variable called 
getFile. For each file path in getFile, the route gets the file name and converts it into a table name. 
If successful, the route responds with a 201 and an array of table names in an object of format {nameArr: []}

3. 

*/

describe('Parse routes', function() {
  describe('POST /:userId/parse', function() {
    it('responds with 201')
  })
  describe('POST /api/parse/:userId', function() {
    it('responds with 201 and the table names with the username pre-pended')
  })
  describe('POST /:userId/:tableNames', function() {
    it('responds with 201')
  })
})
