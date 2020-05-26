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
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import {useStyles, tileData} from './join-styles'
import Divider from '@material-ui/core/Divider'
import {makeStyles} from '@material-ui/styles'
import {theme} from '../../theme'
import ButtonBase from '@material-ui/core/ButtonBase'
import JoinTypes from './join-type'
// import {joinCounter} from './join-modal'

// let joinType
export function Column1(props) {
  console.log('props.column1', props.column1)
  return (
    <FormControl spacing="1" fullWidth>
      <InputLabel id="Column-Table-1" minWidth="500">
        {props.column1 === ''
          ? 'Field in Main Table'
          : props.column1.slice(props.column1.indexOf('.') + 1)}
      </InputLabel>

      <Select
        labelId="Column-Table-2"
        id="Column-Table-1"
        labelWidth="240"
        defaultValue={props.Column1}
        onChange={event =>
          props.handleColumnElement(
            props.table1,
            props.table1,
            event,
            2,
            props.index
          )
        }
      >
        {/* <MenuItem> Select Column 1 </MenuItem> */}
        {props.data.tableDatas.map(table => {
          if (table[props.table1] !== undefined) {
            return Object.keys(table[props.table1].rows[0]).map(column => (
              <MenuItem key={column} value={column}>
                {column}
              </MenuItem>
            ))
          }
        })}
      </Select>
      <FormHelperText>Field in Main Table</FormHelperText>
    </FormControl>
  )
}

export function Column2(props) {
  return (
    <FormControl className="formControl" spacing="1" fullWidth>
      <InputLabel id="Column-Table-2">
        {props.column2 === ''
          ? 'Field in Main Table'
          : props.column2.slice(props.column2.indexOf('.') + 1)}
      </InputLabel>
      <Select
        labelId="Column-Table-2"
        id="Column-Table-2"
        // value={event.target.value}
        onChange={event =>
          props.handleColumnElement(
            props.table1,
            props.table2,
            event,
            3,
            props.index
          )
        }
        defaultValue={props.Column2}
      >
        {/* <MenuItem>Select Column 2 </MenuItem> */}
        {props.data.tableDatas.map(table => {
          if (table[props.table2] !== undefined) {
            return Object.keys(table[props.table2].rows[0]).map(column => (
              <MenuItem key={column} value={column}>
                {column}
              </MenuItem>
            ))
          }
        })}
      </Select>
      <FormHelperText>Field in Joined Table</FormHelperText>
    </FormControl>
  )
}
