import axios from 'axios'

const initialState = {}

const SET_TABLE_NAMES = 'SET_TABLE_NAMES'

const ADD_FILTER_ELEMENT = 'ADD_FILTER_ELEMENT'

const ADD_FIELD_ELEMENT = 'ADD_FIELD_ELEMENT'

const REMOVE_FIELD_ELEMENT = 'REMOVE_FIELD_ELEMENT'

export const addFilterElement = (tableName, filterArray) => ({
  type: ADD_FILTER_ELEMENT,
  tableName,
  filterArray
})

export const addFieldElement = (tableName, field) => ({
  type: ADD_FIELD_ELEMENT,
  tableName,
  field
})

export const removeFieldElement = (tableName, field) => ({
  type: REMOVE_FIELD_ELEMENT,
  tableName,
  field
})

export const submitQuery = query => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/queries/query', {queryBundle: query})

      dispatch(queriedTables(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const query = (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLE_NAMES:
      let newState = {...state}
      action.tableNames.forEach(
        name => (newState[name] = {fields: [], where: []})
      )
      return newState

    case ADD_FIELD_ELEMENT:
      let newState1 = {...state}

      newState1[action.tableName].fields = [
        ...newState1[action.tableName].fields,
        action.field
      ]

      return newState1
    case ADD_FILTER_ELEMENT:
      let newState2 = {...state}

      newState2[action.tableName].where = [
        ...newState2[action.tableName].where,
        action.filterArray
      ]

      return newState2
    case REMOVE_FIELD_ELEMENT:
      let newState3 = {...state}

      newState3[action.tableName].fields = newState3[
        action.tableName
      ].fields.filter(field => field !== action.field)

      return newState3
    default:
      return state
  }
}

export default query
