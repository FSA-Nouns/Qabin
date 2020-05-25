const {expect} = require('chai')
const {
  queryParser,
  parseWhere,
  parseAggregate,
  parseFields,
  parseJoin,
  appendJoinedFields,
  parseGroupBy,
  parseOrderBy,
  parseLimit
} = require('../services/queryParser')

const table = 'example_table_name'

const queryObj1 = {
  fields: ['age', 'units', 'products', 'SUM(total)'],
  where: [
    ['age', '<', '1'],
    ['units', '', 'IS NOT NULL'],
    ['product', 'LIKE', '%cat%']
  ],
  groupBy: ['product', 'units', 'age'],
  orderBy: [{age: 'DESC'}, {product: ''}],
  limit: ['5']
}

const queryBundle1 = {
  user3_orders: {
    fields: ['age', 'units', 'products', 'SUM(total)'],
    where: [
      ['age', '<', '1'],
      ['units', '', 'IS NOT NULL'],
      ['product', 'LIKE', '%cat%']
    ],
    groupBy: ['product', 'units', 'age'],
    orderBy: [{age: 'DESC'}, {product: ''}],
    limit: ['5']
  },
  user3_users: {},
  user3_products: {}
}

const queryBundle2 = {user3_orders: {}, user3_users: {}, user3_products: {}}

describe('queryParser', () => {
  it('Converts a querybundle object into a correctly ordered and formatted SQL query', () => {
    expect(queryParser(table, queryObj1, queryBundle1)).to.equal('')
  })
})
describe('parseWhere', function() {
  it('Returns an empty string if no conditions are specified', () => {
    expect(parseWhere('example_table_name', [])).to.equal(' ')
  })
  it('Parses the where array for condition arrays, from within each nested array takes a field from the first position, an operator from the second, and translates them to a query', () => {
    expect(
      parseWhere('example_table_name', [['product_id', '=', '1']])
    ).to.equal(` WHERE example_table_name.product_id = '1'`)
    expect(
      parseWhere('example_table_name', [['product_id', '!=', '1']])
    ).to.equal(` WHERE example_table_name.product_id != '1'`)
    expect(
      parseWhere('example_table_name', [['product_id', '>', '1']])
    ).to.equal(` WHERE example_table_name.product_id > '1'`)
    expect(
      parseWhere('example_table_name', [['product_id', '>=', '1']])
    ).to.equal(` WHERE example_table_name.product_id >= '1'`)
    expect(
      parseWhere('example_table_name', [['product_id', '<', '1']])
    ).to.equal(` WHERE example_table_name.product_id < '1'`)
    expect(
      parseWhere('example_table_name', [['product_id', '<=', '1']])
    ).to.equal(` WHERE example_table_name.product_id <= '1'`)
    expect(
      parseWhere('example_table_name', [['product_id', 'LIKE', '%test%']])
    ).to.equal(` WHERE example_table_name.product_id LIKE '%test%'`)
    expect(
      parseWhere('example_table_name', [['product_id', 'LIKE', 'test%']])
    ).to.equal(` WHERE example_table_name.product_id LIKE 'test%'`)
    expect(
      parseWhere('example_table_name', [['product_id', 'LIKE', '%test']])
    ).to.equal(` WHERE example_table_name.product_id LIKE '%test'`)
    it('chains multiple where conditions by inserting AND', () => {
      expect(
        parseWhere('example_table_name', [
          ['product_name', 'LIKE', '%test%'],
          ['first_name', 'LIKE', 'test%'],
          ['last_name', 'LIKE', '%test']
        ])
      ).to.equal(
        `WHERE example_table_name.product_name LIKE '%test%' AND example_table_name.first_name LIKE 'test%' AND example_table_name.last_name LIKE '%test'`
      )
    })
  })
})
describe('parseFields', function() {
  it('Returns an empty string if no conditions are specified', () => {
    expect(parseFields(table, [''])).to.equal('')
  })
  it('Parses out the fields to be selected, and pre-pends the tablename from which to select', () => {
    expect(parseFields(table, ['age', 'units', 'products', 'total'])).to.equal(
      ' example_table_name.age, example_table_name.units, example_table_name.products,example_table_name.total '
    )
  })
  it('Returns an empty string if no conditions are specified', () => {
    expect(
      parseFields(table, ['products', 'SUM(total)', 'AVG(total)'])
    ).to.equal(
      ' example_table_name.products,SUM(example_table_name.total) AS sumOftotal, AVG(example_table_name.total) AS avgOftotal '
    )
  })
})
describe('parseAggregate', function() {
  it('Returns an empty string if no conditions are specified', () => {
    expect(parseAggregate('')).to.equal('')
  })
})
describe('parseJoin', function() {
  it('Returns an empty string if no conditions are specified', () => {
    expect(parseJoin('')).to.equal('')
  })
})
describe('appendJoinedFields', function() {
  it('Returns an empty string if no conditions are specified', () => {
    expect(appendJoinedFields('')).to.equal('')
  })
})
describe('parseGroupBy', function() {
  it('Returns an empty string if no conditions are specified', () => {
    expect(parseGroupBy(table, [])).to.equal('')
  })
  it('Returns a string which preserves the order of the data fields in the original array', () => {
    expect(parseGroupBy(table, ['product', 'user', 'age'])).to.equal(
      ' GROUP BY example_table_name.product, example_table_name.user, example_table_name.age'
    )
  })
})
describe('parseOrderBy', function() {
  it('Returns an empty string if no conditions are specified', () => {
    expect(parseOrderBy('user3_orders', [{}])).to.equal('')
  })
  it('Returns an string ordering each data field in that direction designated for that field', () => {
    expect(
      parseOrderBy('user3_orders', [
        {units: 'ASC'},
        {product: 'DESC'},
        {'SUM(total)': 'ASC'}
      ])
    ).to.equal(
      ' ORDER BY user3_orders.units ASC, user3_orders.product DESC, user3_orders.SUM(total) ASC'
    )
  })
  it('Returns a string which preserves the order of the data fields in the original array, seperated by commas', () => {
    expect(
      parseOrderBy('user3_orders', [
        {units: 'ASC'},
        {product: 'DESC'},
        {'SUM(total)': 'DESC'},
        {user_id: ''},
        {'COUNT(order_id)': 'ASC'},
        {total: ''}
      ])
    ).to.equal(
      ' ORDER BY user3_orders.units ASC, user3_orders.product DESC, user3_orders.SUM(total) DESC, user3_orders.user_id, user3_orders.COUNT(order_id) ASC, user3_orders.total'
    )
  })
  it('If no direction is specified for a data field, it does not specify a direction in the returned string', () => {
    expect(parseOrderBy('user3_orders', [{units: ''}, {product: ''}])).to.equal(
      ' ORDER BY user3_orders.units, user3_orders.product'
    )
  })
})
describe('parseLimit', function() {
  it('Returns an empty string if no limit value is specified', () => {
    expect(parseLimit([])).to.equal('')
  })
  it('If a negative value is specified, it converts it to a positive value before producing the LIMIT clause', () => {
    expect(parseLimit([-5])).to.equal(' LIMIT 5')
  })
})
