import axios from 'axios'
import history from '../history'

const initialState = {
  fileNames: [],
  tableNames: []
}

const SET_FILE_NAMES = 'SET_FILE_NAMES'
const SET_TABLE_NAMES = 'SET_TABLE_NAMES'
const DELETED_TABLE = 'DELETED_TABLE'

//ACTION CREATORS
const setFiles = fileNames => ({
  type: SET_FILE_NAMES,
  fileNames
})

export const setTables = tableNames => ({
  type: SET_TABLE_NAMES,
  tableNames
})

//THUNKS
export const addFiles = (fileNames, user) => {
  return async dispatch => {
    try {
      const res = await axios.post(`/api/upload/${user.id}`, fileNames, {
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

export const parseFilesWithDataType = (user, tableData) => {
  return async dispatch => {
    try {
      const res = await axios.post(`/api/parse/${user.id}/parse`, {
        tableData
      })

      history.push('/queryBuilder')
    } catch (error) {
      console.log(error)
    }
  }
}

export const parseFiles = (files, user) => {
  return async dispatch => {
    try {
      let filePaths = files.fileNames.map(file => {
        return file.path
      })
      console.log(filePaths, 'filepatsh')
      const res = await axios.post(`/api/parse/${user.id}`, {
        filepaths: filePaths
      })
      dispatch(setTables(res.data.nameArr))
      history.push('editData')
    } catch (error) {
      console.log(error)
    }
  }
}

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETED_TABLE:
      return {
        ...state,
        tableNames: state.tableNames.filter(tab => tab !== action.table)
      }
    case SET_FILE_NAMES:
      return {...state, fileNames: action.fileNames}

    case SET_TABLE_NAMES:
      return {
        ...state,
        tableNames: [...state.tableNames, ...action.tableNames].reduce(
          (uniques, tableName) => {
            if (!uniques.includes(tableName)) {
              uniques.push(tableName)
            }
            return uniques
          },
          []
        )
      }
    default:
      return state
  }
}

export default fileReducer
