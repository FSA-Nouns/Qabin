import React from 'react'
import QueryRow from './query-row'
import QuerySort from './query-sort'
import DataTypeRow from './data-type-row'
import Join from './query-join'
import {useState} from 'react'
import AggregateSelector from './aggregate-selector'

let aggArr = ['AVG', 'SUM']

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
                    tableData={props.tableData[props.tableName]}
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
        <div>
          <div>
            <AggregateSelector
              index={props.index}
              tableData={props.tableData}
              tableName={props.tableName}
            />
          </div>
          <QuerySort tableName={props.tableName} />
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}
