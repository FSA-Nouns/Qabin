import axios from 'axios'

const initialState = {
  filePaths: []
}

const SET_PATHS = 'SET_PATHS'

//ACTION CREATORS
const setPaths = paths => ({
  type: SET_PATHS,
  paths
})

//THUNKS
export const addFiles = files => {
  return async dispatch => {
    try {
      const res = await axios.post(`/api/upload`, files)
      const paths = res.data.filePaths
      dispatch(setPaths(paths))
    } catch (error) {
      console.log(error)
    }
  }
}

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PATHS:
      return {...state, filePaths: action.paths}
    default:
      return state
  }
}

export default fileReducer
