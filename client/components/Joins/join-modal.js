import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Grid, Typography, Button, AppBar, Tooltip} from '@material-ui/core'
import JoinSteps from './join-steps'
import Join from './query-join'
import {makeStyles} from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
import {removeJoinTable, addJoinTable} from '../../store/query'

export const CompletingPreviousJoinHint = [
  'Please select a valid option for each connection before adding more connections.'
]

export const AddingMoreJoinHint = [
  "Doing so will connect your selections to the 'resultant data' from the last connection."
]
let joinCounter = [0],
  joinCount = [],
  display,
  table,
  joins

// JoinWindow class provides a window pop-up to guide user
// through the table-joining process.
class JoinWindow extends React.Component {
  // State contains the following properties:
  // open - boolean - true if pop-up window is open, false otherwise
  // clear - boolean - true if all join data has been cleared by the user; set
  // to false upon user adding a table to join
  // scroll - string - used to identify scroll type for Dialog box
  // descriptionElementRef - string - ref for descriptionElement
  // join - boolean - true if JoinWindow comp. is open and stays true if user submits a join
  // to query, otherwise, it is false
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      clear: false,
      scroll: 'paper',
      descriptionElementRef: null,
      join: false
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleReset = this.handleReset(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleAddJoin = this.handleAddJoin.bind(this)
  }

  // Upon component render,
  componentDidMount() {
    if (this.state.open) {
      let {current: descriptionElement} = this.state.descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }

  // Upon opening component, we set open and join properties to true
  handleClickOpen() {
    this.setState({open: true, join: true})
  }

  // Upon closing window, clears all the incomplete joins started by the user upon exiting
  handleClose() {
    joinCount = []
    joins.map((join, index) => {
      Array.isArray(join) &&
        join.map(element => (element === '' ? joinCount.push(index) : false))
    })
    joinCount.map(
      joinId =>
        joins[joinId]
          ? this.props.removeJoinTable(this.props.data.tableName, 0, joinId)
          : ''
    )
    table = this.props.data.tableName
    joins = this.props.queryBundle[table].join(
      joins.length === 0
        ? this.setState({join: false, open: false})
        : this.setState({open: false})
    )
  }

  // Upon clear button clikc, we clear all the information from joins array in store
  // and set join prop. on state to false and clear prop. on state to true
  handleClear() {
    joins.map((join, index) => {
      this.props.removeJoinTable(this.props.data.tableName, 0, index)
    })
    joinCounter = [0]
    this.props.removeJoinTable(this.props.data.tableName, 0, 0)
    this.setState({join: false})
    this.setState({clear: true})
  }

  // On reset button click, we set clear prop. on state too false
  handleReset() {
    this.setState({clear: false})
  }

  // Upon submitting a new join, this function sets the clear prop. on state
  // to false. Then, we add the joining table to the Redux store and
  // increment the Join counter array to account for newly initiated join.
  handleAddJoin(event) {
    event.preventDefault()
    this.setState({clear: false})
    let joinArray = event.target.value
    this.props.addJoinTable(
      this.props.data.tableName,
      joinArray,
      0,
      joinCounter.length
    )
    joinCounter = [...joinCounter, 0]
  }

  render() {
    table = this.props.data.tableName
    joins = this.props.queryBundle[table].join
    joins.length === 0 ? (display = joinCounter) : (display = joins)
    return (
      <div>
        {/*Visible on query page (via Single-table) to enter the Joins Modal*/}
        <Button
          onClick={() => this.handleClickOpen()}
          variant={this.state.join ? 'text' : 'outlined'}
          color="secondary"
        >
          {this.state.join === true ? 'Connected data' : 'Connect data'}
        </Button>

        {/*Joins Dialog Box*/}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullWidth
        >
          <JoinHeader>
            <DialogTitle id="scroll-dialog-title">
              <Grid>
                <Grid item>
                  <Typography variant="h4">
                    Connect your Data! <JoinSteps />
                  </Typography>
                </Grid>
              </Grid>
            </DialogTitle>
          </JoinHeader>

          <DialogContent
            dividers={scroll === 'paper'}
            style={{padding: '10px'}}
          >
            <DialogContentText
              id="scroll-dialog-description"
              ref={this.descriptionElementRef}
              tabIndex={-1}
            >
              <Grid item xs={false} sm={12}>
                <Typography variant="h5" style={{padding: '10px'}}>
                  Lets learn some more about your data.
                </Typography>
              </Grid>

              {/*Renders all elements of a join mapping over the joins array in queryBundle incremented everytime a new join is initiated */}

              {this.state.clear ? (
                <Grid item md={12}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{padding: '10px'}}
                  >
                    What other data table would you like to get data from?
                  </Typography>
                  <Join
                    data={this.props.data}
                    index={0}
                    table1={table}
                    table2=""
                    joinType=""
                    column1=""
                    column2=""
                  />
                </Grid>
              ) : (
                display.map((join, index) => (
                  <Grid item md={12} key={index}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      style={{padding: '10px'}}
                    >
                      What other data table would you like to get data from?
                    </Typography>
                    <Join
                      data={this.props.data}
                      index={index}
                      table1={table}
                      table2={join[0] === undefined ? '' : join[0]}
                      joinType={join[1] === undefined ? '' : join[1]}
                      column1={join[2] === undefined ? '' : join[2]}
                      column2={join[3] === undefined ? '' : join[3]}
                    />
                  </Grid>
                ))
              )}

              <Divider style={{margin: '10px', height: '2px'}} />

              {/*Displays option to add more joins once all the elements of a previous join are selected and initiates an empty join*/}
              {joins.length > 0 ? (
                <Fragment>
                  <Grid item style={{margin: '10px'}}>
                    Need a more complex mojo?
                    <Tooltip
                      m={0}
                      p={0}
                      item
                      xs={1}
                      title={AddingMoreJoinHint[0]}
                      arrow
                    >
                      <HelpIcon fontSize="small" />
                    </Tooltip>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    margin="100px"
                    onClick={event => this.handleAddJoin(event)}
                  >
                    Connect more data!
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  <Grid item style={{margin: '10px'}}>
                    Need a more complex mojo?
                    <Tooltip
                      m={0}
                      p={0}
                      item
                      xs={1}
                      title={CompletingPreviousJoinHint[0]}
                      arrow
                    >
                      <HelpIcon fontSize="small" />
                    </Tooltip>
                  </Grid>
                  <Button variant="contained" color="primary" disabled>
                    Connect more data!
                  </Button>
                </Fragment>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClear} color="primary">
              Clear
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  queryBundle: state.queryBundle
})

const mapDispatchToProps = dispatch => {
  return {
    addJoinTable: (tableName, joinArray, index, joinId) =>
      dispatch(addJoinTable(tableName, joinArray, index, joinId)),
    removeJoinTable: (tableName, index, joinId) =>
      dispatch(removeJoinTable(tableName, index, joinId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinWindow)

// JoinHeader component styles
function JoinHeader(props) {
  const useStyles = makeStyles({
    root: {
      width: '100%',
      height: 50,
      paddingLeft: 15,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    title: {
      fontSize: 16
    },
    pos: {
      marginBottom: 12
    }
  })

  const classes = useStyles()

  return (
    <AppBar className={classes.root} position="static">
      {props.children}
    </AppBar>
  )
}
