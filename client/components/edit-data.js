import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotTables} from '../store/editData'
import TableExtract from './table-extract'
import SingleTable from './single-table'
import {parseFilesWithDataType} from './../store/upload'

export class EditData extends Component {
  // constructor() {
  //     super()
  // }
  componentDidMount() {
    this.props.gotTables(
      this.props.user.id,
      this.props.tableNames,
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
              this.props.tableData
            )
          }
        >
          Continue
        </button>
        {this.props.tableData.length ? (
          <div>
            <div className="big-container">
              {this.props.tableData.map((table, index) => (
                <div className="single-table" key={index}>
                  <SingleTable
                    tableData={table[Object.keys(table)[0]]}
                    index={index}
                    tableName={this.props.tableNames[index]}
                    key={index}
                    location={this.props.location}
                  />
                </div>
              ))}
            </div>
            <div className="table-extract-container">
              {this.props.tableData.map((table, index) => (
                <div className="single-table-extract" key={index}>
                  <TableExtract
                    tableData={table}
                    tableName={this.props.tableNames[index]}
                    key={index}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No tables to display</p>
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
