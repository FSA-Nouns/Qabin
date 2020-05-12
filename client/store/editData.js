import axios from 'axios'

const initialState = []

const GET_TABLES = 'GET_TABLES'
const ADDED_HEADER_TYPE = 'ADDED_HEADER_TYPE'

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
export const gotTables = (userId, tableNames, files) => {
  return async dispatch => {
    try {
      let filePaths = files.fileNames.map(file => file.path)
      const res = await axios.put(`/api/parse/${userId}/${tableNames}`, {
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
    case GET_TABLES:
      return action.tables.map(table => {
        let tableName = Object.keys(table)[0]
        table[tableName].headers = {}
        return table
      })
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
