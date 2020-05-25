function queryParser(table, queryObj, queryBundle) {
  let query = 'SELECT '
  let fields = ''
  let join = ''
  let where = ''
  let appendedFields = ''
  let groupBy = ''
  let orderBy = ''
  let limit = ''

  Object.keys(queryObj).forEach(parameter => {
    if (parameter === 'fields') {
      fields += parseFields(table, queryObj[parameter])
    } else if (parameter === 'join') {
      join += parseJoin(table, queryObj[parameter])
    } else if (parameter === 'where') {
      where += parseWhere(table, queryObj[parameter])
    } else if (parameter === 'groupBy') {
      groupBy += parseGroupBy(table, queryObj[parameter])
    } else if (parameter === 'orderBy') {
      orderBy += parseOrderBy(table, queryObj[parameter])
    } else if (parameter === 'limit') {
      limit += parseLimit(table, queryObj[parameter])
    }
  })
  query += `${fields} ${appendJoinedFields(
    table,
    queryBundle
  )} FROM ${table} ${join} ${where} ${groupBy} ${orderBy} ${limit}`

  console.log('QUERY', query)
  return query.replace(/;/g, '')
}

function parseWhere(table, whereArr) {
  let query = whereArr.length ? ' WHERE' : ''
  query += whereArr.reduce((string, criteria, index) => {
    let field = criteria[0]
    let operator = criteria[1]
    let value =
      typeof criteria[2] !== 'string' || criteria[2] === 'IS NOT NULL'
        ? criteria[2]
        : `'${criteria[2]}'`

    if (index === whereArr.length - 1) {
      string += `${table}.${field} ${operator} ${value}`
    } else {
      string += `${table}.${field} ${operator} ${value} AND `
    }
    return string
  }, ' ')
  return query
}

function parseAggregate(field, tableName) {
  let split = field.split('(')
  let queryStr = split[0] + '(' + tableName + '.' + split[1]
  return `${queryStr} AS ${split[0].toLowerCase()}Of${
    split[1][0] === '*' ? tableName : split[1].slice(0, -1)
  }`
}

function parseFields(table, fieldsArr) {
  // eslint-disable-next-line complexity
  // eslint-disable-next-line complexity
  return fieldsArr.reduce((string, field, index) => {
    if (
      (field.includes('COUNT') ||
        field.includes('SUM') ||
        field.includes('AVG') ||
        field.includes('MIN') ||
        field.includes('MAX')) &&
      index === fieldsArr.length - 1
    ) {
      string += `${parseAggregate(field, table)} `
    } else if (
      field.includes('COUNT') ||
      field.includes('SUM') ||
      field.includes('AVG') ||
      field.includes('MIN') ||
      field.includes('MAX')
    ) {
      string += `${parseAggregate(field, table)}, `
    } else if (index === fieldsArr.length - 1) {
      string += `${table}.${field} `
    } else {
      string += ` ${table}.${field},`
    }
    return string
  }, '')
}

//joinArr ---> [table2, joinType, table1.column, table2.column]
//add select fields appended to the select from for the to be joined table - array at 4th index and call parseFields on it
//<---add reducer ann action creators to include the last leg of the select clauses.
function parseJoin(table, joinArr, queryBundle) {
  let query = ''
  joinArr.map(join => {
    if (join.length !== 0) {
      return (query += ` ${join[1]} JOIN ${join[0]} ON ${join[2]} = ${
        join[3]
      } `)
    } else return 100
  })
  return joinArr.length !== 0 && query !== undefined ? query : ''
}

function appendJoinedFields(table, queryBundle) {
  let joinedTableNames = []
  queryBundle[table].join.map(join => joinedTableNames.push(join[0]))

  let appendFields = joinedTableNames
    .map(tables => {
      if (parseFields(tables, queryBundle[tables].fields) !== '') {
        return ',' + parseFields(tables, queryBundle[tables].fields)
      }
    })
    .join('')

  return appendFields
}

function parseGroupBy(table, groupByArray) {
  let query = groupByArray.length ? ' GROUP BY' : ''
  query += groupByArray.reduce((string, field, index) => {
    if (index === groupByArray.length - 1) {
      string += ` ${table}.${field}`
    } else {
      string += ` ${table}.${field},`
    }
    return string
  }, '')
  return query
}
/* the orderBy parameter stores the orderByArray, which holds objects where the
key-value pairs are of format {field: direction}. If direction is null, append nothing;
SQL defaults to ASC/alphabetical order
*/

function parseOrderBy(table, orderByArray) {
  let query = ''
  if (Object.keys(orderByArray[0]).length) {
    query += ' ORDER BY'
    query += orderByArray.reduce((string, value, index) => {
      string += ` ${table}.` + `${Object.keys(value)}`.split(' ')[0]

      if (Object.values(value)[0] !== '') {
        string += ' ' + `${Object.values(value)}`.split(' ')[0]
      }
      if (index < orderByArray.length - 1) {
        string += ','
      }
      return string
    }, '')
  }
  return query
}

// the limit parameter stores a 1-element array with the desired limit as it's value
function parseLimit(limitArr) {
  let query = limitArr.length
    ? ` LIMIT ${Math.abs(parseInt(limitArr[0], 10))}`
    : ''
  return query
}

module.exports = {
  queryParser,
  parseLimit,
  parseOrderBy,
  parseGroupBy,
  appendJoinedFields,
  parseJoin,
  parseFields,
  parseAggregate,
  parseWhere
}
