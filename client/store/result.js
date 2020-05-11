import axios from 'axios'
import history from '../history'

const QUERIED_TABLES = 'QUERIED_TABLES'

const queriedTables = tables => {
  return {
    type: QUERIED_TABLES,
    tables
  }
}

export const submitQuery = query => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/queries/query', {queryBundle: query})

      dispatch(queriedTables(data))
      history.push('/results')
    } catch (error) {
      console.log(error)
    }
  }
}

const resultQueryReducer = (state = [], action) => {
  switch (action.type) {
    case QUERIED_TABLES:
      return action.tables
    default:
      return state
  }
}

export default resultQueryReducer
