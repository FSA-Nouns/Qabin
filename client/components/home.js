import React, {Component} from 'react'
import {connect} from 'react-redux'
import FileUpload from './file-upload'
import {getUserTables} from '../store/tables'
import Bouncer from 'react-data-bouncer'
import history from '../history'

export class Home extends Component {
  componentDidMount() {
    this.props.getUserTables(this.props.user)
  }
  render() {
    return (
      <Bouncer>
        <div>
          <h2>My Tables</h2>
          {this.props.tableNames.map((table, index) => {
            return <p key={index}>{table}</p>
          })}

          <button type="button" onClick={() => history.push('/queryBuilder')}>
            Continue to Query
          </button>
          <h2>Upload new Tables</h2>
          <FileUpload />
        </div>
      </Bouncer>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  files: state.files,
  tableNames: state.files.tableNames
})

const mapDispatchToProps = dispatch => {
  return {
    getUserTables: user => dispatch(getUserTables(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
