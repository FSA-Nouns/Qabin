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
      let filePaths = files.files.map(file => file.path)

      const res = await axios.post(`/api/parse/${user.id}`, {
        filepaths: filePaths
      })

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
      const res = await axios.post('/api/upload', files, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
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
      return {...state, files: action.files}
    case SET_TABLES:
      return {...state, tables: action.tables}
    default:
      return state
  }
}

export default fileReducer
