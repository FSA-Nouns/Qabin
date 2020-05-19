import React from 'react'
import QueryRow from './query-row'
import QuerySort from './query-sort'
import DataTypeRow from './data-type-row'
import PropTypes from 'prop-types'
import Join from './query-join'
import {useState} from 'react'
import AggregateSelector from './aggregate-selector'
import {makeStyles} from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  Card,
  AppBar,
  Tabs,
  Tab,
  Box,
  List,
  ListSubheader,
  ListItem,
  Tooltip
} from '@material-ui/core'

function TabPanel(props) {
  const {children, value, index, ...other} = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300
  }
}))

const tips = [
  "For all your general text purposes. Use for any names, titles, symbols, tickers, or any set of numbers that you won't perform operations on.",
  'Any numbers that do not contain decimals, i.e. whole numbers only.',
  'Any set of numbers that may contain fractions or decimals.',
  'Any set that only contains True or False values.',
  'Use for any set that contains Dates, formatted properly.'
]

export default function TableData(props) {
  const dataTypes = ['Text', 'Integer', 'Real', 'Boolean', 'Date']
  const [selectedTable, setSelecedTable] = React.useState(0)

  const handleChange = (event, newValue) => {
    setSelecedTable(newValue)
  }

  const classes = useStyles()

  return (
    <SimpleCard>
      <Grid container direction="column" alignItems="center">
        {/* <Typography variant="h4">{props.tableName.slice(props.tableName.indexOf('_') + 1)}</Typography> */}
        <AppBar position="static">
          <Tabs
            value={selectedTable}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            {props.tableNames.map(name => {
              return (
                <Tab
                  key={name}
                  label={name.slice(name.indexOf('_') + 1)}
                  {...a11yProps(0)}
                />
              )
            })}
          </Tabs>
        </AppBar>
        {props.tableData.map((table, index) => {
          return (
            <TabPanel value={selectedTable} key={index} index={index}>
              <List className={classes.root}>
                <ListSubheader>
                  <Grid
                    container
                    m={0}
                    p={0}
                    direction="row"
                    justify="space-around"
                  >
                    <Grid item m={0} p={0} xs={2} />
                    {dataTypes.map((element, j) => {
                      return (
                        <Grid m={0} p={0} item xs={1} key={element}>
                          <Tooltip title={tips[j]} arrow>
                            <Typography
                              component="span"
                              variant="body1"
                              key={element}
                            >
                              {element}
                            </Typography>
                          </Tooltip>
                        </Grid>
                      )
                    })}
                  </Grid>
                </ListSubheader>
                {Object.keys(table[props.tableNames[index]].rows[0]).map(
                  (element, i) => {
                    return (
                      <ListItem key={i}>
                        <Grid container direction="row" key={i}>
                          <DataTypeRow
                            tableName={props.tableNames[index]}
                            key={i}
                            element={element}
                            index={index}
                          />
                        </Grid>
                      </ListItem>
                    )
                  }
                )}
              </List>
            </TabPanel>
          )
        })}
      </Grid>
    </SimpleCard>
  )
}
function SimpleCard(props) {
  const useStyles = makeStyles({
    root: {
      margin: 15,
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
