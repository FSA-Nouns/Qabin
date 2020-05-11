import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {gotTables} from '../store/editData'
import TableExtract from './table-extract'
import QueryRow from './query-row'
import SingleTable from './single-table'
import {submitQuery} from '../store/result'

export class QueryData extends Component {
  componentDidMount() {
    this.props.gotTables(this.props.user.id, this.props.tableNames)
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() => this.props.submitQuery(this.props.queryBundle)}
        >
          Query
        </button>
        {this.props.tableData.map((table, index) => {
          return (
            <div className="single-table" key={index}>
              <SingleTable
                tableData={table}
                tableName={this.props.tableNames[index]}
                key={index}
                location={this.props.location}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  tableNames: state.files.tableNames,
  tableData: state.tableData,
  queryBundle: state.queryBundle,
  result: state.result
})

const mapDispatchToProps = dispatch => ({
  gotTables: (userId, tables) => {
    dispatch(gotTables(userId, tables))
  },
  submitQuery: query => dispatch(submitQuery(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(QueryData)
