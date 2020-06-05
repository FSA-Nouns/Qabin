import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

// Column1 stateless comp. renders column selection info
// for table user initiates the join from.
export function Column1(props) {
  return (
    // MUI FormControl comp. provides form input context for column selection
    <FormControl spacing="1" fullWidth>
      <InputLabel id="Column-Table-1" minWidth="500">
        {props.column1 === ''
          ? 'Field in Main Table'
          : props.column1.slice(props.column1.indexOf('.') + 1)}
      </InputLabel>

      {/* MUI Select comp. renders select drop-down menu for different columns for initial join table */}
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
        {/* 
          Mapping over columns available from initial table,
          uses MUI MenuItem comp. for each column.
        */}
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

// Column2 stateless comp. renders column selection info
// for table user is trying to join to initial table
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
