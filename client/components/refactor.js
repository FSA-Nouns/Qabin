import React from 'react'
import QueryRow from './query-row'
import QuerySort from './query-sort'
import Join from './query-join'
import AggregateSelector from './aggregate-selector'
import {
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core'

export default function SingleTable(props) {
  return (
    <Grid
      container
      item
      direction="column"
      justify="space-evenly"
      alignItems="flex-start"
      spacing={3}
    >
      <Grid item>
        <h2>{props.tableName.slice(props.tableName.indexOf('_') + 1)}</h2>
        {props.location.pathname === '/queryBuilder' ? (
          <Join data={props} index={0} />
        ) : (
          ''
        )}
        {props.location.pathname === '/queryBuilder' ? (
          <Join data={props} index={1} />
        ) : (
          ''
        )}

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(props.tableData.rows[0]).map((element, index) => {
                return (
                  <QueryRow
                    tableName={props.tableName}
                    key={index}
                    field={element}
                    tableData={props.tableData}
                  />
                )
              })}
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item>
        <h3>Aggregate Analysis</h3>
        <AggregateSelector
          index={props.index}
          tableData={props.tableData}
          tableName={props.tableName}
        />
      </Grid>
      <Grid item>
        <QuerySort tableName={props.tableName} className="query-sort" />
      </Grid>
    </Grid>
  )
}
