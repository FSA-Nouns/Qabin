import React from 'react'

export default function AllTableView(props) {
  console.log(props.tableData, 'this.tableData as received in AllTableView')
  // console.log(props.tableData.rows, 'this.tableData.rows as received in TableExtract')
  console.log(props.tableName, 'this.tableNames as received in AllTableView')
  // const {data} = props.tableData
  // console.log(data, 'DATAAAAAAAAAA')
  return (
    <div>
      <table className="single-table-view">
        <thead>
          <tr>
            <th>{props.tableName}</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(props.tableData[props.tableName].rows[0]).map((h, i) => (
            <tr key={i}>{h}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
