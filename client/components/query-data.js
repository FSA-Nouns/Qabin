import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotTables} from '../store/editData'
import SingleTable from './single-table'
import {submitQuery} from '../store/result'
import {clearAllSelected} from '../store/selectedTables'
import {setTables} from '../store/upload'
import TableSelection from './table-selection'

import Bouncer from 'react-data-bouncer'
import {unselectAll} from '../store/query'

import {Button, Grid, Card, Typography, Box} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {getUserTables} from '../store/tables'

function SimpleCard(props) {
  const useStyles1 = makeStyles({
    root: {
      margin: 15,
      padding: 15
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  })

  const classes = useStyles1()

  return <Card className={classes.root}>{props.children}</Card>
}

const SubmitButton = props => {
  const useStyles = makeStyles(() => ({
    root: {
      height: 45
    }
  }))

  const classes = useStyles()

  return (
    <Box paddingLeft="15px" paddingRight="15px" height="45px">
      <Button
        fullWidth
        className={classes.root}
        type="button"
        disabled={props.selectedTables && !props.selectedTables.length}
        variant="contained"
        color="secondary"
        onClick={() => {
          props.submitQuery(props.queryBundle, props.user)
        }}
      >
        Submit Selection
      </Button>
    </Box>
  )
}

export class QueryData extends Component {
  constructor() {
    super()
    this.state = {
      aggSelect: false,
      groupSelect: false,
      bothSelect: false
    }
  }

  componentDidMount() {
    if (this.props.tableName) {
      this.props.setTables(this.props.tableNames)
    } else {
      this.props.getUserTables(this.props.user)
    }

    this.props.tableNames.forEach(table => this.props.unselectAll(table))
    this.props.clearTables()
  }

  render() {
    return (
      <Bouncer>
        <Grid container direction="row">
          <Grid item align="left" sm={3}>
            <Grid container direction="column">
              <SubmitButton
                selectedTables={this.props.selectedTables}
                submitQuery={this.props.submitQuery}
                queryBundle={this.props.queryBundle}
                user={this.props.user}
              />
              <Grid item>
                <SimpleCard>
                  <Grid container direction="column">
                    <Grid container direction="column">
                      <Typography component="span" variant="h6" align="center">
                        Step 3 - Select Your Data
                      </Typography>
                      <Typography
                        component="span"
                        variant="body1"
                        align="center"
                      >
                        Here, you must specify what data you want to grab from
                        your uploaded files, and what operations you might want
                        to perform on that data. To filter on what data you
                        display, choose from one of your filter options and
                        write the number of text you wish to filter by.
                        Additionally, use the Aggregate Analysis section of the
                        page to perform operations on columns of data.
                      </Typography>
                    </Grid>
                  </Grid>
                </SimpleCard>
              </Grid>
              <Grid item>
                <TableSelection />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={9}>
            {this.props.selectedTables.length > 0 ? (
              this.props.selectedTables.map((table, index) => {
                let tableIndex = this.props.files.tableNames.indexOf(table)
                let singleTableData = this.props.tableData[tableIndex]
                return (
                  <Grid
                    key={index}
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    width="100%"
                    spacing={2}
                  >
                    <SingleTable
                      tableData={singleTableData[table]}
                      tableDatas={this.props.tableData}
                      index={index}
                      tableName={Object.keys(singleTableData)[0]}
                      location={this.props.location}
                    />
                  </Grid>
                )
              })
            ) : (
              <Grid
                item
                container
                justify="center"
                alignItems="center"
                height="100%"
              >
                <Typography
                  item
                  component="span"
                  variant="h2"
                  align="center"
                  fontWeight="fontWeightBold"
                >
                  No Tables Selected
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Bouncer>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  tableNames: state.files.tableNames,
  tableData: state.tableData,
  queryBundle: state.queryBundle,
  result: state.result,
  files: state.files,
  selectedTables: state.selectedTables
})

const mapDispatchToProps = dispatch => ({
  submitQuery: (query, user) => dispatch(submitQuery(query, user)),
  setTables: tableNames => dispatch(setTables(tableNames)),
  clearTables: () => dispatch(clearAllSelected()),
  unselectAll: tableName => dispatch(unselectAll(tableName)),
  getUserTables: user => dispatch(getUserTables(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(QueryData)
