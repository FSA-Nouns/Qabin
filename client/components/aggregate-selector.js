import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeFieldElement, addFieldElement} from '../store/query'
import {Chip, Grid} from '@material-ui/core'

class AggregateSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      AVG: [],
      SUM: [],
      COUNT: [],
      MIN: [],
      MAX: [],
      aggregates: ['AVG', 'SUM', 'COUNT', 'MIN', 'MAX']
    }
    this.toggleAgg = this.toggleAgg.bind(this)
  }

  toggleAgg(evt) {
    evt.preventDefault()
    let aggType = evt.target.agg.value
    let column = evt.target.selector.value

    let q = `${aggType}(${column})`
    Object.keys(this.state).forEach(agg => {
      if (aggType === agg && !this.state[agg].includes(column)) {
        let newState = [...this.state[agg], column]
        this.setState({[agg]: newState})
        this.props.addFieldElement(this.props.tableName, q)
      } else if (aggType === agg && this.state[agg].includes(column)) {
        let newState = this.state[agg].filter(col => col !== column)
        this.setState({[agg]: newState})
        this.props.removeFieldElement(this.props.tableName, q)
      }
    })
  }

  render() {
    let numericFields = Object.keys(this.props.tableData.headers).filter(
      field => {
        if (
          this.props.tableData.headers[field] === 'int' ||
          this.props.tableData.headers[field] === 'float'
        )
          return true
      }
    )
    numericFields.push('*')
    return (
      <Grid container item direction="column">
        <Grid
          container
          item
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <form className="avg-filter-form" onSubmit={this.toggleAgg}>
              <button className="agg" type="submit" name="agg" value="AVG">
                AVG
              </button>
              <select name="selector">
                {numericFields.map((field, index) => (
                  <option key={index} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </form>
          </Grid>
          <Grid item>
            <form className="sum-filter-form" onSubmit={this.toggleAgg}>
              <button className="agg" type="submit" name="agg" value="SUM">
                SUM
              </button>
              <select name="selector">
                {numericFields.map((field, index) => (
                  <option key={index} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </form>
          </Grid>
          <Grid item>
            <form className="count-filter-form" onSubmit={this.toggleAgg}>
              <button className="agg" type="submit" name="agg" value="COUNT">
                COUNT
              </button>
              <select name="selector">
                {numericFields.map((field, index) => (
                  <option key={index} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </form>
          </Grid>
          <Grid item>
            <form className="min-filter-form" onSubmit={this.toggleAgg}>
              <button className="agg" type="submit" name="agg" value="MIN">
                MIN
              </button>
              <select name="selector">
                {numericFields.map((field, index) => (
                  <option key={index} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </form>
          </Grid>
          <Grid item>
            <form className="max-filter-form" onSubmit={this.toggleAgg}>
              <button className="agg" type="submit" name="agg" value="MAX">
                MAX
              </button>
              <select name="selector">
                {numericFields.map((field, index) => (
                  <option key={index} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </form>
          </Grid>
        </Grid>
        <Grid
          container
          item
          direction="row"
          justify="space-evenly"
          alignItems="flex-end"
          spacing={3}
        >
          {this.props.queryBundle[this.props.tableName].fields ? (
            this.props.queryBundle[this.props.tableName].fields.map(field => {
              if (this.state.aggregates.includes(field.split('(')[0]))
                return (
                  <Grid item key={field}>
                    <Chip
                      name="selected"
                      size="small"
                      value={field}
                      label={`${field.split('(')[0]} of ${
                        field.split('(')[1].split(')')[0]
                      }`}
                      onDelete={() =>
                        this.props.removeFieldElement(
                          this.props.tableName,
                          `${field.split('(')[0]}(${
                            field.split('(')[1].split(')')[0]
                          })`
                        )
                      }
                    />
                  </Grid>
                )
            })
          ) : (
            <Chip label="failed" />
          )}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  tableDataBAD: state.tableData,
  queryBundle: state.queryBundle
})

const mapDispatchToProps = dispatch => {
  return {
    addFieldElement: (tableName, field) =>
      dispatch(addFieldElement(tableName, field)),
    removeFieldElement: (tableName, field) =>
      dispatch(removeFieldElement(tableName, field))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AggregateSelector)
