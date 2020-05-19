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
    return (
      <Grid container direction="row">
        <Grid item align="left" sm={3}>
          <SimpleCard>
            <Button
              sm={2}
              bgcolor="primary"
              color="default"
              type="button"
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
              <Typography component="span" variant="h6">
                Step 2 - Specify Your Data Types
              </Typography>
              <Typography component="span" variant="body1" align="center">
                Here, you select from our five datatypes so I can interact with
                your data properly. If you don't know what a specific data type
                represents, hover over the text above each for a brief
                definition.
              </Typography>
            </Grid>
          </SimpleCard>
        </Grid>
        {this.props.tableData.length ? (
          <Grid item sm={8}>
            <Grid container direction="column" alignItems="flex-start">
              <TableData
                tableData={this.props.tableData}
                tableNames={this.props.files.tableNames}
                location={this.props.location}
              />
            </Grid>
          </Grid>
        ) : (
          // {/* <Grid className="table-extract-container">
          //   {this.props.tableData
          //     .filter(table => !table[Object.keys(table)[0]].old)
          //     .map((table, index) => (
          //       <Grid className="single-table-extract" key={index}>
          //         <TableExtract
          //           tableData={table}
          //           tableName={Object.keys(table)[0]}
          //           key={index}
          //         />
          //       </Grid>
          //     ))}
          // </Grid> */}
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
