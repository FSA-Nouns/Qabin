import React, {Component} from 'react'
import {connect} from 'react-redux'

export const DataTypeRow = props => {
  return (
    <tr>
      <td>{props.element}</td>
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

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DataTypeRow)
