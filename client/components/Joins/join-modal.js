import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Grid, Typography, Button, AppBar} from '@material-ui/core'
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

let joinCounter = [0]

class JoinCopy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      clear: false,
      scroll: 'paper',
      joinCount: joinCounter.length,
      descriptionElementRef: null,
      join: false,
      top: false,
      left: false,
      bottom: false,
      right: false
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
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
    setState({...state, [anchor]: open})
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
    joinCounter.map((join, index) => {
      this.props.removeJoinTable(this.props.data.tableName, 0, index)
    })
    joinCounter = [0]
    this.setState({join: false})
  }

  handleAddJoin(event) {
    event.preventDefault()
    let joinArray = event.target.value
    this.props.addJoinTable(
      this.props.data.tableName,
      joinArray,
      0,
      this.props.index + joinCounter.length
    )
    let nextNum = joinCounter.length
    joinCounter.push(nextNum + 1)
    // this.setState({joinCount: joinCounter.length})
  }

  // handleRemoveJoin() {
  //   let joinId = this.joinCount - 1
  //   joinCounter.pop()
  //   this.props.removeJoinTable(this.props.data.tableName, 0, joinId)
  //   this.setState({joinCount: joinCounter.length})
  // }

  render() {
    console.log(this.props, 'this.props in ')
    return (
      <div>
        <Button
          onClick={() => this.handleClickOpen()}
          variant={this.state.join ? 'contained' : 'outlined'}
          color={this.state.join ? 'secondary' : 'secondary'}
        >
          {this.state.join === true ? 'Connected data' : 'Connect data'}
        </Button>

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
                  <Typography variant="h5">
                    Lets make your data tables talk to each other! <JoinSteps />
                  </Typography>
                  {/* </Grid>
              <Grid item> */}
                </Grid>
              </Grid>
            </DialogTitle>
          </JoinHeader>

          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={this.descriptionElementRef}
              tabIndex={-1}
            >
              <Grid
                container
                // spacing={4}
              >
                <Grid item xs={false} sm={12}>
                  <Typography variant="h6">
                    Lets learn some more about your data.
                  </Typography>

                  <Typography variant="body1">
                    What other data table would you like to get data from?
                  </Typography>

                  {joinCounter.map((join, index) => (
                    <Grid item md={12} key={index}>
                      <Join
                        data={this.props.data}
                        index={index}
                        clear={this.state.clear}
                      />
                    </Grid>
                  ))}

                  <Grid item padding="50px">
                    Need a more complex mojo?{' '}
                  </Grid>

                  <Typography variant="h2" margin="50px" />
                  {this.props.index >= 0 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      margin="100px"
                      onClick={event => this.handleAddJoin(event)}
                    >
                      Connect more data!
                    </Button>
                  ) : (
                    <Fragment>
                      <Typography variant="h2" />
                      <Button variant="contained" color="primary" disabled>
                        Connect more data!
                      </Button>
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
                </Grid>
              </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(JoinCopy)

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
