import React from 'react'
import QueryRow from './query-row'
import GroupBy from './query-group-by'
import OrderBy from './query-order-by'
import QueryLimit from './query-limit'
import Join from './query-join'
import SelectAll from './select-all'
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
  Paper,
  Typography
} from '@material-ui/core'

import {makeStyles} from '@material-ui/styles'

const section = {
  height: '100%',
  paddingTop: 5
}

export default function SingleTable(props) {
  const useStyles = makeStyles(() => ({
    aggregateGrid: {
      // height: '1100px',
      padding: 50
    },
    bottomSection: {
      marginTop: 100
    }
  }))

  const classes = useStyles()
  return (
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
          <Grid item>
            <SelectAll table={props.tableData} tableName={props.tableName} />
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
      </Grid>

      <Grid
        name="3: Aggregate, Group, Order, Limit (lvl 2)"
        container
        item
        direction="row"
        justify="space-evenly"
        className={classes.aggregateGrid}
        sm={6}
      >
        <Grid container xs={12} item>
          <Grid xs={12}>
            <Typography variant="h3">Aggregate Analysis</Typography>
          </Grid>
          <Grid container justify="space-evenly" xs={12} item>
            <Grid xs={12} sm={4}>
              <AggregateSelector
                index={props.index}
                tableData={props.tableData}
                tableName={props.tableName}
              />
            </Grid>
            <Grid xs={12} sm={4}>
              <GroupBy tableName={props.tableName} />
            </Grid>
            <Grid xs={12} sm={4}>
              <OrderBy tableName={props.tableName} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} />
        <Grid className={classes.bottomSection} item xs={12}>
          <QueryLimit tableName={props.tableName} />
        </Grid>
      </Grid>
    </Grid>
  )
}
