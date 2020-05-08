import axios from 'axios'

const initialState = []

const GET_TABLES = 'GET_TABLES'

//ACTION CREATORS
const getTables = tables => ({
  type: GET_TABLES,
  tables
})

//THUNKS
export const gotTables = (userId, tableNames) => {
  return async dispatch => {
    try {
      console.log(
        'tableNames received as arguments in gotTables thunk and sent as a get request params',
        tableNames
      )
      const res = await axios.get(`/api/parse/${tableNames}`)
      console.log(
        'res = response received from get route and to be dispatched to getTables inside gotTablesThunk',
        res
      )
      dispatch(getTables(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TABLES:
      console.log('state in table reducer in GET_TABLES', state)
      console.log('action in table reducer in GET_TABLES', action)
      return action.tables
    default:
      return state
  }
}

export default tableReducer
