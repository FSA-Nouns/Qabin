function queryParser(table, queryObj) {
  let query = 'SELECT '

  queryObj.forEach(parameterObj => {
    let [parameter] = Object.keys(parameterObj)
    console.log(parameter, 'param')
    if (parameter === 'fields') {
      query += parseFields(table, parameterObj[parameter])
    } else if (parameter === 'where') {
      query += parseWhere(table, parameterObj[parameter])
    }
  })

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

  return query
}

function parseFields(table, fieldsArr) {
  return fieldsArr.reduce((string, field, index) => {
    if (index === fieldsArr.length - 1) {
      string += `${table}.${field} FROM ${table}`
    } else {
      string += `${table}.${field}, `
    }

    return string
  }, '')
}

module.exports = queryParser