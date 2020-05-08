import React, {Component} from 'react'
import {connect} from 'react-redux'

export class QueryRow extends Component {
  render() {
    return (
      <li className="query-row">
        <input name={this.props.field} type="checkbox" />
        <span>{this.props.field}</span>
        <button
          className="filter-toggle"
          onClick={e => e.target.focus()}
          type="button"
        >
          Filter
        </button>
        <form className="filter-form">
          <select>
            <option>{`>`}></option>
          </select>
          <input />
        </form>
      </li>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(QueryRow)
