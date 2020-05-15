function queryParser(table, queryObj) {
  let query = 'SELECT '

  Object.keys(queryObj).forEach(parameter => {
    if (parameter === 'fields') {
      query += parseFields(table, queryObj[parameter])
    } else if (parameter === 'join') {
      query += parseJoin(table, queryObj[parameter])
    } else if (parameter === 'where') {
      query += parseWhere(table, queryObj[parameter])
    }
  })

  console.log(query)
  return query
}

function parseWhere(table, whereArr) {
  let query = ' WHERE'

  query += whereArr.reduce((string, criteria, index) => {
    let field = criteria[0]
    let operator = criteria[1]
    let value =
      typeof criteria[2] !== 'string' ? criteria[2] : `'${criteria[2]}'`

    if (index === whereArr.length - 1) {
      string += `${table}.${field} ${operator} ${value}`
    } else {
      string += `${table}.${field} ${operator} ${value} AND `
    }
    return string
  }, ' ')

  return whereArr.length ? query : ''
}

function parseFields(table, fieldsArr) {
  return fieldsArr.reduce((string, field, index) => {
    if (index === fieldsArr.length - 1) {
      string += `${table}.${field} FROM ${table} `
    } else {
      string += `${table}.${field}, `
    }

    return string
  }, '')
}

//joinArr ---> [table2, joinType, table1.column, table2.column]
//add select fields appended to the select from for the to be joined table - array at 4th index and call parseFields on it
//<---add reducer ann action creators to include the last leg of the select clauses.
function parseJoin(table, joinArr) {
  let query = ''
  joinArr.map(join => {
    if (join.length !== 0) {
      return (query += ` ${join[1]} JOIN ${join[0]} ON ${join[2]} = ${
        join[3]
      } `)
    } else return 100
  })
  console.log(query, 'query in parseJoin')
  return joinArr.length !== 0 && query !== undefined ? query : ''
}

module.exports = queryParser
