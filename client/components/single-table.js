import React from 'react'

export default function SingleTable(props) {
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
          {Object.keys(props.tableData[props.tableName].rows[0]).map(
            (element, index) => (
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
          )}
        </tbody>
      </table>
    </div>
  )
}
