import axios from 'axios'

const initialState = []

const GET_TABLES = 'GET_TABLES'
const ADDED_HEADER_TYPE = 'ADDED_HEADER_TYPE'
const DELETED_TABLE = 'DELETED_TABLE'

//ACTION CREATORS
const getTables = tables => ({
  type: GET_TABLES,
  tables
})

export const addHeaderType = (header, dataType, tableName) => ({
  type: ADDED_HEADER_TYPE,
  header,
  dataType,
  tableName
})

//THUNKS
export const gotTables = (userId, tableData, files) => {
  return async dispatch => {
    try {
      let newFileNames = files.tableNames.filter(
        file =>
          !tableData.filter(table => Object.keys(table)[0] === file).length
      )

      let filePaths = files.fileNames.map(file => file.path)
      const res = await axios.put(`/api/parse/${userId}/${newFileNames}`, {
        filepaths: filePaths
      })

      dispatch(getTables(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETED_TABLE:
      return state.filter(tab => Object.keys(tab)[0] !== action.table)
    case GET_TABLES:
      let newState = state.length ? state : []

      newState = [
        ...newState,
        ...action.tables.map(table => {
          let tableName = Object.keys(table)[0]

          if (!table[tableName].headers) {
            table[tableName].headers = {}
          }

          return table
        })
      ].reduce((uniques, table) => {
        if (
          !uniques.find(tab => Object.keys(tab)[0] === Object.keys(table)[0])
        ) {
          uniques.push(table)
        }
        return uniques
      }, [])

      return newState
    case ADDED_HEADER_TYPE:
      return state.map(table => {
        if (table.hasOwnProperty(action.tableName)) {
          table[action.tableName].headers[action.header] = action.dataType
        }

        return table
      })
    default:
      return state
  }
}

export default tableReducer
