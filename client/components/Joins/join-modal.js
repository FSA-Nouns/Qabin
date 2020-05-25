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
import {white} from '@material-ui/core/colors'
import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
import DownArrow from '@material-ui/icons/ArrowDownward'
import LeftArrow from '@material-ui/icons/ArrowBack'
import RightArrow from '@material-ui/icons/ArrowForward'
import UpArrow from '@material-ui/icons/ArrowUpward'
import {removeJoinTable, addJoinTable} from '../../store/query'

export const CompletingPreviousJoinHint = [
  'Please select a valid option for each connection before adding more connections.'
]
let joinCounter = [0],
  joinCount = 0,
  display,
  table,
  joins

class JoinWindow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      clear: false,
      scroll: 'paper',
      // joinCount: joinCounter.length,
      descriptionElementRef: null,
      join: false
      // top: false,
      // left: false,
      // bottom: false,
      // right: false
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleReset = this.handleReset(this)
    // this.handleSave = this.handleSave.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleAddJoin = this.handleAddJoin.bind(this)
    // this.handleRemoveJoin = this.handleRemoveJoin.bind(this)
  }

  componentDidMount() {
    if (this.state.open) {
      let {current: descriptionElement} = this.state.descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
    // console.log("this.props.queryBundle", this.props.queryBundle)
    // console.log("this.props", this.props.queryBundle)
  }

  toggleDrawer(anchor, open) {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    this.setState({...state, [anchor]: open})
  }

  handleClickOpen() {
    this.setState({open: true, join: true})
    // this.setState({join: true})
  }

  handleClose() {
    // this.props.removeJoinTable(this.props.data.tableName, 0, this.props.index)
    this.setState({open: false})
  }

  // handleSave() {
  //   this.setState({open: false})
  // }

  handleClear() {
    //clears all the information from joins array in store
    joins.map((join, index) => {
      this.props.removeJoinTable(this.props.data.tableName, 0, index)
    })
    joinCounter = [0]
    this.props.removeJoinTable(this.props.data.tableName, 0, 0)
    this.setState({join: false})
    this.setState({clear: true})
  }

  handleReset() {
    this.setState({clear: false})
  }

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
    // increment the Join counter array to account for newly initiated join
    joinCounter = [...joinCounter, 0](console.log(joinCounter, 'joinCounter'))
  }

  // handleRemoveJoin() {
  //   let joinId = this.joinCount - 1
  //   joinCounter.pop()
  //   this.props.removeJoinTable(this.props.data.tableName, 0, joinId)
  //   this.setState({joinCount: joinCounter.length})
  // }

  // eslint-disable-next-line complexity
  render() {
    console.log(this.props, 'this.props in ')
    table = this.props.data.tableName
    joins = this.props.queryBundle[table].join
    console.log(joins, 'JOINS')
    joins.length === 0 ? (display = joinCounter) : (display = joins)
    console.log(display, 'DISPLAY')
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

              {/*Renders all elements of a join mapping over the JoinCounter array incremented everytime a new join is initiated */}

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
                    // clear={this.state.clear}
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
                    {console.log('JOIN[0]arrayin map', join[0])}
                    {console.log('JOIN[1]arrayin map', join[1])}
                    {console.log('JOIN[2]arrayin map', join[2])}
                    {console.log('JOIN[3]arrayin map', join[3])}
                    <Join
                      data={this.props.data}
                      index={index}
                      table1={table}
                      table2={join[0] === undefined ? '' : join[0]}
                      joinType={join[1] === undefined ? '' : join[1]}
                      column1={join[2] === undefined ? '' : join[2]}
                      column2={join[3] === undefined ? '' : join[3]}
                      // clear={this.state.clear}
                    />
                  </Grid>
                ))
              )}

              {/*Displays option to add more joins once all the elements of a previous join are selected*/}
              {joins.length > 0 ? (
                <Fragment>
                  <Grid item padding="50px">
                    Need a more complex mojo?
                  </Grid>
                  {/*Initiates an empty join element connected to the main table*/}
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
                  {/* <Tooltip
                    m={0}
                    p={0}
                    item
                    xs={1}
                    title={CompletingPreviousJoinHint[0]}
                    arrow
                  > */}
                  <Button variant="contained" color="primary" disabled>
                    Connect more data!
                  </Button>
                  {/* </Tooltip> */}
                </Fragment>
              )}

              {/* {this.state.joinCount > 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      padding="100px"
                      margin="100px"
                      onClick={() => this.handleRemoveJoin}
                    >
                      Remove last connection!
                    </Button>
                  ) : (
                    <Fragment>
                      <Typography variant="h2" />
                      <Button variant="contained" color="secondary"
                      onClick={() => this.handleRemoveJoin}
                      >
                      Remove last connection!
                      </Button>
                    </Fragment>
                  )} */}
              {/* </Grid>
              </Grid> */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClear} color="primary">
              Clear
            </Button>
            {/* <Button onClick={this.handleSave} color="primary">
              Save
            </Button> */}
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
