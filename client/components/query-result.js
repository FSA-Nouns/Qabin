import React, {Component, Fragment, useState} from 'react'
import {connect} from 'react-redux'
import TableExtract from './table-extract'
import {Grid, Card, List, ListItem, Typography, Button} from '@material-ui/core'
import ResultTabs from './query-results-middle-box'
import QueryTabs from './query-result-bottom-box'

export class QueryResult extends Component {
  render() {
    return (
      <Grid container>
        {/* <div className="table-extract-container"> */}
        <Grid item direction="column" container sm={8} xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.props.history.push('/queryBuilder')}
          >
            New Selection
          </Button>
          <Grid item>
            {this.props.resultTables.length ? (
              <ResultTabs resultTables={this.props.resultTables} />
            ) : (
              <Typography variant="h3">No tables to display</Typography>
            )}
          </Grid>
          <Grid item>
            <QueryTabs resultTables={this.props.resultTables} />
          </Grid>
        </Grid>
        {/* </div> */}
      </Grid>
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
