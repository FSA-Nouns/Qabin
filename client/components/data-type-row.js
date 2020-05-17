import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addHeaderType} from '../store/editData'
import {Button, Grid} from '@material-ui/core'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'
import Crop75OutlinedIcon from '@material-ui/icons/Crop75Outlined'

export class DataTypeRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: ''
    }
  }

  handleClick = value => {
    this.setState({
      clicked: value
    })
    this.props.addHeaderType(this.props.element, value, this.props.tableName)
  }

  render() {
    return (
      <Grid>
        <Button
          variant="contained"
          color={this.state.clicked === 'text' ? 'primary' : 'secondary'}
          onClick={() => this.handleClick('text')}
        />
        <Button
          variant="contained"
          color={this.state.clicked === 'integer' ? 'primary' : 'secondary'}
          onClick={() => this.handleClick('integer')}
        />
        <Button
          variant="contained"
          color={
            this.state.clicked === 'double precision' ? 'primary' : 'secondary'
          }
          onClick={() => this.handleClick('double precision')}
        />
        <Button
          variant="contained"
          color={this.state.clicked === 'boolean' ? 'primary' : 'secondary'}
          onClick={() => this.handleClick('boolean')}
        />
        <Button
          variant="contained"
          color={this.state.clicked === 'date' ? 'primary' : 'secondary'}
          onClick={() => this.handleClick('date')}
        />
      </Grid>
      // <tr>
      //   <td>{props.element}</td>
      //   <td>
      //     <select
      //       onChange={e =>
      //         props.addHeaderType(props.element, e.target.value, props.tableName)
      //       }
      //       className="dropdown"
      //     >
      //       <option value="">Choose Type</option>
      //       <option value="integer">Integer</option>
      //       <option value="double precision">Float</option>
      //       <option value="text">Text</option>
      //       <option value="boolean">Boolean</option>
      //       <option value="date">Date</option>
      //     </select>
      //   </td>
      // </tr>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return {
    addHeaderType: (header, type, table) =>
      dispatch(addHeaderType(header, type, table))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTypeRow)
