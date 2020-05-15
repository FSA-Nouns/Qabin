import React from 'react'
import QueryRow from './query-row'
import QuerySort from './query-sort'
import DataTypeRow from './data-type-row'

export default function SingleTable(props) {
  return (
    <div>
      <table className="single-table-view">
        <thead>
          <tr>
            <th>{props.tableName}</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(props.tableData[props.tableName].rows[0]).map(
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
      {props.location.pathname === '/queryBuilder' ? (
        <QuerySort tableName={props.tableName} />
      ) : (
        <div />
      )}
    </div>
  )
}
