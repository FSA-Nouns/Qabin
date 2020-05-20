import React, {Component} from 'react'
import {connect} from 'react-redux'
import {groupBy} from '../store/query'

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid
} from '@material-ui/core'

class GroupBy extends Component {
  constructor() {
    super()
    this.state = {
      groupByArray: []
    }
    this.toggleGroupBy = this.toggleGroupBy.bind(this)
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
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  queryBundle: state.queryBundle
})

const mapDispatchToProps = dispatch => {
  return {
    groupBy: (tableName, groupByArray) =>
      dispatch(groupBy(tableName, groupByArray))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupBy)
