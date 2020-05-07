import axios from 'axios'

const initialState = []

const SET_FILES = 'SET_FILES'

//ACTION CREATORS
const setFiles = files => ({
  type: SET_FILES,
  files
})

export const parseFiles = (files, user) => {
  return async dispatch => {
    try {
      let filePaths = files.map(file => file.path)

      const res = axios.post(`/api/parse/${user.id}`, {filepaths: filePaths})

      console.log('parsed', res.data)
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
      return action.files
    default:
      return state
  }
}

export default fileReducer
