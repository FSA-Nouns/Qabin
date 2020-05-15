import React from 'react'
import {connect} from 'react-redux'
// import {useState} from 'react'
import {
  addJoinElement,
  removeJoinElement,
  setJoinColumn1Element,
  setJoinColumnElement,
  removeJoinColumnElement
} from '../store/query'

let joinType
class Join extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      join: false,
      table1: '',
      table2: ''
      // column1: false,
      // column2: false
    }
    this.toggleJoin = this.toggleJoin.bind(this)
    this.handleJoinElement = this.handleJoinElement.bind(this)
    this.handleColumnElement = this.handleColumnElement.bind(this)
  }

  toggleJoin() {
    if (this.state.join === true) {
      this.props.removeJoinElement(this.props.data.tableName)
      return this.setState({join: false})
    } else {
      //   this.props.addJoinElement(this.props.data.tableName)
      this.setState({join: true})
    }
  }

  handleJoinType(event) {
    event.preventDefault()
    joinType = event.target.value
  }

  handleJoinElement(event) {
    event.preventDefault()
    // console.log(typeof this.props.data.tableName, 'this.props in handle join element method')
    // console.log(this.state.join, 'this.state.join in handle join element method')
    let joinArray = event.target.value
    let table = this.props.data.tableName
    if (this.state.join === true) {
      this.props.removeJoinElement(table, 0)
      this.props.addJoinElement(table, joinArray, joinType)
      return this.setState({table1: table, table2: joinArray})
      // , table2: joinArray
      // console.log('this.state in handle join element after setstate of table1', this.state)
    }

    console.log('exited if in handle join element')
  }

  handleColumnElement(table1, table2, event, index) {
    event.preventDefault()
    let joinArray = `${table2}.${event.target.value}`
    // if (this.state.column2 === false) {
    this.props.setJoinColumnElement(table1, joinArray, index)
    //   return this.setState({column2: true})
    // } else {
    //   // this.props.removeJoinColumnElement(table1, index)
    //   this.props.setJoinColumnElement(table1, joinArray, index)
    // return this.setState({column1: true})
  }

  //   handleConfirmJoin(table1, table2, event) {
  //     let index = 5
  //     let joinArray = `${table2}.${event.target.value}`
  //     if (this.state.column2 === true) {
  //       this.props.setJoinColumn2Element(table1, joinArray)
  //       return this.setState({column2: true})
  //     } else {
  //       this.props.removeJoinColumnElement(table1, index)
  //       this.props.setJoinColumn2Element(table1, joinArray)
  //       // return this.setState({column1: true})
  //     }
  //   }

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
              onChange={this.handleJoinElement}
              className="dropdown"
            >
              <option>Table to Join</option>
              {this.props.data.tableData
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
              {console.log(
                'this.props element1 dropdown',
                this.props.data.tableData
              )}
              {console.log('this.props element1 dropdown table1', table1)}
              {console.log('this.props element1 dropdown table1', this.state)}
              {table1 !== undefined ? (
                this.props.data.tableData.map(table => {
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
              {console.log(
                'this.props element2 dropdown',
                this.props.data.tableData
              )}
              {console.log('this.props element2 dropdown table1', table2)}
              {console.log('this.props element2 dropdown table1', this.state)}
              {table2 !== undefined ? (
                this.props.data.tableData.map(table => {
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
    addJoinElement: (tableName, joinArray, joinType) =>
      dispatch(addJoinElement(tableName, joinArray, joinType)),
    removeJoinElement: (tableName, joinArray) =>
      dispatch(removeJoinElement(tableName, joinArray)),
    setJoinColumnElement: (tableName, joinArray, index) =>
      dispatch(setJoinColumnElement(tableName, joinArray, index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join)
