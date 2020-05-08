import React from 'react'

export default function TableExtract(props) {
  console.log(props.tableData, 'this.tableData')

  console.log(props.tableNames, 'this.tableNames')
  return (
    <div>
      {/* {props.tableData.map(element => (
        <ul key={element.id}>
          <li>{element.first_Name}</li>
        </ul>
      ))} */}
    </div>
  )
}
