import React, {Component, Fragment, useState} from 'react'
import {connect} from 'react-redux'
import TableExtract from './table-extract'
export class QueryResult extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.history.push('/queryBuilder')}>
          New Query
        </button>
        <div className="table-extract-container">
          {this.props.resultTables.length ? (
            this.props.resultTables.map((table, index) => (
              <Fragment key={index}>
                <ShowQuery
                  query={
                    table[Object.keys(this.props.resultTables[index])[0]].query
                  }
                />
                {table[Object.keys(this.props.resultTables[index])[0]].rows
                  .length ? (
                  <TableExtract
                    tableData={table}
                    tableName={Object.keys(this.props.resultTables[index])}
                  />
                ) : (
                  <p>No Results</p>
                )}
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
