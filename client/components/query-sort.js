import React, {Component} from 'react'
import {connect} from 'react-redux'
import {orderBy, groupBy, limitTo} from '../store/query'
import Form from 'react-bootstrap/Form'

export class QuerySort extends Component {
  render() {
    console.log(
      'this.props.queryBundle[this.props.tableName]',
      this.props.queryBundle[this.props.tableName]
    )
    return (
      <div>
        <Form>
          Group By
          <p>
            {this.props.queryBundle[this.props.tableName].fields.map(
              selected => (
                <Form.Check
                  inline
                  key={`inline-${selected}`}
                  type="checkbox"
                  label={selected}
                />
              )
            )}
          </p>
        </Form>
        <Form>
          Order By
          <p>
            {this.props.queryBundle[this.props.tableName].fields.map(
              (selected, index) => (
                <Form.Check
                  type="checkbox"
                  inline
                  key={`inline-${selected}`}
                  label={selected}
                />
              )
            )}
          </p>
        </Form>
        <Form>
          <Form.Row>
            Limit results to
            <Form.Control type="text" placeholder="this many rows " />
          </Form.Row>
        </Form>
      </div>
    )
  }
}

// for disabled checkboxes to appear <Form.Check disabled type="checkbox" label={selected} />

const mapStateToProps = state => ({
  queryBundle: state.queryBundle
})

const mapDispatchToProps = dispatch => {
  return {
    orderBy: (tableName, orderByArray) =>
      dispatch(orderBy(tableName, orderByArray)),
    groupBy: (tableName, groupByArray) =>
      dispatch(groupBy(tableName, groupByArray)),
    limitTo: (tableName, limit) => dispatch(limitTo(tableName, limit))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuerySort)
