import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotTables} from '../store/editData'
import TableExtract from './table-extract'

import SingleTable from './single-table'
import TableData from './table-data'
import {parseFilesWithDataType} from './../store/upload'

export class EditData extends Component {
  // constructor() {
  //     super()
  // }
  componentDidMount() {
    this.props.gotTables(
      this.props.user.id,
      this.props.tableData,
      this.props.files
    )
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() =>
            this.props.parseTablesWithDataTypes(
              this.props.user,
              this.props.tableData.filter(
                table => !table[Object.keys(table)[0]].old
              )
            )
          }
        >
          Continue
        </button>
        {this.props.tableData.length ? (
          <div>
            <div className="big-container">
              {this.props.tableData
                .filter(table => !table[Object.keys(table)[0]].old)
                .map((table, index) => (
                  <div className="single-table" key={index}>
                    <TableData
                      tableData={table[Object.keys(table)[0]]}
                      index={index}
                      tableName={Object.keys(table)[0]}
                      key={index}
                      location={this.props.location}
                    />
                  </div>
                ))}
            </div>
            <div className="table-extract-container">
              {this.props.tableData
                .filter(table => !table[Object.keys(table)[0]].old)
                .map((table, index) => (
                  <div className="single-table-extract" key={index}>
                    <TableExtract
                      tableData={table}
                      tableName={Object.keys(table)[0]}
                      key={index}
                    />
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div>No tables to display</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  tableNames: state.files.tableNames,
  files: state.files,
  tableData: state.tableData
})

const mapDispatchToProps = dispatch => ({
  gotTables: (userId, tables, files) => {
    dispatch(gotTables(userId, tables, files))
  },
  parseTablesWithDataTypes: (user, tableData) =>
    dispatch(parseFilesWithDataType(user, tableData))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditData)
