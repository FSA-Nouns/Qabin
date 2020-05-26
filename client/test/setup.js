import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import Enzyme from 'enzyme'
import Adapter, {shallow} from 'enzyme-adapter-react-16'
import {
  table,
  tables,
  tableNames,
  queryResultTables,
  mockResDataObj,
  fileNames,
  filePaths,
  newFileNames
} from './testData.js'

/**
 * The enzyme adapter "adapts" its functions to the specific version of React
 * you are using (in our current case, react 16). This is necessary as breaking
 * changes in React's internal implementations (which enzyme utilizes) may be
 * introduced with each major version.
 */
Enzyme.configure({adapter: new Adapter()})

const mock = new AxiosMockAdapter(axios)
const user = {id: 1}
const userId = 1

/*editData.js getTables thunk. Sends userId, files and filenames; 
received tables (result of cvs parsing)
*/
mock.onGet(`/api/parse/${userId}/${newFileNames}`).reply(201, tables)

/* 
results.js submitQuery thunk. Sends userId and querybundle object, 
receives results of SQL query
*/
mock.onPut(`/api/queries/${user.id}/query`).reply(201, queryResultTables)

/* 
tables.js getUserTables and deleteUserTable thunks. 
getUserTables pulls userTableDatas and userTablesNames off res.data
*/
mock.onGet(`/api/tables/${user.id}`).reply(201, mockResDataObj)
mock.onGet(`/api/tables/${user.id}/delete/${table}`).reply(201)

/*
upload.js addFiles and parseFiles thunks. 

addFiles pulls a data object off res.data. The data object 
is an array of objects, each being a key value pair in the format {name: filename, path: filepath}
*/
mock
  .onPost(`/api/upload/${user.id}`, fileNames, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .reply(201, mockResDataObj)
// parseFiles pulls an array of table names off res.data
mock
  .onPost(`/api/parse/${user.id}`, {
    filepaths: filePaths
  })
  .reply(201, mockResDataObj)
