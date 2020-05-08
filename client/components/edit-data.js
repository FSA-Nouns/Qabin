import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {gotTables} from '../store/editData'
import TableExtract from './table-extract'
import SingleTable from './single-table'

export class EditData extends Component {
  // constructor() {
  //     super()
  // }
  async componentDidMount() {
    console.log(
      'this.props.tableName in componentdidMount for EditData then sent to gotTables thunk',
      this.props.tableNames
    )
    await this.props.gotTables(this.props.user.id, this.props.tableNames)
    console.log(
      'this.props.tableData in componentdidMount for EditData after running gotTables thunk',
      this.props.tableData
    )
  }

  render() {
    console.log('this.props in render of editData', this.props)
    console.log(
      'this.props.tableData.name in render of editData',
      this.props.tableData.name
    )
    return (
      <div>
        <div className="big-container">
          <div>
            {this.props.tableData.length ? (
              this.props.tableData.map((table, index) => (
                <div className="single-table" key={index}>
                  <SingleTable
                    tableData={table}
                    tableName={this.props.tableNames[index]}
                    key={index}
                  />
                </div>
              ))
            ) : (
              <p>No tables to display</p>
            )}
          </div>
        </div>
        <div className="table-extract-container">
          {this.props.tableData.length ? (
            this.props.tableData.map((table, index) => (
              <TableExtract
                tableData={table}
                tableName={this.props.tableNames[index]}
                key={index}
              />
            ))
          ) : (
            <p>No tables to display</p>
          )}
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
  gotTables: async (userId, tables) => {
    await dispatch(gotTables(userId, tables))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditData)
