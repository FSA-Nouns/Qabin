import axios from 'axios'

const initialState = {}

const SET_TABLE_NAMES = 'SET_TABLE_NAMES'

const ADD_FILTER_ELEMENT = 'ADD_FILTER_ELEMENT'

const ADD_FIELD_ELEMENT = 'ADD_FIELD_ELEMENT'

const REMOVE_FIELD_ELEMENT = 'REMOVE_FIELD_ELEMENT'

////////////////////////
const ADD_JOIN_ELEMENT = 'ADD_JOIN_ELEMENT'

const REMOVE_JOIN_ELEMENT = 'REMOVE_JOIN_ELEMENT'

const SET_JOIN_COLUMN1_ELEMENT = 'SET_JOIN_COLUMN1_ELEMENT'

const SET_JOIN_COLUMN2_ELEMENT = 'SET_JOIN_COLUMN2_ELEMENT'

const REMOVE_COLUMN_ELEMENT = 'REMOVE_COLUMN_ELEMENT'

const CONFIRM_JOIN = 'CONFIRM_JOIN'

export const addJoinElement = (tableName, joinArray, joinType, joinId) => ({
  type: ADD_JOIN_ELEMENT,
  tableName,
  joinArray,
  joinType,
  joinId: 0
})

//dont need joinArray as an arg as it will wipe out the array
export const removeJoinElement = (tableName, joinId) => ({
  type: REMOVE_JOIN_ELEMENT,
  tableName,
  joinId: 0
})

export const setJoinColumn1Element = (tableName, joinArray, joinId) => ({
  type: SET_JOIN_COLUMN1_ELEMENT,
  tableName,
  joinArray,
  joinId: 0
})

export const setJoinColumn2Element = (tableName, joinArray, joinId) => ({
  type: SET_JOIN_COLUMN2_ELEMENT,
  tableName,
  joinArray,
  joinId: 0
})

export const removeJoinColumnElement = (tableName, index, joinId) => ({
  type: REMOVE_COLUMN_ELEMENT,
  tableName,
  index,
  joinId: 0
})

export const confirmJoinElement = (tableName, index, joinId) => ({
  type: CONFIRM_JOIN,
  tableName,
  index,
  joinId: 0
})

/////////////////////////
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

// eslint-disable-next-line complexity
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

    case ADD_JOIN_ELEMENT:
      let newStateA = {...state}

      newStateA[action.tableName].join[action.joinId] = [
        ...newStateA[action.tableName].join[action.joinId],
        [action.joinArray, action.joinType]
      ]

      return newStateA

    case REMOVE_JOIN_ELEMENT:
      let newStateB = {...state}

      // newStateB[action.tableName].join = []
      newStateB[action.tableName].join = newStateB[
        action.tableName
      ].join.filter((join, index) => index !== action.joinId)

      return newStateB

    case SET_JOIN_COLUMN1_ELEMENT:
      let newStateC = {...state}

      newStateC[action.tableName].join[action.joinId] = [
        ...newStateC[action.tableName].join[action.joinId],
        action.joinArray
      ]

      return newStateC

    case SET_JOIN_COLUMN2_ELEMENT:
      let newStateD = {...state}

      newStateD[action.tableName].join[action.joinId] = [
        ...newStateD[action.tableName].join[action.joinId],
        action.joinArray
      ]

      return newStateD

    case REMOVE_COLUMN_ELEMENT:
      let newStateE = {...state}

      newStateE[action.tableName].join[action.joinId] = [
        ...newStateE[action.tableName].join[action.joinId].splice(
          action.index,
          1
        )
      ]

      return newStateE

    case CONFIRM_JOIN:
      let newStateF = {...state}

      newStateF[action.tableName].join[action.joinId] = [
        ...newStateF[action.tableName].join[action.joinId].splice(
          action.index,
          1
        )
      ]

      return newStateF

    default:
      return state
  }
}

export default query
