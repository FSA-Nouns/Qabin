import React, {Component, Fragment, useState} from 'react'
import {connect} from 'react-redux'
import TableExtract from './table-extract'
import {Grid, Card, List, ListItem, Typography, Button} from '@material-ui/core'
import ResultTabs from './query-results-middle-box'
import QueryTabs from './query-result-bottom-box'
import QueryDataVizSelection from './query-results-data-viz-selection'
import {makeStyles} from '@material-ui/core/styles'

export class QueryResult extends Component {
  constructor() {
    super()

    this.state = {
      dataVizStyle: 'table'
    }

    this.changeDataVizStyle = this.changeDataVizStyle.bind(this)
  }

  changeDataVizStyle(style) {
    this.setState({dataVizStyle: style})
  }

  render() {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12} sm={3}>
          <QueryDataVizSelection changeDataVizStyle={this.changeDataVizStyle} />
        </Grid>
        <Grid item direction="column" container sm={8} xs={12}>
          <NewQueryButton history={this.props.history}>
            New Selection
          </NewQueryButton>
          <Grid item>
            {this.props.resultTables.length ? (
              <ResultTabs
                dataVizStyle={this.state.dataVizStyle}
                resultTables={this.props.resultTables.filter(table =>
                  this.props.selectedTables.includes(Object.keys(table)[0])
                )}
              />
            ) : (
              <Typography variant="h3">No tables to display</Typography>
            )}
          </Grid>
          <Grid item>
            <QueryTabs
              resultTables={this.props.resultTables.filter(table =>
                this.props.selectedTables.includes(Object.keys(table)[0])
              )}
            />
          </Grid>
        </Grid>
        {/* </div> */}
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  resultTables: state.result,
  selectedTables: state.selectedTables
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(QueryResult)

function NewQueryButton(props) {
  const useStyles = makeStyles({
    root: {
      marginBottom: 8
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  })

  const classes = useStyles()

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => props.history.push('/queryBuilder')}
      className={classes.root}
    >
      {props.children}
    </Button>
  )
}

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
