import React, {Component, Fragment, useState} from 'react'
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
              <Fragment key={index}>
                <ShowQuery
                  query={
                    table[Object.keys(this.props.resultTables[index])[0]].query
                  }
                />
                <TableExtract
                  tableData={table}
                  tableName={Object.keys(this.props.resultTables[index])}
                />
              </Fragment>
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

function ShowQuery(props) {
  const [showQuery, toggleShowQuery] = useState(false)

  return (
    <div className="show-query">
      <button
        onClick={() => toggleShowQuery(!showQuery)}
        className="show-query"
        type="button"
      >
        {showQuery ? 'Hide Query' : 'Show Query'}
      </button>
      {showQuery && (
        <p id="query" className="query-string">
          {props.query}
        </p>
      )}
    </div>
  )
}
