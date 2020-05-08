import axios from 'axios'

const initialState = {}

const SET_TABLES = 'SET_TABLES'

const query = (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLES:
      let newState = {...state}
      action.tables.forEach(name => (newState[name] = {fields: [], where: []}))
      return newState
    default:
      return state
  }
}

export default query
