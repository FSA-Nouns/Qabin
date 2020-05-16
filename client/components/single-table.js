import React from 'react'
import QueryRow from './query-row'
import QuerySort from './query-sort'
import DataTypeRow from './data-type-row'
import Join from './query-join'
import {useState} from 'react'
import AggregateSelector from './aggregate-selector'

let aggArr = ['AVG', 'SUM']

export default function SingleTable(props) {
  let tableDatas = props.tableDatas
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
        <tbody>
          {Object.keys(props.tableData.rows[0]).map((element, index) => {
            if (props.location.pathname === '/queryBuilder') {
              return (
                <QueryRow
                  tableName={props.tableName}
                  key={index}
                  field={element}
                  tableData={props.tableData}
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
          })}
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
