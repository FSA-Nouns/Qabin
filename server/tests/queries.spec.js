const request = require('supertest')
const app = require('../index')

/* 1. a put method, path '/:userId/:tableNames', that creates an empty array called allTables, and pull queryBundle
off of req.body to store in a variable called tables. It then cycles through every table and parses the queries 
addressed to that table. it then queries the user's tables and stores the result in a variable called rows. 
It pushes the resultant tables into the allTables array. If successful, is responds
with a 201 and sends back allTables. 
*/

describe('Queries routes', function() {
  describe('GET /api/puppies', function() {
    it('responds with 200 and all puppies in the database')
  })

  describe('GET /api/puppies/:id', function() {
    it('responds with 200 and the correct puppy')
  })

  describe('POST /api/puppies', function() {
    it('creates the puppy and responds with 201')
  })
})
