function queryParser(table, queryObj) {
  let query = 'SELECT '

  Object.keys(queryObj).forEach(parameter => {
    if (parameter === 'fields') {
      query += parseFields(table, queryObj[parameter])
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

function parseAggregate(field, tableName) {
  let split = field.split('(')
  let queryStr = split[0] + '(' + tableName + '.' + split[1]
  return `${queryStr} AS ${split[0].toLowerCase()}Of${split[1].slice(0, -1)}`
}

function parseFields(table, fieldsArr) {
  // eslint-disable-next-line complexity
  console.log('fieldsArr', fieldsArr)
  console.log('fieldsArr length', fieldsArr.length)
  // eslint-disable-next-line complexity
  return fieldsArr.reduce((string, field, index) => {
    console.log('index', index)
    console.log('field', field)
    console.log('string', string)
    console.log('eval:', index === fieldsArr.length - 1)
    if (
      (field.includes('COUNT') ||
        field.includes('SUM') ||
        field.includes('AVG') ||
        field.includes('MIN') ||
        field.includes('MAX')) &&
      index === fieldsArr.length - 1
    ) {
      string += `${parseAggregate(field, table)} FROM ${table}`
    } else if (
      field.includes('COUNT') ||
      field.includes('SUM') ||
      field.includes('AVG') ||
      field.includes('MIN') ||
      field.includes('MAX')
    ) {
      string += `${parseAggregate(field, table)}, `
    } else if (index === fieldsArr.length - 1) {
      string += `${table}.${field} FROM ${table}`
    } else {
      string += `${table}.${field}, `
    }

    return string
  }, '')
}

module.exports = queryParser
