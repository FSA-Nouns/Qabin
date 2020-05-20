import React from 'react'
import QueryRow from './query-row'
import GroupBy from './query-group-by'
import OrderBy from './query-order-by'
import QueryLimit from './query-limit'
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
      name="0: root grid container (lvl 0)"
      container
      item
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      // spacing={3}
    >
      <Grid
        name="1: Table Selection (lvl 1)"
        container
        item
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        sm={4}
      />
      <Grid
        name="1A: Table Selection (lvl 1)"
        container
        item
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        wrap="nowrap"
        sm={8}
      >
        <Grid
          name="2: Tablename, join buttons and table (lvl 2) container"
          container
          item
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          sm={6}
        >
          <Grid
            name="tablename and join buttons (lvl 3)"
            container
            item
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <h2>{props.tableName.slice(props.tableName.indexOf('_') + 1)}</h2>
            </Grid>
            <Grid item>
              {props.location.pathname === '/queryBuilder' ? (
                <Join data={props} index={0} />
              ) : (
                ''
              )}
            </Grid>
            <Grid item>
              {props.location.pathname === '/queryBuilder' ? (
                <Join data={props} index={1} />
              ) : (
                ''
              )}
            </Grid>
          </Grid>
          <Grid item name="Query table grid item">
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
                  {Object.keys(props.tableData.rows[0]).map(
                    (element, index) => {
                      return (
                        <QueryRow
                          tableName={props.tableName}
                          key={index}
                          field={element}
                          tableData={props.tableData}
                        />
                      )
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid
          name="3: Aggregate, Group, Order, Limit (lvl 2)"
          container
          item
          direction="column"
          justify="space-evenly"
          alignItems="flex-start"
          spacing={3}
          sm={6}
        >
          <Grid item>
            <h3>Aggregate Analysis</h3>
            <AggregateSelector
              index={props.index}
              tableData={props.tableData}
              tableName={props.tableName}
            />
          </Grid>
          <Grid item>
            <GroupBy tableName={props.tableName} />
          </Grid>
          <Grid item>
            <OrderBy tableName={props.tableName} />
          </Grid>
          <Grid item>
            <QueryLimit tableName={props.tableName} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
