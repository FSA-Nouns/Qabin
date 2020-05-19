import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotTables, addHeaderType} from '../store/editData'
import TableExtract from './table-extract'
import {makeStyles} from '@material-ui/core/styles'
import SingleTable from './single-table'
import TableData from './table-data'
import {parseFilesWithDataType} from './../store/upload'
import {Grid, Button, Card, Typography} from '@material-ui/core'

export class EditData extends Component {
  // constructor() {
  //     super()
  // }
  componentDidMount() {
    this.props.gotTables(
      this.props.user.id,
      this.props.tableData,
      this.props.files
    )
  }

  render() {
    const tables = this.props.tableData.filter(
      table => !table[Object.keys(table)[0]].old
    )
    return (
      <Grid container direction="row">
        <Grid item align="left" sm={3}>
          <SimpleCard>
            <Button
              variant="contained"
              sm={2}
              color="primary"
              type="button"
              disabled={
                tables.filter(
                  table =>
                    Object.keys(table[Object.keys(table)[0]].headers).length ===
                    Object.keys(table[Object.keys(table)[0]].rows[0]).length
                ).length !== tables.length
              }
              onClick={() =>
                this.props.parseTablesWithDataTypes(
                  this.props.user,
                  this.props.tableData.filter(
                    table => !table[Object.keys(table)[0]].old
                  )
                )
              }
            >
              Continue
            </Button>
            <Grid container direction="column">
              <Typography component="span" variant="h6" align="center">
                Step 2 - Specify Your Data Types
              </Typography>
              <Typography component="span" variant="body1" align="center">
                Here, you select from our five datatypes so I can interact with
                your data properly. If you don't know what a specific data type
                represents, hover over the text above each for a brief
                definition. If you need a reminder on what columns in your
                tables have which values, look to the table samples on the
                bottom of the page, which show the first two rows of data for
                each of your tables.
              </Typography>
            </Grid>
          </SimpleCard>
        </Grid>
        {this.props.tableData.length ? (
          <Grid item sm={9}>
            <Grid container direction="row" alignItems="flex-start">
              <Grid item xs={12} lg={12}>
                <TableData
                  tableData={this.props.tableData.filter(
                    table => !table[Object.keys(table)[0]].old
                  )}
                  location={this.props.location}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TableExtract
                  tableData={this.props.tableData.filter(
                    table => !table[Object.keys(table)[0]].old
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <p>No tables to display</p>
        )}
      </Grid>
    )
  }
}

function SimpleCard(props) {
  const useStyles = makeStyles({
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

  const classes = useStyles()

  return <Card className={classes.root}>{props.children}</Card>
}

const mapStateToProps = state => ({
  user: state.user,
  tableNames: state.files.tableNames,
  files: state.files,
  tableData: state.tableData
})

const mapDispatchToProps = dispatch => ({
  gotTables: (userId, tables, files) => {
    dispatch(gotTables(userId, tables, files))
  },
  addHeaderType: (header, type, table) =>
    dispatch(addHeaderType(header, type, table)),
  parseTablesWithDataTypes: (user, tableData) =>
    dispatch(parseFilesWithDataType(user, tableData))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditData)
