import React, {Component} from 'react'
import {connect} from 'react-redux'
import {limitTo, reset, clearlimitTo} from '../store/query'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import DeleteIcon from '@material-ui/icons/Delete'
import CancelIcon from '@material-ui/icons/Cancel'
// import CloseIcon from '@material-ui/icons/Close';

import {
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Select,
  Typography
} from '@material-ui/core'

import CloseIcon from '@material-ui/icons/Close'

class QueryLimit extends Component {
  constructor() {
    super()
    this.state = {
      limit: ''
    }
    this.setLimit = this.setLimit.bind(this)
    this.resetQuery = this.resetQuery.bind(this)
    this.clearlimit = this.clearlimit.bind(this)
  }

  setLimit(ev) {
    ev.preventDefault()
    this.props.limitTo(this.props.tableName, ev.target.limit.value)
    this.setState({limit: ev.target.limit.value})
  }

  clearlimit(tableName) {
    this.props.clearlimitTo(tableName)
    this.setState({limit: ''})
  }
  resetQuery(ev) {
    ev.preventDefault()
    this.props.reset(this.props.tableName)
  }

  render() {
    return (
      <Grid
        container
        item
        direction="row"
        justify="space-between"
        alignItems="center"
        wrap="nowrap"
      >
        <Grid container direction="row" item xs={4}>
          <form onSubmit={this.setLimit}>
            <FormControl row>
              <InputLabel htmlFor={this.props.tableName}>Limit</InputLabel>
              <Input name="limit" id={this.props.tableName} />
              <br />
              <Button
                variant={this.state.limit !== '' ? 'outlined' : 'contained'}
                color={this.state.limit !== '' ? 'secondary' : 'primary'}
                size="small"
                type="submit"
              >
                {this.state.limit !== '' ? 'Limit Set' : 'Set Limit'}
              </Button>
            </FormControl>
          </form>
        </Grid>

        {this.state.limit ? (
          <Grid
            item
            container
            direction
            row
            alignItems="center"
            justify="flex-end"
            xs={5}
          >
            <Typography variant="body2">Limit: {this.state.limit}</Typography>
            <IconButton
              onClick={() => this.clearlimit(this.props.tableName)}
              color="alert"
              aria-label="clear limit"
            >
              {/* <CloseIcon /> */}
              <CancelIcon />
            </IconButton>
          </Grid>
        ) : (
          ''
        )}

        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          item
          xs={3}
        >
          <Grid item>
            <IconButton aria-label="reset" onClick={this.resetQuery}>
              <AutorenewIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  queryBundle: state.queryBundle
})

const mapDispatchToProps = dispatch => {
  return {
    limitTo: (tableName, limit) => dispatch(limitTo(tableName, limit)),
    reset: tableName => dispatch(reset(tableName)),
    clearlimitTo: tableName => dispatch(clearlimitTo(tableName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryLimit)
