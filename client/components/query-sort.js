import React, {Component} from 'react'
import {connect} from 'react-redux'
import {orderBy, groupBy, limitTo} from '../store/query'
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
  Select,
  TextField
} from '@material-ui/core'

class QuerySort extends Component {
  constructor() {
    super()
    this.state = {
      groupByArray: [],
      orderByArray: []
    }
    this.toggleGroupBy = this.toggleGroupBy.bind(this)
    this.toggleOrderBy = this.toggleOrderBy.bind(this)
    this.toggleDirection = this.toggleDirection.bind(this)
    this.setLimit = this.setLimit.bind(this)
  }

  toggleGroupBy(ev) {
    let modified = []
    if (this.state.groupByArray.includes(ev.target.value)) {
      modified = this.state.groupByArray.filter(
        field => field !== ev.target.value
      )
      if (this.state.groupByArray) {
        this.setState({groupByArray: modified})
      }
    } else {
      modified = [ev.target.value, ...this.state.groupByArray]
      this.setState({groupByArray: modified})
    }
    this.props.groupBy(this.props.tableName, modified)
  }

  //this needs to be re-worked to preserve order
  toggleOrderBy(ev) {
    let modified = this.state.orderByArray
    let order = this.state.orderByArray.map(x => Object.keys(x)[0])

    if (order.includes(ev.target.value)) {
      modified = this.state.orderByArray.filter(
        obj => Object.keys(obj)[0] !== ev.target.value
      )
      this.setState({orderByArray: modified})
    } else {
      modified.push({[ev.target.value]: 'ASC'})
      this.setState({orderByArray: modified})
    }
    this.props.orderBy(this.props.tableName, modified)
  }

  toggleDirection(ev, field) {
    let modified = this.state.orderByArray

    modified = modified.map(header => {
      if (Object.keys(header)[0] === field) {
        return {[field]: ev.target.value}
      }

      return header
    })

    this.setState({orderByArray: modified})
    this.props.orderBy(this.props.tableName, modified)
  }

  setLimit(ev) {
    ev.preventDefault()
    this.props.limitTo(this.props.tableName, ev.target.value)
  }

  render() {
    return (
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item>
          <FormControl>
            <FormLabel>Group By</FormLabel>
            <FormGroup row>
              {this.props.queryBundle[this.props.tableName].fields.map(
                selected => (
                  <FormControlLabel
                    key={selected}
                    control={
                      <Checkbox
                        onChange={this.toggleGroupBy}
                        value={selected}
                      />
                    }
                    label={selected}
                  />
                )
              )}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Order By</FormLabel>
            <FormGroup row>
              {this.props.queryBundle[this.props.tableName].fields.map(
                selected => (
                  <div key={selected} className="order-by">
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.toggleOrderBy}
                          value={selected}
                        />
                      }
                      label={selected}
                    />
                    <InputLabel id="label" />
                    <Select
                      labelId="label"
                      id="select"
                      name="direction"
                      onChange={ev => this.toggleDirection(ev, selected)}
                    >
                      <option value="ASC">Direction</option>
                      <option value="ASC">ascending</option>
                      <option value="ASC">alphabetical</option>
                      <option value="DESC">descending</option>
                      <option value="DESC">reverse aplh.</option>
                    </Select>
                  </div>
                )
              )}
            </FormGroup>
          </FormControl>
        </Grid>
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
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  queryBundle: state.queryBundle
})

const mapDispatchToProps = dispatch => {
  return {
    orderBy: (tableName, orderByArray) =>
      dispatch(orderBy(tableName, orderByArray)),
    groupBy: (tableName, groupByArray) =>
      dispatch(groupBy(tableName, groupByArray)),
    limitTo: (tableName, limit) => dispatch(limitTo(tableName, limit))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuerySort)
