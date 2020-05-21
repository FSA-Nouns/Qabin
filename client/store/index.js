import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import files from './upload'
import selectedTables from './selectedTables'
import tableData from './editData'
import query from './query'
import resultQueryReducer from './result'

const reducer = combineReducers({
  user,
  files,
  tableData,
  queryBundle: query,
  result: resultQueryReducer,
  selectedTables
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
