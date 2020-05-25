import React, {useState} from 'react'
import DataTypeRow from './data-type-row'
import PropTypes from 'prop-types'
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

// Tab Panel component used for rendering tabs for table selection
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

// Setting propTypes for table
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

// Function to return styling for tabs
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

// List stylings
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 290
  }
}))

// Tooltips message array
const tips = [
  "For all your general text purposes. Use for any names, titles, symbols, tickers, or any set of numbers that you won't perform operations on.",
  'Any numbers that do not contain decimals, i.e. whole numbers only.',
  'Any set of numbers that may contain fractions or decimals.',
  'Any set that only contains True or False values.',
  'Use for any set that contains Dates, formatted properly.'
]

export default function TableData(props) {
  // Instantiating array of supported dataTypes
  const dataTypes = ['Text', 'Integer', 'Real', 'Boolean', 'Date']
  // Using React hooks to support tabs UX
  const [selectedTable, setSelecedTable] = useState(0)

  // Function to handle table selection change
  const handleChange = (event, newValue) => {
    setSelecedTable(newValue)
  }

  const classes = useStyles()

  return (
    <Grid item>
      <Grid container direction="column" alignItems="center" wrap="nowrap">
        {/* <Typography variant="h4">{props.tableName.slice(props.tableName.indexOf('_') + 1)}</Typography> */}
        {/* AppBar componene for table selection */}
        <AppBar position="static">
          <Tabs
            value={selectedTable}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            {props.tableData.map(name => {
              return (
                <Tab
                  key={Object.keys(name)[0]}
                  label={Object.keys(name)[0].slice(
                    Object.keys(name)[0].indexOf('_') + 1
                  )}
                  {...a11yProps(0)}
                />
              )
            })}
          </Tabs>
        </AppBar>
        {/* Mapping over each table to render panels for each tables corresponding tab component. */}
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
                    wrap="nowrap"
                  >
                    <Grid item m={0} p={0} xs={2} />
                    {/* Mapping over each dataType to render its corresponding Tooltip component. */}
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
                <ListItem key={index}>
                  <Grid container direction="column" wrap="nowrap">
                    {/* Mapping over the headers of each column from the .csv file to render each data type selection row. */}
                    {Object.keys(table[Object.keys(table)[0]].rows[0]).map(
                      (element, i) => {
                        return (
                          <Grid container direction="row" key={i} wrap="nowrap">
                            <Grid item xs={12}>
                              <DataTypeRow
                                tableName={Object.keys(table)[0]}
                                key={i}
                                element={element}
                              />
                            </Grid>
                          </Grid>
                        )
                      }
                    )}
                  </Grid>
                </ListItem>
              </List>
            </TabPanel>
          )
        })}
      </Grid>
    </Grid>
  )
}

function SimpleCard(props) {
  const useStyles1 = makeStyles({
    root: {
      margin: 15
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  })

  const classes = useStyles1()

  return <Card className={classes.root}>{props.children}</Card>
}
