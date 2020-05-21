/* eslint-disable complexity */
import axios from 'axios'

const initialState = {}

const SET_TABLE_NAMES = 'SET_TABLE_NAMES'

const ADD_FIELD_ELEMENT = 'ADD_FIELD_ELEMENT'

const REMOVE_FILTER_ELEMENT = 'REMOVE_FILTER_ELEMENT'

const REMOVE_FIELD_ELEMENT = 'REMOVE_FIELD_ELEMENT'

const ADD_JOIN_TABLE = 'ADD_JOIN_TABLE'

const REMOVE_JOIN_TABLE = 'REMOVE_JOIN_TABLE'

const SET_JOIN_TYPE = 'ADD_JOIN_TYPE'

// const REMOVE_JOIN_TYPE = 'REMOVE_JOIN_TYPE'

const SET_JOIN_COLUMN_ELEMENT = 'SET_JOIN_COLUMN_ELEMENT'

// const REMOVE_COLUMN_ELEMENT = 'REMOVE_COLUMN_ELEMENT'

const ADD_FILTER_ELEMENT = 'ADD_FILTER_ELEMENT'

const ORDER_BY = 'ORDER_BY'

const GROUP_BY = 'GROUP_BY'

const LIMIT_TO = 'LIMIT_TO'

const RESET = 'RESET'

const AGG = 'AGG'

const checkArray = (arr1, arr2) => {
  return arr1.reduce((bool, ele) => {
    if (!arr2.includes(ele)) {
      bool = false
    }
    return bool
  }, true)
}

export const addJoinTable = (tableName, joinArray, index, joinId) => ({
  type: ADD_JOIN_TABLE,
  tableName,
  joinArray,
  index: 0,
  joinId
})

//dont need joinArray as an arg as it will wipe out the array
export const removeJoinTable = (tableName, index, joinId) => ({
  type: REMOVE_JOIN_TABLE,
  tableName,
  index: 0,
  joinId
})

export const setJoinType = (tableName, joinArray, index, joinId) => ({
  type: SET_JOIN_TYPE,
  tableName,
  joinArray,
  index: 1,
  joinId
})

// export const removeJoinType = (tableName, index, joinId) => ({
//   type: REMOVE_JOIN_TYPE,
//   tableName,
//   index: 1,
//   joinId
// })

export const setJoinColumnElement = (tableName, joinArray, index, joinId) => ({
  type: SET_JOIN_COLUMN_ELEMENT,
  tableName,
  joinArray,
  index,
  joinId
})

export const addFilterElement = (tableName, filterArray) => ({
  type: ADD_FILTER_ELEMENT,
  tableName,
  filterArray
})

export const removeFilterElement = (tableName, filterArray) => ({
  type: REMOVE_FILTER_ELEMENT,
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

export const reset = tableName => ({
  type: RESET,
  tableName
})

export const agg = tableName => ({
  type: AGG,
  tableName
})

const query = (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLE_NAMES:
      let newState = {...state}
      action.tableNames.forEach(
        name => (newState[name] = {fields: [], join: [], where: []})
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
      ].reduce((uniques, whereArr) => {
        if (
          !uniques.filter(conditionArr =>
            checkArray(conditionArr, action.filterArray)
          ).length
        ) {
          uniques.push(whereArr)
        }
        return uniques
      }, [])
      return newState3

    case REMOVE_FILTER_ELEMENT:
      let newState03 = {...state}
      newState03[action.tableName].where = newState03[
        action.tableName
      ].where.filter(
        conditionArr => !checkArray(conditionArr, action.filterArray)
      )
      return newState03

    case ADD_JOIN_TABLE:
      let newStateA = {...state}
      if (newStateA[action.tableName].join[action.joinId]) {
        newStateA[action.tableName].join[action.joinId][action.index] =
          action.joinArray
      } else {
        newStateA[action.tableName].join = [
          ...newStateA[action.tableName].join,
          [action.joinArray, '', '', '']
        ]
      }
      return newStateA

    case REMOVE_JOIN_TABLE:
      let newStateB = {...state}

      newStateB[action.tableName].join !== []
        ? (newStateB[action.tableName].join = newStateB[
            action.tableName
          ].join.filter((join, index) => (index !== action.joinId ? join : '')))
        : (newStateB[action.tableName].join = [])
      return newStateB

    case SET_JOIN_TYPE:
      let newStateC = {...state}
      newStateC[action.tableName].join[action.joinId][action.index] =
        action.joinArray
      return newStateC

    case SET_JOIN_COLUMN_ELEMENT:
      let newStateE = {...state}
      newStateE[action.tableName].join[action.joinId][action.index] =
        action.joinArray
      return newStateE

    case ORDER_BY:
      let newState4 = {...state}
      newState4[action.tableName].orderBy = [...action.orderByArray]
      return newState4

    case GROUP_BY:
      let newState5 = {...state}
      newState5[action.tableName].groupBy = [...action.groupByArray]
      return newState5

    case LIMIT_TO:
      let newState6 = {...state}
      newState6[action.tableName].limit = [action.limit]
      return newState6

    case RESET:
      let newState7 = {...state}
      newState7[action.tableName] = {
        fields: [],
        where: [],
        join: [],
        orderBy: [],
        groupBy: [],
        limit: []
      }
      return newState7

    case AGG:
      let newState8 = {...state}
      newState8[action.tableName].agg = [
        ...newState1[action.tableName].agg,
        action.field
      ]
      return newState1

    default:
      return state
  }
}

export default query
