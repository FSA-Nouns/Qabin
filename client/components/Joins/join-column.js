import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

export function Column1(props) {
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
