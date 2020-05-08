import React from 'react'
import QueryRow from './query-row'

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
                  <tr key={index}>
                    <td>{element}</td>
                    <td>
                      <select className="dropdown">
                        <option value="integer">Integer</option>
                        <option value="float">Float</option>
                        <option value="string">String</option>
                        <option value="text">Text</option>
                        <option value="boolean">Boolean</option>
                        <option value="date">Date</option>
                      </select>
                    </td>
                  </tr>
                )
              }
            }
          )}
        </tbody>
      </table>
    </div>
  )
}
