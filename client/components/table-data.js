import React from 'react'
import QueryRow from './query-row'
import QuerySort from './query-sort'
import DataTypeRow from './data-type-row'
import Join from './query-join'
import {useState} from 'react'
import AggregateSelector from './aggregate-selector'

export default function TableData(props) {
  return (
    <div>
      <table className="single-table-view">
        <thead>
          <tr>
            <th>{props.tableName.slice(props.tableName.indexOf('_') + 1)}</th>

            <td>
              {props.location.pathname === '/queryBuilder' ? (
                <Join data={props} index={0} />
              ) : (
                ''
              )}
            </td>
            <td>
              {props.location.pathname === '/queryBuilder' ? (
                <Join data={props} index={1} />
              ) : (
                ''
              )}
            </td>
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
