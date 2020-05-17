/* eslint-disable no-loop-func */
const router = require('express').Router()
const isUserMiddleware = require('../auth/isUser')
const Pool = require('pg').Pool

let headerTypes = {
  16: 'BOOL',
  17: 'BYTEA',
  18: 'CHAR',
  20: 'INT8',
  21: 'INT2',
  23: 'INT4',
  24: 'REGPROC',
  25: 'TEXT',
  26: 'OID',
  27: 'TID',
  28: 'XID',
  29: 'CID',
  114: 'JSON',
  142: 'XML',
  194: 'PG_NODE_TREE',
  210: 'SMGR',
  602: 'PATH',
  604: 'POLYGON',
  650: 'CIDR',
  700: 'FLOAT4',
  701: 'FLOAT8',
  702: 'ABSTIME',
  703: 'RELTIME',
  704: 'TINTERVAL',
  718: 'CIRCLE',
  774: 'MACADDR8',
  790: 'MONEY',
  829: 'MACADDR',
  869: 'INET',
  1033: 'ACLITEM',
  1042: 'BPCHAR',
  1043: 'VARCHAR',
  1082: 'DATE',
  1083: 'TIME',
  1114: 'TIMESTAMP',
  1184: 'TIMESTAMPTZ',
  1186: 'INTERVAL',
  1266: 'TIMETZ',
  1560: 'BIT',
  1562: 'VARBIT',
  1700: 'NUMERIC',
  1790: 'REFCURSOR',
  2202: 'REGPROCEDURE',
  2203: 'REGOPER',
  2204: 'REGOPERATOR',
  2205: 'REGCLASS',
  2206: 'REGTYPE',
  2950: 'UUID',
  2970: 'TXID_SNAPSHOT',
  3220: 'PG_LSN',
  3361: 'PG_NDISTINCT',
  3402: 'PG_DEPENDENCIES',
  3614: 'TSVECTOR',
  3615: 'TSQUERY',
  3642: 'GTSVECTOR',
  3734: 'REGCONFIG',
  3769: 'REGDICTIONARY',
  3802: 'JSONB',
  4089: 'REGNAMESPACE',
  409: 'REGROLE'
}

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dummy-qbp',
  port: 5432
})

router.get('/:userId', async (req, res, next) => {
  try {
    let {rows} = await pool.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'user${req
        .params.userId + '\\_'}%' ORDER BY table_name;`
    )
    let userTablesNames = rows.reduce((tables, table) => {
      tables.push(table.table_name)
      return tables
    }, [])

    let userTableDatas = []
    for (let i = 0; i < userTablesNames.length; i++) {
      let tableName = userTablesNames[i]
      console.log(tableName)
      let table = await pool.query(`SELECT * FROM ${tableName} LIMIT 1`)
      console.log(table)
      // res.send(table)
      let headers = Object.keys(table.rows[0]).reduce((heads, field) => {
        let dataTypeId = table.fields.find(fieldObj => fieldObj.name === field)
          .dataTypeID
        let dataType = headerTypes[dataTypeId].replace(/\d+/g, '').toLowerCase()

        heads[field] = dataType

        return heads
      }, {})

      let tableData = {
        rows: table.rows,
        headers: headers,
        old: true
      }

      userTableDatas.push({[tableName]: tableData})
    }

    res.send({userTablesNames, userTableDatas})
  } catch (err) {
    next(err)
  }
})

module.exports = router
