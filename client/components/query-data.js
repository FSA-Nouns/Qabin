import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {gotTables} from '../store/editData'
import TableExtract from './table-extract'
import QueryRow from './query-row'

export class QueryData extends Component {
  componentDidMount() {
    this.props.gotTables(this.props.user.id, this.props.tableNames)
  }

  render() {
    return (
      <div>
        {this.props.tableData.map((table, index) => {
          let tableHeaders = Object.keys(table[Object.keys(table)[0]][0])
          return (
            <ul key={table}>
              <h2>{this.props.tableName}</h2>
              {tableHeaders.map((header, index) => {
                return (
                  <QueryRow
                    key={index}
                    tableName={Object.keys(table)[0]}
                    field={header}
                  />
                )
              })}
            </ul>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  tableNames: state.files.tables,
  tableData: state.tableData,
  queryBundle: state.queryBundle
})

const mapDispatchToProps = dispatch => ({
  gotTables: (userId, tables) => {
    dispatch(gotTables(userId, tables))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(QueryData)
