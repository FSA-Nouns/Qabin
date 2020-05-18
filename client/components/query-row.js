import React, {Component, useState, Fragment} from 'react'
import {connect} from 'react-redux'
import {
  removeFieldElement,
  addFieldElement,
  addFilterElement
} from '../store/query'
import {Grid, Checkbox, FormControlLabel} from '@material-ui/core'

const getOperator = operator => {
  if (
    operator === 'contains' ||
    operator === 'starts-with' ||
    operator === 'ends-with'
  ) {
    return 'LIKE'
  } else if (operator === 'IS NOT NULL') {
    return ''
  } else {
    return operator
  }
}

const getDateValue = (year, month, day, operator) => {
  if (operator === 'IS NOT NULL') {
    return 'IS NOT NULL'
  }
  return `${year}-${month}-${day}`
}

const getValue = (operator, value) => {
  if (operator === 'contains') {
    return `%${value}%`
  } else if (operator === 'starts-with') {
    return `${value}%`
  } else if (operator === 'ends-with') {
    return `%${value}`
  } else if (operator === 'IS NOT NULL') {
    return 'IS NOT NULL'
  } else {
    return value
  }
}

class QueryRow extends Component {
  constructor() {
    super()
    this.state = {
      checked: false
    }
    this.filterElement = this.filterElement.bind(this)
    this.toggleField = this.toggleField.bind(this)
  }

  // eslint-disable-next-line complexity
  filterElement(event) {
    event.preventDefault()
    let operator = getOperator(event.target.operator.value)

    //if field is a data, build the data string, if its not, get the value of the field, changing accordingly to operator
    let value =
      this.props.tableData.headers[this.props.field] !== 'date'
        ? getValue(event.target.operator.value, event.target.condition.value)
        : getDateValue(
            event.target.year.value,
            event.target.month.value,
            event.target.day.value,
            event.target.operator.value
          )

    let filterArray = [
      this.props.tableData.headers[this.props.field] === 'date'
        ? `trunc(${this.props.field})`
        : this.props.field,
      operator,
      value
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
      <Grid container>
        <tr className="query-row">
          {/* <Grid item>
            <td>
              <span>{this.props.field}</span>
            </td>
          </Grid> */}
          <Grid item>
            <td>
              {/* <input
                name={this.props.field}
                type="checkbox"
                onChange={this.toggleField}
              /> */}
              <FormControlLabel
                control={<Checkbox onChange={this.toggleField} />}
                label={this.props.field}
              />
            </td>
          </Grid>
          <Grid item>
            <FilterForm
              filterElement={this.filterElement}
              dataType={this.props.tableData.headers[this.props.field]}
            />
          </Grid>
        </tr>
        <Grid item />
      </Grid>
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

function FilterForm(props) {
  const [formOpen, toggleForm] = useState(false)

  return (
    <td>
      <button
        className="filter-toggle"
        onClick={() => toggleForm(!formOpen)}
        type="button"
      >
        Filter
      </button>{' '}
      {formOpen && (
        <form className="filter-form" onSubmit={props.filterElement}>
          <FilterFormDataSelect dataType={props.dataType} />
          <FilterFormInput dataType={props.dataType} />
          <button type="submit">Add</button>
        </form>
      )}
    </td>
  )
}
// date upto from before after
//component to display filter operators accordingly to dataType of the field
function FilterFormDataSelect(props) {
  return props.dataType === 'int' ||
    props.dataType === 'int' ||
    props.dataType === 'float' ? (
    <select name="operator">
      <option value="null">Option</option>
      <option value="=">equal to</option>
      <option value="!=">not equal to</option>
      <option value=">">greater than</option>
      <option value=">=">at least</option>
      <option value="<">less than</option>
      <option value="<=">at most</option>
      <option value="IS NOT NULL">Not Empty</option>
    </select>
  ) : props.dataType === 'text' ? (
    <select name="operator">
      <option value="null">Option</option>
      <option value="=">equal to</option>
      <option value="!=">not equal to</option>
      <option value="contains">contains</option>
      <option value="starts-with">starts with</option>
      <option value="ends-with">ends with</option>
      <option value="IS NOT NULL">Not Empty</option>
    </select>
  ) : props.dataType === 'bool' ? (
    <select name="operator">
      <option value="null">Option</option>
      <option value="=">IS</option>
    </select>
  ) : (
    props.dataType === 'date' && (
      <select name="operator">
        <option value="null">Option</option>
        <option value="=">equal to</option>
        <option value="!=">not equal to</option>
        <option value=">">after</option>
        <option value=">=">from</option>
        <option value="<">before</option>
        <option value="<=">up to</option>
        <option value="IS NOT NULL">Not Empty</option>
      </select>
    )
  )
}

function FilterFormInput(props) {
  return props.dataType === 'bool' ? (
    <select name="condition">
      <option value="true">TRUE</option>
      <option value="false">FALSE</option>
    </select>
  ) : props.dataType === 'date' ? (
    <Fragment>
      <input name="year" placeholder="year - YYYY" />
      <input name="month" placeholder="month - MM" />
      <input name="day" placeholder="day - DD" />
    </Fragment>
  ) : (
    <input name="condition" />
  )
}
