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
      const res = await axios.get(`/api/parse/${userId}/${tableNames}`)

      dispatch(getTables(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TABLES:
      return action.tables
    default:
      return state
  }
}

export default tableReducer
