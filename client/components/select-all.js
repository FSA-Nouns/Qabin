import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import {selectAll, unselectAll, removeFieldElement} from '../store/query'

// SelectAll React Class comp. provides a button that a user can click on
// to select to query every column in a table.
export class SelectAll extends Component {
  // SelectAll comp. uses boolean clicked property on state based on what's on the store
  constructor(props) {
    super(props)
    this.state = {
      clicked: this.props.selectAllState
    }
  }

  // On user's click of the Select All button, we check state.
  // If state is false or undefined, we set the selectAll prop. on
  // Redux to be true and set the local clicked state to true.
  // Else, we set selectAll prop. to false, set local state to false,
  // and remove queried field elements from the queryBundle on store.
  handleClick() {
    if (!this.state.clicked) {
      this.props.selectAll(this.props.tableName)
      this.setState({clicked: true})
    } else {
      this.props.unselectAll(this.props.tableName)
      this.setState({clicked: false})
      Object.keys(this.props.table.headers).forEach(field =>
        this.props.removeFieldElement(this.props.tableName, field)
      )
    }
  }

  // On update of component, we check if the selectAll prop. on the store
  // matches the local clicked state, and if not, we set the local clicked state to match
  // what's on the store.
  componentDidUpdate() {
    if (this.props.selectAllState !== this.state.clicked)
      this.setState({clicked: !this.state.clicked})
  }

  // Rendering a button that performs the handleClick function upon user's click
  render() {
    return (
      <Button
        variant="contained"
        color={this.state.clicked ? 'primary' : 'default'}
        onClick={() => this.handleClick()}
      >
        Select All Fields
      </Button>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectAllState: state.queryBundle[ownProps.tableName].selectAll
})

const mapDispatchToProps = dispatch => ({
  selectAll: tableName => dispatch(selectAll(tableName)),
  unselectAll: tableName => dispatch(unselectAll(tableName)),
  removeFieldElement: (tableName, field) =>
    dispatch(removeFieldElement(tableName, field))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectAll)
