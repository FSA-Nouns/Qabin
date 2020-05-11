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
  componentDidMount() {
    this.props.gotTables(this.props.user.id, this.props.tableNames)
  }

  render() {
    console.log('this.props', this.props)
    return (
      <div>
        <button onClick={() => this.props.history.push('/queryBuilder')}>
          Continue
        </button>
        <div className="big-container">
          <div>
            {this.props.tableData.length ? (
              this.props.tableData.map((table, index) => (
                <div className="single-table" key={index}>
                  <SingleTable
                    tableData={table}
                    tableName={this.props.tableNames[index]}
                    key={index}
                    location={this.props.location}
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
  tableNames: state.files.tableNames,
  tableData: state.tableData
})

const mapDispatchToProps = dispatch => ({
  gotTables: (userId, tables) => {
    dispatch(gotTables(userId, tables))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditData)
