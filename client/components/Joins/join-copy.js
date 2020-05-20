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

class JoinCopy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      clear: false,
      scroll: 'paper',
      descriptionElementRef: null
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    // this.handleSave = this.handleSave.bind(this)
    this.handleClear = this.handleClear.bind(this)
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

  //   handleSave() {
  //     this.setState({open: false})
  //   }

  handleClear() {
    this.setState({clear: true})
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
            <Typography>Lets connect data from other tables</Typography>
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
                {console.log(`${__dirname}`, 'DIRECTORYYYYYYYYY')}

                <Grid item>
                  <Grid item sm={8}>
                    <img
                      width="200"
                      height="200"
                      //   src="/root/Senior/Capstone/client/components/Joins/graphics/Join-types.png"
                    />
                  </Grid>

                  <Grid item md={8}>
                    <Join
                      data={this.props.data}
                      index={0}
                      clear={this.state.clear}
                    />
                    {console.log(
                      'this.state.clear sent as props for index 0',
                      this.state.clear
                    )}
                  </Grid>

                  <Grid item md={8}>
                    <Join
                      data={this.props.data}
                      index={1}
                      clear={this.state.clear}
                    />
                    {console.log(
                      'this.state.clear sent as props for index 1',
                      this.state.clear
                    )}
                  </Grid>
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
