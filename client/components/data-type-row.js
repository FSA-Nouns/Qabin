import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addHeaderType} from '../store/editData'

export const DataTypeRow = props => {
  return (
    <tr>
      <td>{props.element}</td>
      <td>
        <select
          onChange={e =>
            props.addHeaderType(props.element, e.target.value, props.tableName)
          }
          className="dropdown"
        >
          <option value="">Choose Type</option>
          <option value="integer">Integer</option>
          <option value="double precision">Float</option>
          <option value="text">Text</option>
          <option value="boolean">Boolean</option>
          <option value="date">Date</option>
        </select>
      </td>
    </tr>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return {
    addHeaderType: (header, type, table) =>
      dispatch(addHeaderType(header, type, table))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTypeRow)
