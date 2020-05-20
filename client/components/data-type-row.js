import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addHeaderType} from '../store/editData'
import {Button, Grid, Box} from '@material-ui/core'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'
import Crop75OutlinedIcon from '@material-ui/icons/Crop75Outlined'

export class DataTypeRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: 'text'
    }
  }

  componentDidMount() {
    if (this.props.clickCheck) {
      this.setState({clicked: this.props.clickCheck})
    } else {
      this.props.addHeaderType(this.props.element, 'text', this.props.tableName)
    }
  }

  handleClick = value => {
    this.setState({
      clicked: value
    })
    this.props.addHeaderType(this.props.element, value, this.props.tableName)
  }

  // eslint-disable-next-line complexity
  render() {
    let elemName = ''
    if (this.props.element.includes('_')) {
      let elemArr = this.props.element.split('_')
      elemArr.forEach((el, i) => {
        elemName += elemArr[i][0].toUpperCase() + elemArr[i].slice(1) + ' '
      })
    } else {
      elemName =
        this.props.element[0].toUpperCase() + this.props.element.slice(1)
    }
    return (
      <Grid container direction="row" justify="center" wrap="nowrap">
        <Box
          width="10%"
          height="7%"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          p={2}
          m={2}
          mb={0}
          sm={1}
          justifyContent="flex-start"
          borderRadius={4}
          border={0}
          bgcolor="info.main"
          color="info.contrastText"
        >
          {`${elemName}`}
        </Box>
        <Box p={2} mb={0} sm={1}>
          <Button
            style={{
              maxWidth: '80px',
              maxHeight: '45px',
              minWidth: '80px',
              minHeight: '45px'
            }}
            variant="contained"
            size="medium"
            color={this.state.clicked === 'text' ? 'primary' : 'default'}
            onClick={() => this.handleClick('text')}
          >
            {this.state.clicked === 'text' ? `X` : ''}
          </Button>
        </Box>
        <Box p={2} mb={0} sm={1}>
          <Button
            style={{
              maxWidth: '80px',
              maxHeight: '45px',
              minWidth: '80px',
              minHeight: '45px'
            }}
            size="medium"
            variant="contained"
            color={this.state.clicked === 'integer' ? 'primary' : 'default'}
            onClick={() => this.handleClick('integer')}
          >
            {this.state.clicked === 'integer' ? `X` : ''}
          </Button>
        </Box>
        <Box p={2} mb={0} sm={1}>
          <Button
            style={{
              maxWidth: '80px',
              maxHeight: '45px',
              minWidth: '80px',
              minHeight: '45px'
            }}
            size="medium"
            variant="contained"
            color={
              this.state.clicked === 'double precision' ? 'primary' : 'default'
            }
            onClick={() => this.handleClick('double precision')}
          >
            {this.state.clicked === 'double precision' ? `X` : ''}
          </Button>
        </Box>
        <Box p={2} mb={0} sm={1}>
          <Button
            style={{
              maxWidth: '80px',
              maxHeight: '45px',
              minWidth: '80px',
              minHeight: '45px'
            }}
            size="medium"
            variant="contained"
            color={this.state.clicked === 'boolean' ? 'primary' : 'default'}
            onClick={() => this.handleClick('boolean')}
          >
            {this.state.clicked === 'boolean' ? `X` : ''}
          </Button>
        </Box>
        <Box p={2} mb={0} sm={1}>
          <Button
            style={{
              maxWidth: '80px',
              maxHeight: '45px',
              minWidth: '80px',
              minHeight: '45px'
            }}
            size="medium"
            variant="contained"
            color={this.state.clicked === 'date' ? 'primary' : 'default'}
            onClick={() => this.handleClick('date')}
          >
            {this.state.clicked === 'date' ? `X` : ''}
          </Button>
        </Box>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  clickCheck: state.tableData.filter(table => !!table[ownProps.tableName])[0][
    ownProps.tableName
  ].headers[ownProps.element]
})

const mapDispatchToProps = dispatch => {
  return {
    addHeaderType: (header, type, table) =>
      dispatch(addHeaderType(header, type, table))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTypeRow)
