import React, {Component, useState} from 'react'
import {connect} from 'react-redux'
import {removeFieldElement, addFieldElement} from '../store/query'

import {
  Chip,
  Grid,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  Box
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import {makeStyles} from '@material-ui/styles'
import {grey} from '@material-ui/core/colors/grey'

let colorToggle = {AVG: false, SUM: false, COUNT: false, MIN: false, MAX: false}
class AggregateSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      AVG: [],
      SUM: [],
      COUNT: [],
      MIN: [],
      MAX: [],
      aggregates: ['AVG', 'SUM', 'COUNT', 'MIN', 'MAX'],
      numericFields: []
    }
    this.toggleAgg = this.toggleAgg.bind(this)
    this.toggleColor = this.toggleColor.bind(this)
  }

  componentDidMount() {
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

    this.setState({numericFields: numericFields})
  }

  toggleColor(aggType) {
    if (!!this.state[aggType].length) {
      colorToggle[aggType] = false
    } else {
      colorToggle[aggType] = true
    }
  }

  toggleAgg(aggType, column) {
    // evt.preventDefault()
    // let aggType = evt.target.agg.value
    // let column = evt.target.selector.value

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
    return (
      <Grid
        name="aggregate top level container"
        container
        direction="row"
        justify="space-around"
      >
        <Grid
          name="aggregate selector buttons"
          container
          item
          xs={12}
          sm={6}
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          {this.state.aggregates.map((aggType, index) => {
            return (
              <AggregateForm
                key={index}
                aggType={aggType}
                numericFields={this.state.numericFields}
                toggleAgg={this.toggleAgg}
                toggleColor={this.toggleColor}
              />
            )
          })}
        </Grid>

        <Grid
          name="aggregate chips"
          container
          item
          direction="column"
          // justify="center"
          alignItems="center"
          height="100%"
          width={1}
          spacing={1}
          xs={12}
          sm={6}
        >
          {this.props.queryBundle[this.props.tableName].fields ? (
            this.props.queryBundle[this.props.tableName].fields.map(
              (field, index) => {
                if (this.state.aggregates.includes(field.split('(')[0]))
                  return (
                    <Grid width={1} item>
                      <Chip
                        key={index}
                        name="selected"
                        size="small"
                        value={field}
                        label={`${field.split('(')[0]} of ${
                          field.split('(')[1].split(')')[0]
                        }`}
                        width={1}
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
              }
            )
          ) : (
            <Chip label="failed" />
          )}
        </Grid>
      </Grid>
    )
  }
}

const AggregateForm = props => {
  const useStyles = makeStyles(() => ({
    root: {
      // marginBottom: 15
    },
    formControl: {
      marginBottom: '0.5rem',
      minWidth: 120
    }
  }))

  const [selectColumn, selectVal] = useState(props.aggType)

  const handleChange = event => {
    selectVal(event.target.value)
  }

  const handleSubmit = () => {
    if (selectColumn && selectColumn !== props.aggType) {
      props.toggleAgg(props.aggType, selectColumn)
      selectVal(props.aggType)
    }
    props.toggleColor(props.aggType)
  }
  const classes = useStyles()

  return (
    <Grid container item wrap="nowrap">
      <IconButton
        onClick={() => handleSubmit()}
        color={colorToggle[props.aggType] ? 'secondary' : ''}
        aria-label="add an agg"
      >
        <AddCircleIcon />
      </IconButton>
      <FormControl className={classes.formControl}>
        <Select
          id="demo-simple-select"
          value={selectColumn}
          onChange={handleChange}
        >
          <MenuItem value={props.aggType}>{props.aggType}</MenuItem>
          {props.numericFields.map((field, index) => (
            <MenuItem key={index} value={field}>
              {field}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  )
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
