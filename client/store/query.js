import axios from 'axios'

const initialState = {}

const SET_TABLES = 'SET_TABLES'

const ADD_FILTER_ELEMENT = 'ADD_FILTER_ELEMENT'

const ADD_FIELD_ELEMENT = 'ADD_FIELD_ELEMENT'

const REMOVE_FIELD_ELEMENT = 'REMOVE_FIELD_ELEMENT'

const addFilterElement = (tableName, filterArray) => ({
  type: ADD_FILTER_ELEMENT,
  tableName,
  filterArray
})

const addFieldElement = (tableName, field) => ({
  type: ADD_FIELD_ELEMENT,
  tableName,
  field
})

const removeFieldElement = (tableName, field) => ({
  type: REMOVE_FIELD_ELEMENT,
  tableName,
  field
})

const query = (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLES:
      let newState = {...state}
      action.tables.forEach(name => (newState[name] = {fields: [], where: []}))
      return newState
    case ADD_FILTER_ELEMENT:
      return newState
    case ADD_FIELD_ELEMENT:
      return newState
    case REMOVE_FIELD_ELEMENT:
      return newState
    default:
      return state
  }
}

export default query
