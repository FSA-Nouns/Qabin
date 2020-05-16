import axios from 'axios'

const SET_TABLE_NAMES = 'SET_TABLE_NAMES'

const GET_TABLES = 'GET_TABLES'

const getTables = tables => ({
  type: GET_TABLES,
  tables
})

const setTables = tableNames => ({
  type: SET_TABLE_NAMES,
  tableNames
})

export const getUserTables = user => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/tables/${user.id}`)

      dispatch(getTables(data.userTableDatas))
      dispatch(setTables(data.userTablesNames))
    } catch (error) {
      console.log(error)
    }
  }
}
