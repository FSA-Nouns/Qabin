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
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Field Options</TableCell>
                <TableCell align="right">Filter Options</TableCell>
                <TableCell align="right">Active Filters</TableCell>
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
