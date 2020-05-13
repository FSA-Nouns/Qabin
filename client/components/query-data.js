import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotTables} from '../store/editData'
import SingleTable from './single-table'
import {submitQuery} from '../store/result'

export class QueryData extends Component {
  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() =>
            this.props.submitQuery(this.props.queryBundle, this.props.user)
          }
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
  result: state.result,
  files: state.files
})

const mapDispatchToProps = dispatch => ({
  submitQuery: (query, user) => dispatch(submitQuery(query, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(QueryData)
