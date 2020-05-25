/* eslint-disable complexity */
import React, {Component, useState, Fragment} from 'react'
import {connect} from 'react-redux'
import {
  removeFieldElement,
  addFieldElement,
  addFilterElement,
  removeFilterElement,
  selectAll,
  unselectAll
} from '../store/query'
import {
  Grid,
  Checkbox,
  FormControlLabel,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@material-ui/core'

let operatorDict = dataType => ({
  '>=': 'at least',
  '<=': 'at most',
  '<': dataType === 'date' ? 'before' : 'less than',
  '>': dataType === 'date' ? 'after' : 'greater than',
  '=': 'equal to',
  '!=': 'not equal to'
})

const parseOperator = (filterArray, dataType) => {
  if (filterArray[1] === 'LIKE') {
    if (
      filterArray[2][0] === '%' &&
      filterArray[2][filterArray[2].length - 1] === '%'
    ) {
      return 'contains'
    } else if (
      filterArray[2][0] === '%' &&
      filterArray[2][filterArray[2].length - 1] !== '%'
    ) {
      return 'ends with'
    } else if (
      filterArray[2][0] !== '%' &&
      filterArray[2][filterArray[2].length - 1] === '%'
    ) {
      return 'starts with'
    }
  } else if (filterArray[1] === '') {
    return 'not empty'
  } else {
    return operatorDict(dataType)[filterArray[1]]
  }
}

const parseCondition = (operator, value) => {
  if (value === 'IS NOT NULL') {
    return ''
  } else if (operator === 'starts with') {
    return value.slice(0, -1)
  } else if (operator === 'ends with') {
    return value.slice(1)
  } else if (operator === 'contains') {
    return value.slice(1, -1)
  } else {
    return value
  }
}

const conditionalDict = (field, headers, filterArray) => {
  const dataType = headers[field]
  const operator = parseOperator(filterArray, dataType)
  // const curatedField = (dataType === 'date') ? field.split('(')[1].slice(0, -1) : field;
  const condition = parseCondition(operator, filterArray[2])
  return `${field} ${operator} ${condition}`
}

const parseField = field => {
  if (field.includes('trunc(') && field[field.length - 1] === ')') {
    return field.split('(')[1].slice(0, -1)
  } else {
    return field
  }
}

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
    } else if (
      this.state.checked === true &&
      this.props.queryBundle[this.props.tableName].selectAll === true
    ) {
      this.props.unselectAll(this.props.tableName)
      this.setState({checked: false})
      this.props.removeFieldElement(this.props.tableName, this.props.field)
    } else {
      this.setState({checked: false})
      this.props.removeFieldElement(this.props.tableName, this.props.field)
    }
  }

  // componentDidMount() {
  //   if (this.props.queryBundle[this.props.tableName].selectAll === true) {
  //     this.toggleField()
  //   } else if (this.props.queryBundle[this.props.tableName].selectAll === false) {
  //     this.setState({ checked: false })
  //     this.props.removeFieldElement(this.props.tableName, this.props.field)
  //   }
  // }

  componentDidUpdate(prevProps) {
    if (
      this.props.queryBundle[this.props.tableName].fields !==
      prevProps.queryBundle[this.props.tableName].fields
    ) {
      if (
        !Object.keys(
          this.props.queryBundle[this.props.tableName].fields
        ).includes(this.props.field)
      ) {
        this.setState({checked: false})
      } else {
        this.setState({checked: true})
      }
    }
    if (
      this.props.queryBundle[this.props.tableName].selectAll === true &&
      this.state.checked === false
    ) {
      this.toggleField()
    } else if (
      this.state.checked === true &&
      !this.props.queryBundle[this.props.tableName].fields.includes(
        this.props.field
      ) &&
      !this.props.queryBundle[this.props.tableName].selectAll
    ) {
      this.props.unselectAll(this.props.tableName)
      this.toggleField()
    }
  }

  render() {
    return (
      <TableRow>
        <TableCell align="left" scope="row">
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checked}
                onChange={this.toggleField}
              />
            }
            label={this.props.field}
          />
        </TableCell>
        <TableCell align="right">
          <FilterForm
            filterElement={this.filterElement}
            dataType={this.props.tableData.headers[this.props.field]}
          />
        </TableCell>
        <TableCell align="right">
          {this.props.queryBundle[this.props.tableName].where
            ? this.props.queryBundle[this.props.tableName].where
                .filter(arr => parseField(arr[0]) === this.props.field)
                .map((filter, index) => {
                  return (
                    <Chip
                      key={index}
                      size="small"
                      value={filter}
                      label={conditionalDict(
                        parseField(filter[0]),
                        this.props.tableData.headers,
                        filter
                      )}
                      onDelete={() =>
                        this.props.removeFilterElement(
                          this.props.tableName,
                          filter
                        )
                      }
                    />
                  )
                })
            : ''}
        </TableCell>
      </TableRow>
    )
  }
}

const mapStateToProps = state => ({
  queryBundle: state.queryBundle
})

const mapDispatchToProps = dispatch => {
  return {
    addFilterElement: (tableName, filterArray) =>
      dispatch(addFilterElement(tableName, filterArray)),
    addFieldElement: (tableName, field) =>
      dispatch(addFieldElement(tableName, field)),
    removeFieldElement: (tableName, field) =>
      dispatch(removeFieldElement(tableName, field)),
    removeFilterElement: (tableName, filterArray) => {
      dispatch(removeFilterElement(tableName, filterArray))
    },
    unselectAll: tableName => dispatch(unselectAll(tableName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryRow)

function FilterForm(props) {
  const [formOpen, toggleForm] = useState(false)

  return (
    <form className="filter-form" onSubmit={props.filterElement}>
      <FilterFormDataSelect dataType={props.dataType} />
      <FilterFormInput dataType={props.dataType} />
      <button type="submit">Add</button>
    </form>
  )
}
// date upto from before after
//component to display filter operators accordingly to dataType of the field
function FilterFormDataSelect(props) {
  return props.dataType === 'serial' ||
    props.dataType === 'integer' ||
    props.dataType === 'double precision' ||
    props.dataType === 'int' ||
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
  ) : props.dataType === 'bool' || props.dataType === 'boolean' ? (
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
