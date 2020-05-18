import React, {Component} from 'react'
import {connect} from 'react-redux'
import {limitTo} from '../store/query'
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
  }

  setLimit(ev) {
    ev.preventDefault()
    this.props.limitTo(this.props.tableName, ev.target.value)
  }

  render() {
    return (
      <Grid
        container
        item
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item />
        <form onSubmit={this.setLimit}>
          <FormControl>
            <InputLabel htmlFor="my-input">Limit</InputLabel>
            <Input id="my-input" />
            <Button variant="outlined" size="small" type="submit">
              Submit
            </Button>
          </FormControl>
        </form>
        <Grid item>
          <IconButton aria-label="reset">
            <AutorenewIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton aria-label="delete">
            <DeleteIcon fontSize="large" />
          </IconButton>
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
    limitTo: (tableName, limit) => dispatch(limitTo(tableName, limit))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryLimit)
