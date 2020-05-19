import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotTables} from '../store/editData'
import SingleTable from './single-table'
import {submitQuery} from '../store/result'
import {setTables} from '../store/upload'

import {Button, Grid} from '@material-ui/core'

export class QueryData extends Component {
  componentDidMount() {
    this.props.setTables(this.props.tableNames)
  }

  render() {
    return (
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <Button
          type="button"
          onClick={() => {
            this.props.submitQuery(this.props.queryBundle, this.props.user)
          }}
        >
          Query
        </Button>
        {this.props.tableData.map((table, index) => {
          return (
            <Grid
              key={index}
              item
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item>
                <SingleTable
                  tableData={table[Object.keys(table)[0]]}
                  tableDatas={this.props.tableData}
                  index={index}
                  tableName={Object.keys(table)[0]}
                  index={index}
                  location={this.props.location}
                  // allTables={this.props}
                />
              </Grid>
            </Grid>
          )
        })}
      </Grid>
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
