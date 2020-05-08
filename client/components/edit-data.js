import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {gotTables} from '../store/editData'
import TableExtract from './table-extract'

export class EditData extends Component {
  // constructor() {
  //     super()
  // }
  componentDidMount() {
    this.props.gotTables(this.props.user.id, this.props.tableNames)
  }

  render() {
    return (
      <div>
        <div className="big-container">
          <div className="border" />
        </div>
        <div className="table-extract-container">
          {this.props.tableData.length ? (
            this.props.tableData.map((element, index) => (
              <TableExtract
                tableData={element}
                tableName={this.props.tableNames[index]}
                key={index}
              />
            ))
          ) : (
            <p>No tables to display</p>
          )}
          {/* <TableExtract tableData={this.props.tableData[0]} /> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  tableNames: state.files.tables,
  tableData: state.tableData
})

const mapDispatchToProps = dispatch => ({
  gotTables: (userId, tables) => {
    dispatch(gotTables(userId, tables))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditData)
