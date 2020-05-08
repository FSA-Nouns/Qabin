import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  removeFieldElement,
  addFieldElement,
  addFilterElement
} from '../store/query'

let options = []

export class QueryRow extends Component {
  constructor() {
    super()
    this.state = {
      checked: false
    }
    this.filterElement = this.filterElement.bind(this)
    this.toggleField = this.toggleField.bind(this)
  }

  filterElement(event) {
    event.preventDefault()
    let filterArray = [
      this.props.field,
      event.operator.value,
      event.target.value
    ]
    this.props.addFilterElement(this.props.tableName, filterArray)
  }

  toggleField(ev) {
    if (this.state.checked == false) {
      this.setState({checked: true})
      this.props.addFieldElement(this.props.tableName, this.props.field)
    } else {
      this.setState({checked: false})
      this.props.removeFieldElement(this.props.tableName, this.props.field)
    }
  }

  render() {
    return (
      <tr className="query-row">
        <td>
          <input
            name={this.props.field}
            type="checkbox"
            onChange={toggleField}
          />
        </td>
        <td>
          <span>{this.props.field}</span>
        </td>
        <td>
          <button
            className="filter-toggle"
            onClick={e => e.target.focus()}
            type="button"
          >
            Filter
          </button>{' '}
          <form className="filter-form" onSubmit={this.filterElement}>
            <select name="operator">
              <option>{`>`}></option>
              <option value="LIKE">equal to</option>
              <option value=">">greater than</option>
              <option value=">=">at least</option>
              <option value="<">less than</option>
              <option value="<=">at most</option>
            </select>
            <input name="condition" />
            <button type="Submit">Ok</button>
          </form>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return {
    addFilterElement: (tableName, filterArray) =>
      dispatch(addFilterElement(tableName, filterArray)),
    addFieldElement: (tableName, field) =>
      dispatch(addFieldElement(tableName, field)),
    removeFieldElement: (tableName, field) =>
      dispatch(removeFieldElement(tableName, field))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryRow)
