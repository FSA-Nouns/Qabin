import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotTables} from '../store/editData'
import SingleTable from './single-table'
import {submitQuery} from '../store/result'
import {setTables} from '../store/upload'

export class QueryData extends Component {
  componentDidMount() {
    this.props.setTables(this.props.tableNames)
  }

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
        {console.log('IN QUERY_DATA', this.props)}
        {this.props.tableData.map((table, index) => {
          console.log(table[Object.keys(table)[0]])
          return (
            <div className="single-table" key={index}>
              <SingleTable
                tableData={table[Object.keys(table)[0]]}
                tableDatas={this.props.tableData}
                index={index}
                tableName={this.props.tableNames[index]}
                index={index}
                location={this.props.location}
                // allTables={this.props}
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
  submitQuery: (query, user) => dispatch(submitQuery(query, user)),
  setTables: tableNames => dispatch(setTables(tableNames))
})

export default connect(mapStateToProps, mapDispatchToProps)(QueryData)
