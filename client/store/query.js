import axios from 'axios'

const initialState = {}

const SET_TABLE_NAMES = 'SET_TABLE_NAMES'

const ADD_FIELD_ELEMENT = 'ADD_FIELD_ELEMENT'

const REMOVE_FIELD_ELEMENT = 'REMOVE_FIELD_ELEMENT'

const ADD_FILTER_ELEMENT = 'ADD_FILTER_ELEMENT'

const ORDER_BY = 'ORDER_BY'

const GROUP_BY = 'GROUP_BY'

const LIMIT_TO = 'LIMIT_TO'

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

export const addFilterElement = (tableName, filterArray) => ({
  type: ADD_FILTER_ELEMENT,
  tableName,
  filterArray
})

export const orderBy = (tableName, orderByArray) => ({
  type: ORDER_BY,
  tableName,
  orderByArray
})

export const groupBy = (tableName, groupByArray) => ({
  type: GROUP_BY,
  tableName,
  groupByArray
})

export const limitTo = (tableName, limit) => ({
  type: LIMIT_TO,
  tableName,
  limit
})

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

    case REMOVE_FIELD_ELEMENT:
      let newState2 = {...state}
      newState2[action.tableName].fields = newState2[
        action.tableName
      ].fields.filter(field => field !== action.field)
      return newState2

    case ADD_FILTER_ELEMENT:
      let newState3 = {...state}
      newState3[action.tableName].where = [
        ...newState3[action.tableName].where,
        action.filterArray
      ]
      return newState3

    case ORDER_BY:
      let newState4 = {...state}
      newState4[action.tableName].orderBy = [
        ...newState4[action.tableName].orderBy,
        action.orderByArray
      ]
      return newState4
    case GROUP_BY:
      let newState5 = {...state}
      newState5[action.tableName].groupBy = [
        ...newState5[action.tableName].groupBy,
        action.groupByArray
      ]
      return newState5
    case LIMIT_TO:
      let newState6 = {...state}
      newState6[action.tableName].limit = [action.limit]
      return newState6
    default:
      return state
  }
}

export default query
