import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {
  Grid,
  List,
  ListItem,
  Box,
  Tabs,
  Tab,
  Card,
  Typography,
  AppBar
} from '@material-ui/core'
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
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  )
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
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300
  }
}))

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

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

export default function TableExtract(props) {
  const [selectedTable, setSelecedTable] = useState(0)

  const handleChange = (event, newValue) => {
    setSelecedTable(newValue)
  }

  const classes = useStyles()

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
    // <div>
    //   <h2>{props.tableName}</h2>
    //   <table className="table-Extract">
    //     <thead>
    //       <tr>
    //         {Object.keys(props.tableData[props.tableName].rows[0]).map(
    //           (column, index) => <th key={index}>{column}</th>
    //         )}
    //       </tr>
    //     </thead>

    //     <tbody>
    //       {props.tableData[props.tableName].rows.map((rows, index) => {
    //         let data = props.tableData[props.tableName].rows[index]
    //         let values = Object.values(rows)
    //         return (
    //           <tr key={index}>
    //             {values.map((element, indexA) => {
    //               return <td key={indexA}>{element}</td>
    //             })}
    //           </tr>
    //         )
    //       })}
    //     </tbody>
    //   </table>
    // </div>
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
