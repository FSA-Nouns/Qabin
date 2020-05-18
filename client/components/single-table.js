import React from 'react'
import QueryRow from './query-row'
import QuerySort from './query-sort'
import Join from './query-join'
import AggregateSelector from './aggregate-selector'
import {Grid} from '@material-ui/core'

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
        <table className="single-table-view">
          <thead>
            <tr>
              <th>{props.tableName.slice(props.tableName.indexOf('_') + 1)}</th>
              <td>
                {props.location.pathname === '/queryBuilder' ? (
                  <Join data={props} index={0} />
                ) : (
                  ''
                )}
              </td>
              <td>
                {props.location.pathname === '/queryBuilder' ? (
                  <Join data={props} index={1} />
                ) : (
                  ''
                )}
              </td>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
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
