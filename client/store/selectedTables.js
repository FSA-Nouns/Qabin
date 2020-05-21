const SELECT_TABLE = 'SELECT_TABLE'
const UNSELECT_TABLE = 'UNSELECT_TABLE'
const CLEAR_SELECTED = 'CLEAR_SELECTED'

export const selectTable = table => ({
  type: SELECT_TABLE,
  table
})

export const unselectTable = table => ({
  type: UNSELECT_TABLE,
  table
})

export const clearAllSelected = () => ({
  type: CLEAR_SELECTED
})

const initialState = []

const selectedTables = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TABLE:
      return [...state, action.table]
    case UNSELECT_TABLE:
      return state.filter(tableName => tableName !== action.table)
    case CLEAR_SELECTED:
      return initialState
    default:
      return state
  }
}

export default selectedTables
