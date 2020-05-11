import React, {Component} from 'react'
import {connect} from 'react-redux'
import TableExtract from './table-extract'

export class QueryResult extends Component {
  render() {
    console.log(
      this.props.resultTables.length
        ? Object.keys(this.props.resultTables[0])
        : ''
    )
    return (
      <div>
        <div className="table-extract-container">
          {this.props.resultTables.length ? (
            this.props.resultTables.map((table, index) => (
              <TableExtract
                tableData={table}
                tableName={Object.keys(this.props.resultTables[index])}
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
  resultTables: state.result
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(QueryResult)
