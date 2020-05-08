import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {gotTables} from '../store/editData'
import TableExtract from './table-extract'

export class QueryData extends Component {
  componentDidMount() {
    this.props.gotTables(this.props.user.id, this.props.tableNames)
  }

  render() {
    return (
      <div>
        {this.props.tableData.map(table =>
          Object.keys(table[0]).map(header => (
            <QueryRow element={table[header]} header={header} />
          ))
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  tableNames: state.files.tables,
  tableData: state.tableData
})

const mapDispatchToProps = dispatch => ({
  gotTables: (userId, tables) => {
    dispatch(gotTables(userId, tables))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(query - data)
