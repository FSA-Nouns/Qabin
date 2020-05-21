import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Grid, Typography, Button} from '@material-ui/core'
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

let joinCounter = [1]
class JoinCopy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      clear: false,
      scroll: 'paper',
      joinCount: joinCounter.length,
      descriptionElementRef: null,
      top: false,
      left: false,
      bottom: false,
      right: false
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleAddJoin = this.handleAddJoin.bind(this)
    this.handleRemoveJoin = this.handleRemoveJoin.bind(this)
  }

  componentDidMount() {
    if (this.state.open) {
      let {current: descriptionElement} = this.state.descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
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
    this.setState({open: true})
    // this.setState({join: true})
  }

  handleClose() {
    this.props.removeJoinTable(this.props.data.tableName, 0, this.props.index)
    // this.setState({open: false
    //   , clear: false
    // })
    // this.setState({join: false})
    this.setState({open: false})
  }

  handleSave() {
    this.setState({open: false})
  }

  handleClear() {
    joinCounter.map((join, index) => {
      this.props.removeJoinTable(this.props.data.tableName, 0, index)
    })

    this.setState({clear: true})
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
    joinCounter.push(1)
    // this.setState({joinCount: joinCounter.length})
  }

  handleRemoveJoin() {
    // joinCounter.pop()
    // this.setState({joinCount: joinCounter.length})
  }

  render() {
    console.log(this.props, 'this.props')
    return (
      <div>
        <Button
          onClick={() => this.handleClickOpen()}
          // variant="contained"
          variant="outlined"
          color="primary"
        >
          Join Data Tables
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullWidth
        >
          <DialogTitle id="scroll-dialog-title">
            <Typography variant="h5">
              Lets make your data tables talk to each other!
            </Typography>
          </DialogTitle>

          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={this.descriptionElementRef}
              tabIndex={-1}
            >
              <JoinSteps />
              <Grid
                container
                // spacing={4}
              >
                <Grid item xs={false} sm={12}>
                  <Typography variant="h5">
                    Lets learn some more about your data.
                  </Typography>

                  <Typography variant="body1">
                    What other data table would you like to get data from?
                  </Typography>

                  {joinCounter.map((join, index) => (
                    <Grid item md={6} key={index}>
                      <Join
                        data={this.props.data}
                        index={index}
                        clear={this.state.clear}
                      />
                    </Grid>
                  ))}

                  <Grid item padding="50px">
                    {' '}
                    Need a more complex mojo?{' '}
                  </Grid>

                  <Typography variant="h2" margin="50px">
                    {' '}
                  </Typography>
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

                  {/* <Grid item md={8}>
                    <Join
                      data={this.props.data}
                      index={0}
                      clear={this.state.clear}
                    />
                    {/* {console.log(
                      'this.state.clear sent as props for index 0',
                      this.state.clear
                    )} */}
                  {/* </Grid> */}

                  {/* <Grid item md={8}>
                    <Join
                      data={this.props.data}
                      index={1}
                      clear={this.state.clear}
                    />
                    {console.log(
                      'this.state.clear sent as props for index 1',
                      this.state.clear
                    )}
                  </Grid> */}
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClear} color="primary">
              Clear
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
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
    // setJoinColumnElement: (tableName, joinArray, index, joinId) =>
    //   dispatch(setJoinColumnElement(tableName, joinArray, index, joinId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinCopy)
