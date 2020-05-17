import React, {Component, Fragment, useState} from 'react'
import {connect} from 'react-redux'
import TableExtract from './table-extract'
import {Grid, Card, List, ListItem, Typography, Button} from '@material-ui/core'
import ResultTabs from './query-results-middle-box'

export class QueryResult extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.history.push('/queryBuilder')}>
          New Query
        </button>
        <div className="table-extract-container">
          {this.props.resultTables.length ? (
            <ResultTabs resultTables={this.props.resultTables} />
          ) : (
            <Typography variant="h3">No tables to display</Typography>
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
