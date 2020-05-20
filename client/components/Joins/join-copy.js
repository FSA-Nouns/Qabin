import React from 'react'
import {connect} from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Grid, Typography, Button} from '@material-ui/core'
import JoinSteps from './join-steps'
import Join from './query-join'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
import DownArrow from '@material-ui/icons/ArrowDownward'
import LeftArrow from '@material-ui/icons/ArrowBack'
import RightArrow from '@material-ui/icons/ArrowForward'
import UpArrow from '@material-ui/icons/ArrowUpward'

let joinCounter = [1]
class JoinCopy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      clear: false,
      scroll: 'paper',
      joinCount: joinCounter.length,
      descriptionElementRef: null
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

  handleClickOpen() {
    this.setState({open: true})
    // this.setState({join: true})
  }

  handleClose() {
    // this.props.removeJoinElement(this.props.data.tableName, this.props.index)
    this.setState({open: false, clear: false})
    // this.setState({join: false})
  }

  handleSave() {
    this.setState({open: false})
  }

  handleClear() {
    this.setState({clear: true})
  }

  handleAddJoin() {
    // joinCounter.push(1)
    // this.setState({joinCount: joinCounter.length})
  }

  handleRemoveJoin() {
    // joinCounter.pop()
    // this.setState({joinCount: joinCounter.length})
  }

  render() {
    return (
      <div>
        <Button
          onClick={() => this.handleClickOpen()}
          variant="contained"
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
            <Typography variant="h4">
              Lets make your data tables talk to each other!
            </Typography>
          </DialogTitle>

          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={this.descriptionElementRef}
              tabIndex={-1}
            >
              <Grid container spacing={4}>
                <Grid item xs={false} sm={4}>
                  <JoinSteps />
                </Grid>

                <Grid item xs={false} sm={8}>
                  <Typography variant="h5">
                    Lets learn some more about your data
                  </Typography>

                  {joinCounter.map((join, index) => (
                    <Grid item md={6} key={index}>
                      <Join
                        data={this.props.data}
                        index={index}
                        clear={this.state.clear}
                      />
                      {/* {console.log(
                      'this.state.clear sent as props for index 0',
                      this.state.clear
                    )} */}
                    </Grid>
                  ))}
                  {/* )) */}

                  {/* <Grid item sm={8}>
                    <img
                      width="200"
                      height="200"
                      //   src="/root/Senior/Capstone/client/components/Joins/graphics/Join-types.png"
                    />
                  </Grid> */}

                  {this.props.index >= 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleAddJoin()}
                    >
                      Need a more complex mojo? Connect more fields!
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" disabled>
                      Need a more complex mojo? Connect more fields!
                    </Button>
                  )}

                  {this.state.joinCount > 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleRemoveJoin()}
                    >
                      Remove last connection.
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" disabled>
                      Remove last connection.
                    </Button>
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

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return {
    // addJoinElement: (tableName, joinArray, joinType, joinId) =>
    //   dispatch(addJoinElement(tableName, joinArray, joinType, joinId)),
    // removeJoinElement: (tableName, joinId) =>
    //   dispatch(removeJoinElement(tableName, joinId)),
    // setJoinColumnElement: (tableName, joinArray, index, joinId) =>
    //   dispatch(setJoinColumnElement(tableName, joinArray, index, joinId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinCopy)
