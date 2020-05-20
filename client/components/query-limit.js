import React, {Component} from 'react'
import {connect} from 'react-redux'
import {limitTo, reset} from '../store/query'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import DeleteIcon from '@material-ui/icons/Delete'

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Select
} from '@material-ui/core'

class QueryLimit extends Component {
  constructor() {
    super()
    this.setLimit = this.setLimit.bind(this)
    this.resetQuery = this.resetQuery.bind(this)
  }

  setLimit(ev) {
    ev.preventDefault()
    this.props.limitTo(this.props.tableName, ev.target.value)
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
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          item
          xs={6}
        >
          <form onSubmit={this.setLimit}>
            <FormControl>
              <Grid item xs={6}>
                <InputLabel htmlFor={this.props.tableName}>Limit</InputLabel>
                <Input id={this.props.tableName} />
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" size="small" type="submit">
                  Submit
                </Button>
              </Grid>
            </FormControl>
          </form>
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          item
          xs={6}
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
    reset: tableName => dispatch(reset(tableName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryLimit)
