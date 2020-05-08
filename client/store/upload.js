import axios from 'axios'

const initialState = {
  files: [],
  tables: []
}

const SET_FILES = 'SET_FILES'
const SET_TABLES = 'SET_TABLES'

//ACTION CREATORS
const setFiles = files => ({
  type: SET_FILES,
  files
})

const setTables = tables => ({
  type: SET_TABLES,
  tables
})

export const parseFiles = (files, user) => {
  return async dispatch => {
    try {
      console.log('files of file.files.map', files)
      let filePaths = files.files.map(file => file.path)

      const res = await axios.post(`/api/parse/${user.id}`, {
        filepaths: filePaths
      })
      console.log(
        'res from the post route after parsing then sent into setTables inside parseFiles Thunk',
        res
      )
      dispatch(setTables(res.data.nameArr))
    } catch (error) {
      console.log(error)
    }
  }
}

//THUNKS
export const addFiles = files => {
  return async dispatch => {
    try {
      console.log('files as req.body in addFiles thunk', files)
      const res = await axios.post('/api/upload', files, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('res from axios.post in addFiles Thunk', res)
      const uploadedFiles = res.data.data
      dispatch(setFiles(uploadedFiles))
    } catch (error) {
      console.log(error)
    }
  }
}

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILES:
      console.log('state in file reducer in SET_FILES', state)
      console.log('action in file reducer in SET_FILES', action)
      return {...state, files: action.files}
    case SET_TABLES:
      console.log('state in file reducer in SET_TABLES', state)
      console.log('action in file reducer in SET_TABLES', action)
      return {...state, tables: action.tables}
    default:
      return state
  }
}

export default fileReducer
