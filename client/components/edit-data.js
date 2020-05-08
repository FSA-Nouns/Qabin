import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {gotTables} from '../store/editData'

export class EditData extends Component {
  // constructor() {
  //     super()
  // }
  componentDidMount() {
    console.log('TABLES IN COMPONENT', this.props.tables)
    this.props.gotTables(this.props.user.id, this.props.tables)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div className="big-container">
          <div className="border" />
        </div>
        <div className="table-extract-container" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  tables: state.files.tables
})

const mapDispatchToProps = dispatch => ({
  gotTables: (userId, tables) => dispatch(gotTables(userId, tables))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditData)
