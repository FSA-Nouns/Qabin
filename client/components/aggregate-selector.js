import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeFieldElement, addFieldElement} from '../store/query'

class AggregateSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      AVG: [],
      SUM: [],
      COUNT: [],
      MIN: [],
      MAX: []
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
      <div className="aggregate-selector">
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tableDataBAD: state.tableData
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
