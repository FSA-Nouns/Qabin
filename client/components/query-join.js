import React from 'react'
import {connect} from 'react-redux'
// import {useState} from 'react'
import {
  addJoinElement,
  removeJoinElement,
  setJoinColumnElement
} from '../store/query'
//
let joinType
class Join extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      join: false,
      table1: '',
      table2: ''
    }
    this.toggleJoin = this.toggleJoin.bind(this)
    this.handleJoinElement = this.handleJoinElement.bind(this)
    this.handleColumnElement = this.handleColumnElement.bind(this)
  }

  toggleJoin() {
    if (this.state.join === true) {
      this.props.removeJoinElement(this.props.data.tableName, this.props.index)
      return this.setState({join: false})
    } else {
      this.setState({join: true})
    }
  }

  handleJoinType(event) {
    event.preventDefault()
    joinType = event.target.value
  }

  handleJoinElement(event, index) {
    event.preventDefault()
    let joinArray = event.target.value
    let table = this.props.data.tableName
    if (this.state.join === true) {
      this.props.removeJoinElement(table, index)
      this.props.addJoinElement(table, joinArray, joinType, this.props.index)
      return this.setState({table1: table, table2: joinArray})
    }
  }

  handleColumnElement(table1, table2, event, index) {
    event.preventDefault()
    let joinArray = `${table2}.${event.target.value}`
    this.props.setJoinColumnElement(table1, joinArray, index, this.props.index)
  }

  render() {
    let table1 = this.state.table1
    let table2 = this.state.table2
    return (
      <div className="add-join">
        <button onClick={this.toggleJoin} className="add-join" type="button">
          {this.state.join ? 'Remove Join' : 'Add Join'}
        </button>

        {this.state.join ? (
          <span>
            <select
              name="type"
              onChange={this.handleJoinType}
              className="dropdown"
            >
              <option value="TYPE">Join Type</option>
              <option value="INNER">Inner Join</option>
              <option value="LEFT">Left Join</option>
              <option value="RIGHT">Right Join</option>
              <option value="FULL">Full Join</option>
            </select>

            <select
              name="table"
              onChange={event =>
                this.handleJoinElement(event, this.props.index)
              }
              className="dropdown"
            >
              <option>Table to Join</option>
              {this.props.data.tableDatas
                .map((table, index) => (
                  <option key={index}>{Object.keys(table)}</option>
                ))
                .filter(
                  table => table.props.children[0] !== this.props.data.tableName
                )}
              Table Selection
            </select>

            <select
              name="element1"
              onChange={event =>
                this.handleColumnElement(table1, table1, event, 2)
              }
              className="dropdown"
            >
              <option>Column from this table</option>
              {table1 !== undefined ? (
                this.props.data.tableDatas.map(table => {
                  if (table[table1] !== undefined) {
                    return Object.keys(table[table1].rows[0]).map(column => (
                      <option key={column}>{column}</option>
                    ))
                  }
                })
              ) : (
                <option>Not Applicable</option>
              )}
              Table 1 Column Selection
            </select>

            <select
              name="element2"
              onChange={event =>
                this.handleColumnElement(table1, table2, event, 3)
              }
              className="dropdown"
            >
              <option>Column from table to be joined</option>
              {table2 !== undefined ? (
                this.props.data.tableDatas.map(table => {
                  if (table[table2] !== undefined) {
                    return Object.keys(table[table2].rows[0]).map(column => (
                      <option key={column}>{column}</option>
                    ))
                  }
                })
              ) : (
                <option>Not Applicable</option>
              )}
              Table 2 Column Selection
            </select>

            {/* <button onClick={this.handleConfirmJoin} >Confirm Join</button> */}
          </span>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return {
    addJoinElement: (tableName, joinArray, joinType, joinId) =>
      dispatch(addJoinElement(tableName, joinArray, joinType, joinId)),
    removeJoinElement: (tableName, joinId) =>
      dispatch(removeJoinElement(tableName, joinId)),
    setJoinColumnElement: (tableName, joinArray, index, joinId) =>
      dispatch(setJoinColumnElement(tableName, joinArray, index, joinId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join)
