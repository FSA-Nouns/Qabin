import React, {Component} from 'react'
import {connect} from 'react-redux'
import {orderBy} from '../store/query'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  Select,
  Grid
} from '@material-ui/core'

import {makeStyles} from '@material-ui/styles'

class OrderBy extends Component {
  constructor() {
    super()
    this.state = {
      orderByArray: []
    }
    this.toggleOrderBy = this.toggleOrderBy.bind(this)
    this.toggleDirection = this.toggleDirection.bind(this)
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
    this.setState({orderByArray: modified, direction: ev.target.value})
    this.props.orderBy(this.props.tableName, modified)
  }

  render() {
    return (
      // <Grid
      //   container
      //   direction="column"
      //   justify="space-evenly"
      //   alignItems="flex-start"
      //   spacing={3}
      // >
      //   <Grid item>
      <FormControlColumn>
        <FormLabel>Order By</FormLabel>
        <FormGroup>
          {this.props.queryBundle[this.props.tableName].fields.map(selected => (
            <div key={selected} className="order-by">
              <Grid
                container
                justify="space-between"
                alignItems="center"
                wrap="nowrap"
              >
                <FormControlLabel
                  control={
                    <Checkbox onChange={this.toggleOrderBy} value={selected} />
                  }
                  label={selected}
                />

                <InputLabel id="label" />

                <Select
                  labelId="label"
                  id="select"
                  onChange={ev => this.toggleDirection(ev, selected)}
                >
                  <option value="ASC">asc</option>
                  <option value="DESC">desc</option>
                </Select>
              </Grid>
            </div>
          ))}
        </FormGroup>
      </FormControlColumn>
    )
  }
}

const FormControlColumn = props => {
  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexFlow: 'column'
    }
  }))

  const classes = useStyles()

  return <FormControl classNames={classes.root}>{props.children}</FormControl>
}

const mapStateToProps = state => ({
  queryBundle: state.queryBundle
})

const mapDispatchToProps = dispatch => {
  return {
    orderBy: (tableName, orderByArray) =>
      dispatch(orderBy(tableName, orderByArray))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBy)
