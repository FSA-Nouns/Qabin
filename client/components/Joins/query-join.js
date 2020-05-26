import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {
  addJoinTable,
  removeJoinTable,
  setJoinType,
  setJoinColumnElement
} from '../../store/query'
import {Typography} from '@material-ui/core'
import {useStyles, tileData} from './join-styles'
import Divider from '@material-ui/core/Divider'
import JoinTypes from './join-type'
import {Column1, Column2} from './join-column'

class Join extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      join: false,
      joinType: this.props.joinType,
      table1: this.props.table1,
      table2: this.props.table2,
      column1: this.props.column1,
      column2: this.props.column2
    }

    this.handleJoinTable = this.handleJoinTable.bind(this)
    this.handleJoinType = this.handleJoinType.bind(this)
    this.handleColumnElement = this.handleColumnElement.bind(this)
    this.handleJoinInfo = this.handleJoinInfo.bind(this)
  }

  componentDidMount() {
    this.setState({
      table1: this.props.data.tableName
    })
  }

  //Check if that table exists - YES: update selection, NO: add selection
  handleJoinTable(event, index, joinId) {
    event.preventDefault()
    let joinArray = event.target.value
    let table = this.props.data.tableName
    if (this.state.join === true) {
      this.props.removeJoinTable(table, index, joinId)
      this.props.addJoinTable(table, joinArray, index, joinId)
      this.setState({table1: table, table2: joinArray})
    } else {
      this.props.addJoinTable(table, joinArray, index, joinId)
      this.setState({join: true, table1: table, table2: joinArray})
    }
  }

  handleJoinType(title, index, joinId) {
    
    let joinArray = title
    let table = this.props.data.tableName
    if (this.state.join === true) {
      this.props.setJoinType(table, joinArray, index, joinId)
      this.setState({joinType: joinArray})
    } else {
      this.setState({joinType: ''})
    }
  }

  handleColumnElement(table1, table2, event, index, joinId) {
    event.preventDefault()
    let joinArray = `${table2}.${event.target.value}`
    this.props.setJoinColumnElement(table1, joinArray, index, joinId)
    this.setState({[`column${index - 1}`]: `${event.target.value}`})
  }

  handleJoinInfo(event) {
    event.preventDefault()
  }

  render() {
    let table1 = this.state.table1
    let table2 = this.state.table2
    let joinId = this.props.index
    let joinQuery =
      this.props.queryBundle[table1] !== undefined &&
      this.props.queryBundle[table1].join[joinId] !== undefined
        ? this.props.queryBundle[table1].join[joinId][0]
        : ''
    let chosenTable =
      joinQuery !== '' && joinQuery !== undefined
        ? joinQuery.slice(joinQuery.indexOf('_') + 1)
        : 'Table'
    const classes = useStyles

    return (
      <Fragment>
        <FormControl fullWidth align spacing={2}>
          <InputLabel id="Join-Table-1">{chosenTable}</InputLabel>
          <Select
            id="demo-simple-select"
            defaultValue=""
            onChange={event => this.handleJoinTable(event, 0, this.props.index)}
          >
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

        {this.state.table2 !== '' ? (
          <Fragment>
            <Divider style={{margin: '10px'}} />

            <Typography variant="h6" style={{padding: '10px'}}>
              What kind of relation between your data tables would you like to
              explore?
            </Typography>

            <Typography
              gutterBottom
              style={{padding: '10px'}}
              variant="caption"
              display="block"
            >
              Hover over each type to learn more
            </Typography>

            <JoinTypes
              handleJoinType={this.handleJoinType}
              index={this.props.index}
              tileData={tileData}
              joinType={this.state.joinType}
            />
          </Fragment>
        ) : (
          ''
        )}

        {this.state.joinType !== '' ? (
          <Fragment>
            <Divider style={{margin: '10px'}} />
            <Typography style={{padding: '10px'}} variant="h6" display="block">
              Help us connect your data in the most relevant manner.
              <br />
              {`What data field in ${table1.slice(
                table1.indexOf('_') + 1
              )} table
                is common with ${table2.slice(table2.indexOf('_') + 1)} table?`}
            </Typography>

            <Column1
              data={this.props.data}
              index={this.props.index}
              handleColumnElement={this.handleColumnElement}
              column1={this.state.column1}
              table1={this.state.table1}
            />
          </Fragment>
        ) : (
          ''
        )}

        {this.state.column1 !== '' ? (
          <Fragment>
            <Divider style={{margin: '10px'}} />
            <Typography style={{padding: '10px'}} variant="h6" display="block">
              {`What data field in ${table2.slice(
                table2.indexOf('_') + 1
              )} table
                is common with ${this.state.column1} from ${table1.slice(
                table1.indexOf('_') + 1
              )} table?`}
            </Typography>

            <Column2
              data={this.props.data}
              index={this.props.index}
              handleColumnElement={this.handleColumnElement}
              column1={this.state.column1}
              column2={this.state.column2}
              table1={this.state.table1}
              table2={this.state.table2}
            />
          </Fragment>
        ) : (
          ''
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  queryBundle: state.queryBundle
})

const mapDispatchToProps = dispatch => {
  return {
    addJoinTable: (tableName, joinArray, index, joinId) =>
      dispatch(addJoinTable(tableName, joinArray, index, joinId)),
    removeJoinTable: (tableName, index, joinId) =>
      dispatch(removeJoinTable(tableName, index, joinId)),
    setJoinType: (tableName, joinArray, index, joinId) =>
      dispatch(setJoinType(tableName, joinArray, index, joinId)),
    setJoinColumnElement: (tableName, joinArray, index, joinId) =>
      dispatch(setJoinColumnElement(tableName, joinArray, index, joinId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join)
