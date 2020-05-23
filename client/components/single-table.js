import React from 'react'
import QueryRow from './query-row'
import GroupBy from './query-group-by'
import OrderBy from './query-order-by'
import QueryLimit from './query-limit'


import JoinCopy from './Joins/join-modal'

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
  Typography,
  AppBar,
  Card
} from '@material-ui/core'

import {makeStyles} from '@material-ui/styles'

export default function SingleTable(props) {
  const useStyles = makeStyles(() => ({
    aggregateGrid: {
      padding: 15,
      paddingRight: '1rem',
      paddingTop: 0
    },
    bottomSection: {
      marginTop: 30
    },
    middleSection: {
      marginTop: 15
    },
    aggregateHeader: {
      height: 45
    },
    outerGrid: {
      width: '100%'
    },
    firstCol: {
      width: '40%'
    },
    middleCol: {
      width: '20%'
    },
    lastCol: {
      width: '40%'
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
      // wrap="nowrap"
      className={classes.outerGrid}
      xs={12}
    >
      <Grid
        name="2: Tablename, join buttons and table (lvl 2) container"
        container
        item
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        xs={12}
        className={classes.outerGrid}
        md={6}
      >
        <Grid name="tablename and join buttons (lvl 3)" container item>
          <TableQueryHeader>
            <Typography variant="h6">
              {props.tableName.slice(props.tableName.indexOf('_') + 1)}
            </Typography>
            <SelectAll table={props.tableData} tableName={props.tableName} />

            <Grid item>
              {props.location.pathname === '/queryBuilder' ? (
                <JoinCopy data={props} index={0} />
              ) : (
                ''
              )}
            </Grid>
          </TableQueryHeader>
        </Grid>

        <Grid item name="Query table grid item" className={classes.outerGrid}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.firstCol}>
                    Field Options
                  </TableCell>
                  <TableCell className={classes.middleCol}>
                    Filter Options
                  </TableCell>
                  <TableCell className={classes.lastCol} align="right">
                    Active Filters
                  </TableCell>
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
        md={6}
        sm={12}
      >
        <Grid container direction="column" xs={12} item>
          {/* <Grid container xs={12} item> */}
          <Grid item className={classes.aggregateHeader}>
            <AggregateHeader>
              <Typography variant="h6">Aggregate Analysis</Typography>
            </AggregateHeader>
          </Grid>
          <SimpleCard>
            <Grid item xs={12}>
              <AggregateSelector
                index={props.index}
                tableData={props.tableData}
                tableName={props.tableName}
              />
            </Grid>
            <Grid container item xs={12} className={classes.middleSection}>
              <Grid item xs={12} sm={6}>
                <GroupBy tableName={props.tableName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <OrderBy tableName={props.tableName} />
              </Grid>
            </Grid>
            <Grid className={classes.bottomSection} item xs={12}>
              <QueryLimit tableName={props.tableName} />
            </Grid>
          </SimpleCard>
          {/* </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  )
}

function AggregateHeader(props) {
  const useStyles = makeStyles({
    root: {
      width: '100%',
      height: 45,
      paddingLeft: 15,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,

      display: 'flex',

      justifyContent: 'center'
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  })

  const classes = useStyles()

  return (
    <AppBar className={classes.root} position="static">
      {props.children}
    </AppBar>
  )
}

function TableQueryHeader(props) {
  const useStyles = makeStyles({
    root: {
      width: '100%',
      height: 45,
      paddingLeft: 15,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  })

  const classes = useStyles()

  return (
    <AppBar className={classes.root} position="static">
      {props.children}
    </AppBar>
  )
}

function SimpleCard(props) {
  const useStyles = makeStyles({
    root: {
      width: '100%',
      padding: 15
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  })

  const classes = useStyles()

  return <Card className={classes.root}>{props.children}</Card>
}
