import React from 'react'
import QueryRow from './query-row'
import DataTypeRow from './data-type-row'
import Join from './query-join'
import {useState} from 'react'

export default function SingleTable(props) {
  let tableData = props.tableData[props.index]
  return (
    <div>
      <table className="single-table-view">
        <thead>
          <tr>
            <th>{props.tableName}</th>

            <td>
              {props.location.pathname === '/queryBuilder' ? (
                <Join data={props} />
              ) : (
                ''
              )}
            </td>
          </tr>
        </thead>

        <tbody>
          {Object.keys(tableData[props.tableName].rows[0]).map(
            (element, index) => {
              if (props.location.pathname === '/queryBuilder') {
                return (
                  <QueryRow
                    tableName={props.tableName}
                    key={index}
                    field={element}
                  />
                )
              } else {
                return (
                  <DataTypeRow
                    tableName={props.tableName}
                    key={index}
                    element={element}
                  />
                )
              }
            }
          )}
        </tbody>
      </table>
    </div>
  )
}

// function Join(props) {
//   const [addJoin, removeJoin] = useState(false)
//   return (
//     <div className="add-join">
//       <button
//         onClick={() => removeJoin(!addJoin)}
//         className="add-join"
//         type="button"
//       >
//         {addJoin ? 'Make Join' : 'Remove Join'}
//       </button>
//       {/* {addJoin && (
//         // <p id="join" className="join-string">
//         //   {props.join}
//         // </p>

//       )} */}
//       <button>Table link</button>
//       <p>YAY!</p>
//     </div>
//   )
// }
