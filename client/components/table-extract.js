import React from 'react'

export default function TableExtract(props) {
  return (
    <div>
      <h2>{props.tableName}</h2>
      <table className="table-Extract">
        <thead>
          <tr>
            {Object.keys(props.tableData[props.tableName].rows[0]).map(
              (h, i) => <th key={i}>{h}</th>
            )}
          </tr>
        </thead>

        <tbody>
          {props.tableData[props.tableName].rows.map((k, i) => {
            let data = props.tableData[props.tableName].rows[i]
            let values = Object.values(k)
            return (
              <tr key={i}>
                {values.map((el, index) => {
                  return <td key={index}>{el}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
