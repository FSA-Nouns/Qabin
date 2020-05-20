const SELECT_TABLE = 'SELECT_TABLE'
const UNSELECT_TABLE = 'UNSELECT_TABLE'

export const selectTable = table => ({
  type: SELECT_TABLE,
  table
})

export const unselectTable = table => ({
  type: UNSELECT_TABLE,
  table
})

const initialState = []

const selectedTables = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TABLE:
      return [...state, action.table]
    case UNSELECT_TABLE:
      return state.filter(tableName => tableName !== action.table)
    default:
      return state
  }
}

export default selectedTables
