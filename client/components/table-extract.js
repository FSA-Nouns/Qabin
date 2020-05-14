import React from 'react'

export default function TableExtract(props) {
  return (
    <div>
      <h2>{props.tableName}</h2>
      <table className="table-Extract">
        <thead>
          <tr>
            {Object.keys(props.tableData[props.tableName].rows[0]).map(
              (column, index) => <th key={index}>{column}</th>
            )}
          </tr>
        </thead>

        <tbody>
          {props.tableData[props.tableName].rows.map((rows, index) => {
            let data = props.tableData[props.tableName].rows[index]
            let values = Object.values(rows)
            return (
              <tr key={index}>
                {values.map((element, indexA) => {
                  return <td key={indexA}>{element}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
