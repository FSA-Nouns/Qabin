import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {
  addJoinElement,
  removeJoinElement,
  setJoinColumnElement
} from '../../store/query'

let joinType
class Join extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      join: false,
      table1: '',
      table2: '',
      clear: false
    }
    this.handleClear = this.handleClear.bind(this)
    this.handleJoinElement = this.handleJoinElement.bind(this)
    this.handleColumnElement = this.handleColumnElement.bind(this)
  }

  // componentWillReceiveProps(nextProps){
  //     if (nextProps.clear !== this.props.clear) {
  //       this.setState({
  //       clear: nextProps.clear
  //     })
  //   } else {
  //       this.setState({clear: false})
  //   }
  // }

  handleClear(table, index) {
    event.preventDefault()
    if (this.state.join === true && this.props.clear === true) {
      this.props.removeJoinElement(table, index)
    }
  }

  handleJoinType(event) {
    event.preventDefault()
    if (this.state.join === false) {
      this.setState({join: true, clear: false})
      joinType = event.target.value
    }
  }

  handleJoinElement(event, index) {
    event.preventDefault()
    let joinArray = event.target.value
    let table = this.props.data.tableName
    if (this.state.join === true) {
      this.props.removeJoinElement(table, index)
      this.props.addJoinElement(table, joinArray, joinType, this.props.index)
      return this.setState({table1: table, table2: joinArray})
    }
  }

  handleColumnElement(table1, table2, event, index) {
    event.preventDefault()
    let joinArray = `${table2}.${event.target.value}`
    this.props.setJoinColumnElement(table1, joinArray, index, this.props.index)
  }

  render() {
    let table1 = this.state.table1
    let table2 = this.state.table2
    console.log('this.props.index in render of join', this.props.index)
    console.log('this.state.clear in render of join', this.state.clear)
    if (this.state.clear === true) {
      this.handleClear(table1, this.props.index)
    }

    return (
      <Fragment>
        <FormControl className="formControl" spacing="1" minWidth="120">
          <InputLabel id="Join-Type">Join</InputLabel>
          <Select
            labelId="Join-Type"
            id="Join-Type"
            // value={event.target.value}
            onChange={event => this.handleJoinType(event)}
            defaultValue=""
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="INNER">Inner Join</MenuItem>
            <MenuItem value="LEFT OUTER">Left Join</MenuItem>
            <MenuItem value="RIGHT">Right Join</MenuItem>
            <MenuItem value="FULL">Full Join</MenuItem>
          </Select>
          <FormHelperText>Type of Join</FormHelperText>
        </FormControl>

        <FormControl className="formControl" spacing="1" minWidth="120">
          <InputLabel id="Join-Table-1">Table</InputLabel>
          <Select
            labelId="Join-Table-1"
            id="Join-Table-1"
            defaultValue=""
            onChange={event => this.handleJoinElement(event, this.props.index)}
          >
            <MenuItem value=""> Select Table 1 </MenuItem>
            {this.props.data.tableDatas
              .filter(
                table => Object.keys(table)[0] !== this.props.data.tableName
              )
              .map((table, index) => (
                <MenuItem key={index} value={Object.keys(table)[0]}>
                  {Object.keys(table)[0].slice(
                    Object.keys(table)[0].indexOf('_') + 1
                  )}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText>Table to Join</FormHelperText>
        </FormControl>

        <FormControl className="formControl" spacing="1" minWidth="120">
          <InputLabel id="Column-Table-1">Field in Table 1</InputLabel>
          <Select
            labelId="Column-Table-1"
            id="Column-Table-1"
            defaultValue=""
            onChange={event =>
              this.handleColumnElement(table1, table1, event, 2)
            }
          >
            <MenuItem> Select Column 1 </MenuItem>
            {this.props.data.tableDatas.map(table => {
              if (table[table1] !== undefined) {
                return Object.keys(table[table1].rows[0]).map(column => (
                  <MenuItem key={column} value={column}>
                    {column}
                  </MenuItem>
                ))
              }
            })}
          </Select>
          <FormHelperText>Table 1 Field</FormHelperText>
        </FormControl>

        <FormControl className="formControl" spacing="1" minWidth="120">
          <InputLabel id="Column-Table-2">Field in Table 2</InputLabel>
          <Select
            labelId="Column-Table-2"
            id="Column-Table-2"
            // value={event.target.value}
            onChange={event =>
              this.handleColumnElement(table1, table2, event, 3)
            }
            defaultValue=""
          >
            <MenuItem>Select Column 2 </MenuItem>
            {this.props.data.tableDatas.map(table => {
              if (table[table2] !== undefined) {
                console.log('TABLE 1', table1)
                console.log('TABLE 2', table2)
                return Object.keys(table[table2].rows[0]).map(column => (
                  <MenuItem key={column} value={column}>
                    {column}
                  </MenuItem>
                ))
              }
            })}
          </Select>
          <FormHelperText>Table 2 Field</FormHelperText>
        </FormControl>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return {
    addJoinElement: (tableName, joinArray, joinType, joinId) =>
      dispatch(addJoinElement(tableName, joinArray, joinType, joinId)),
    removeJoinElement: (tableName, joinId) =>
      dispatch(removeJoinElement(tableName, joinId)),
    setJoinColumnElement: (tableName, joinArray, index, joinId) =>
      dispatch(setJoinColumnElement(tableName, joinArray, index, joinId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join)
