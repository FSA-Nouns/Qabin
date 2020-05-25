import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Box, Tabs, Tab, Card, Typography, AppBar} from '@material-ui/core'
import StickyHeaderTable from './query-result-table'

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

// Function to return styling for tabs

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

// Setting propTypes for table
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

// Function  that returns array of each column header
const makeColumns = (tableName, tableData, tableResult) => {
  return Object.keys(tableResult[tableName].rows[0]).reduce(
    (columns, header) => {
      let column = {
        label: header,
        id: header,
        minWidth: 50,
        align: 'right'
      }

      columns.push(column)
      return columns
    },
    []
  )
}

export default function TableExtract(props) {
  // Using React hooks to support tabs UX
  const [selectedTable, setSelecedTable] = useState(0)

  // Function to handle table selection change
  const handleChange = (event, newValue) => {
    setSelecedTable(newValue)
  }

  return (
    <Grid container direction="column" alignItems="center" wrap="nowrap">
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
      {/* Mapping over each uploaded table to render corresponding sample table. */}
      {props.tableData.map((table, index) => {
        let tableName = Object.keys(table)[0]

        if (!table[tableName].rows.length) {
          return (
            <TabPanel key={index} value={value} index={index}>
              <Typography align="center" variant="h5">
                No Results
              </Typography>
            </TabPanel>
          )
        }

        let columns = makeColumns(tableName, props.tableData, table)

        return (
          <TabPanel key={index} index={index} value={selectedTable}>
            <StickyHeaderTable rows={table[tableName].rows} columns={columns} />
          </TabPanel>
        )
      })}
    </Grid>
  )
}
