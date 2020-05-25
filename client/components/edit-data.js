import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotTables, addHeaderType} from '../store/editData'
import TableExtract from './table-extract'
import {makeStyles} from '@material-ui/core/styles'
import TableData from './table-data'
import {parseFilesWithDataType} from './../store/upload'
import {Grid, Button, Card, Typography} from '@material-ui/core'

// Function that returns boolean based on whether the fileName
// matches the table name and is contained in props.
const checkFileInFileNames = (tableName, fileNames, user) => {
  return fileNames.reduce((bool, file) => {
    let fileName = file.path.split('/') // to get the file name for the table name
    fileName = fileName[fileName.length - 1].split('.') //getting last leg of the path of the file name
    if (`user${user.id}_${fileName[0]}`.toLowerCase() === tableName) {
      bool = true
    }

    return bool
  }, false)
}

// Component dedicated to use selection of data types for newly uploaded table
export class EditData extends Component {
  // Obtain tables from Redux state on render
  componentDidMount() {
    this.props.gotTables(
      this.props.user.id,
      this.props.tableData,
      this.props.files
    )
  }

  render() {
    // Filtering out tables that were previously uploaded.
    const tables = this.props.tableData.filter(
      table => !table[Object.keys(table)[0]].old
    )
    return (
      <Grid container direction="row">
        <Grid item align="left" sm={3}>
          {/* 
            Card for submitting user-selected data-types and sending these 
            data-types to parsing function and putting parsed tables onto database.
            Also contains user guidelines.
          */}
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
                    table =>
                      !table[Object.keys(table)[0]].old &&
                      checkFileInFileNames(
                        Object.keys(table)[0],
                        this.props.files.fileNames,
                        this.props.user
                      )
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
        {/* 
          Ensuring error isn't throw while rendering before tableData is put on state.
          Section contains stateless TableData component that renders data-type
          selection rows.
         */}
        {this.props.tableData.length ? (
          <Grid item sm={9}>
            <Grid container direction="row" alignItems="flex-start">
              <Grid item xs={12} lg={12}>
                <TableData
                  tableData={this.props.tableData.filter(
                    table =>
                      !table[Object.keys(table)[0]].old &&
                      checkFileInFileNames(
                        Object.keys(table)[0],
                        this.props.files.fileNames,
                        this.props.user
                      )
                  )}
                  location={this.props.location}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                {/* Rendering table sample returned from parser. */}
                <TableExtract
                  tableData={this.props.tableData.filter(
                    table =>
                      !table[Object.keys(table)[0]].old &&
                      checkFileInFileNames(
                        Object.keys(table)[0],
                        this.props.files.fileNames,
                        this.props.user
                      )
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <div>No tables to display</div>
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
