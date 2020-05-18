/* eslint-disable complexity */
import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import {connect} from 'react-redux'
import StickyHeaderTable from './query-result-table'

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
          <Typography variant="subtitle2">{children}</Typography>
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
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}))

const makeColumns = (tableName, tableData, tableResult) => {
  let tableObj = tableData.find(table => Object.keys(table)[0] === tableName)
  let headers = tableObj[tableName].headers
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

function ResultTabs(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {props.resultTables.map(table => {
            let tableName = Object.keys(table)[0]

            return (
              <Tab
                key={tableName}
                label={tableName.slice(tableName.indexOf('_') + 1)}
                {...a11yProps(0)}
              />
            )
          })}
        </Tabs>
      </AppBar>

      {props.resultTables.map((table, index) => {
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
          <TabPanel key={index} value={value} index={index}>
            <StickyHeaderTable rows={table[tableName].rows} columns={columns} />
          </TabPanel>
        )
      })}
    </div>
  )
}

// let parseRow = (row, columns) => {
//     return columns.map(col => {
//         return row[col]
//     })
// }

// let makeRows = (queryRows, columns) => {
//     queryRows.reduce((rows, row) => {
//         rows.push(parseRow(row, columns))

//         return rows
//     }, [])
// }

const mapStateToProps = state => ({
  tableData: state.tableData
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ResultTabs)
