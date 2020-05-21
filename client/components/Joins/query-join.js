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
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import {useStyles, tileData} from './join-styles'
// import image from './graphics/Join-types.png'

// let joinType
class Join extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      join: false,
      joinType: '',
      table1: '',
      table2: '',
      column1: '',
      column2: '',
      clear: false
    }
    this.handleClear = this.handleClear.bind(this)
    this.handleJoinTable = this.handleJoinTable.bind(this)
    this.handleJoinType = this.handleJoinType.bind(this)
    this.handleColumnElement = this.handleColumnElement.bind(this)
    this.handleJoinInfo = this.handleJoinInfo.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clear !== this.props.clear) {
      this.setState({
        clear: nextProps.clear
      })
    } else {
      this.setState({clear: false})
    }
  }

  handleClear(table, index, joinId) {
    event.preventDefault()
    if (this.state.join === true && this.props.clear === true) {
      this.props.removeJoinTable(table, index, joinId)
    }
  }

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
    // event.preventDefault()
    console.log('event in join type', title)
    let joinArray = title
    let table = this.props.data.tableName
    if (this.state.join === true) {
      this.props.setJoinType(table, joinArray, index, joinId)
      return this.setState({joinType: joinArray})
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
    // if (this.state.clear === true) {
    //   this.handleClear(table1, 0, this.props.index)
    // }
    const classes = useStyles
    // const tileData = tileData

    return (
      <Fragment>
        <FormControl
          className="formControl"
          // spacing="1"
          align
          minWidth="120"
          spacing={2}
          padding="50px"
        >
          <InputLabel id="Join-Table-1">Table</InputLabel>
          <Select
            labelId="demo-dialog-select-label"
            id="demo-dialog-select"
            defaultValue=""
            onChange={event => this.handleJoinTable(event, 0, this.props.index)}
          >
            <MenuItem value=""> Select Table to Join </MenuItem>
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

        <Typography variant="body2">
          {''}
          What kind of relation between your data tables would you like to
          explore?
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Click on ? icon to learn more about each type
        </Typography>

        <GridList cellHeight={180} className={classes.gridListJoin}>
          <GridListTile
            key="Subheader"
            xs={false}
            cols={1}
            style={{height: 'auto'}}
          >
            <ListSubheader
            // component="div"
            >
              Join Types
            </ListSubheader>
          </GridListTile>
          {tileData.map(tile => (
            <GridListTile
              key={tile.img}
              value={tile.title}
              onClick={() =>
                this.handleJoinType(tile.title, 1, this.props.index)
              }
            >
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${tile.title}`}
                    className={classes.icon}
                    onClick={event => this.handleJoininfo(event)}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>

        {/* <FormControl className="formControl" spacing="1" minWidth="120">
          <InputLabel id="Join-Type">Join</InputLabel>
          <Select
            labelId="Join-Type"
            id="Join-Type"
            // value={event.target.value}
            onChange={event => this.handleJoinType(event, 1, this.props.index)}
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
        </FormControl> */}

        <Typography variant="body1">
          Help us connect your data in the most relevant manner.
        </Typography>
        <Typography variant="body1">
          {`What data field in ${table1.slice(table1.indexOf('_') + 1)}
          is common with ${table2.slice(table2.indexOf('_') + 1)}?`}
        </Typography>
        <FormControl className="formControl" spacing="1" minWidth="120">
          <InputLabel id="Column-Table-1">Field in Table 1</InputLabel>
          <Select
            labelId="Column-Table-1"
            id="Column-Table-1"
            defaultValue=""
            onChange={event =>
              this.handleColumnElement(
                table1,
                table1,
                event,
                2,
                this.props.index
              )
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

        <Typography variant="body1">
          {`What data field in ${table2.slice(table2.indexOf('_') + 1)}
         is common with ${this.state.column1} from ${table1.slice(
            table1.indexOf('_') + 1
          )}?`}
        </Typography>
        <FormControl className="formControl" spacing="1" minWidth="120">
          <InputLabel id="Column-Table-2">Field in Table 2</InputLabel>
          <Select
            labelId="Column-Table-2"
            id="Column-Table-2"
            // value={event.target.value}
            onChange={event =>
              this.handleColumnElement(
                table1,
                table2,
                event,
                3,
                this.props.index
              )
            }
            defaultValue=""
          >
            <MenuItem>Select Column 2 </MenuItem>
            {this.props.data.tableDatas.map(table => {
              if (table[table2] !== undefined) {
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
