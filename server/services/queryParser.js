function queryParser(table, queryObj) {
  /* queryParser receives a table (the table to be queried) and queryObj 
(in which queries are stored as key-value pairs in a 'filter: [array of fields] format).
The function begins by looping through the keys to determine the nature of the clause
to be converted according to the key (parameter) - 'fields' indicated the FROM clause, 
'where' indicates a WHERE clause etc. The format of the array of fields varies by clause,
as defined in client/store/query.js on the front-end.
queryParser then calls the appropriate parsing function, passing in the table and current
parameter: [array of fields] value pair, and appending the resultant string to the
'query' string variable. 
 */

  let query = 'SELECT '

  Object.keys(queryObj).forEach(parameter => {
    if (parameter === 'fields') {
      query += parseFields(table, queryObj[parameter])
    } else if (parameter === 'where') {
      query += parseWhere(table, queryObj[parameter])
    } else if (parameter === 'limit') {
      query += parseLimit(table, queryObj[parameter])
    } else if (parameter === 'orderBy') {
      query += parseOrderBy(table, queryObj[parameter])
    } else if (parameter === 'groupBy') {
      query += parseOrderBy(table, queryObj[parameter])
    }
  })

  console.log(query)
  return query
}

function parseFields(table, fieldsArr) {
  return fieldsArr.reduce((string, field, index) => {
    if (index === fieldsArr.length - 1) {
      string += `${field} FROM ${table}`
    } else {
      string += `${field}, `
    }
    return string
  }, '')
}

function parseWhere(table, whereArr) {
  let query = ' WHERE'

  query += whereArr.reduce((string, criteria, index) => {
    let field = criteria[0]
    let operator = criteria[1]
    let value =
      typeof criteria[2] !== 'string' ? criteria[2] : `'${criteria[2]}'`

    if (index === whereArr.length - 1) {
      string += `${table}.${field} ${operator} ${value}` //Why are we appending table.field?
    } else {
      string += `${table}.${field} ${operator} ${value} AND `
    }
    return string
  }, ' ')

  return whereArr.length ? query : ''
}

/* the orderBy parameter stores the orderByArray, which holds objects where the
key-value pairs are of format {field: direction}. If direction is null, append nothing;
SQL defaults to ASC/alphabetical order
*/

function parseOrderBy(table, orderByArray) {
  let query = ' ORDER BY'
  query += orderByArray.reduce((string, index) => {
    console.log(index)
    string += ` ${Object.keys(index)[0]}`
    string += Object.values(index) !== null ? ` ${Object.values(index)[0]}` : ''
    if (index < orderByArray.length - 1) {
      string += ','
    }
    console.log('FINAL STRING', string)
    return string
  }, '')
  return query
}

function parseGroupBy(table, orderByArray) {
  let query = ' ORDER BY'
  query += orderByArray.reduce((string, index) => {
    console.log(index)
    string += ` ${Object.keys(index)[0]}`
    string += Object.values(index) !== null ? ` ${Object.values(index)[0]}` : ''
    if (index < orderByArray.length - 1) {
      string += ','
    }
    console.log('FINAL STRING', string)
    return string
  }, '')
  return query
}

// the limit parameter stores a 1-element array with the desired limit as it's value
function parseLimit(table, limitArr) {
  let query = ` LIMIT ${limitArr[0]}`
  return query
}

module.exports = queryParser
