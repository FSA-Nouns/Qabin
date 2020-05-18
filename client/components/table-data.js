import React from 'react'
import DataTypeRow from './data-type-row'

export default function TableData(props) {
  return (
    <div>
      <table className="single-table-view">
        <thead>
          <tr>
            <th>{props.tableName.slice(props.tableName.indexOf('_') + 1)}</th>
          </tr>
        </thead>
        <tbody className="query-table">
          {Object.keys(props.tableData.rows[0]).map((element, index) => {
            return (
              <DataTypeRow
                tableName={props.tableName}
                key={index}
                element={element}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
