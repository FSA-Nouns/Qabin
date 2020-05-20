import React, {Component} from 'react'
import {connect} from 'react-redux'
import {orderBy} from '../store/query'
import {
  Checkbox,
  MenuItem,
  Select,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader
} from '@material-ui/core'

import {makeStyles} from '@material-ui/styles'
import theme from '../theme'

class OrderBy extends Component {
  constructor() {
    super()
    this.state = {
      orderByArray: []
    }
    this.toggleOrderBy = this.toggleOrderBy.bind(this)
    this.toggleDirection = this.toggleDirection.bind(this)
  }

  //this needs to be re-worked to preserve order
  toggleOrderBy(ev) {
    let modified = this.state.orderByArray
    let order = this.state.orderByArray.map(x => Object.keys(x)[0])

    if (order.includes(ev.target.value)) {
      modified = this.state.orderByArray.filter(
        obj => Object.keys(obj)[0] !== ev.target.value
      )
      this.setState({orderByArray: modified})
    } else {
      modified.push({[ev.target.value]: 'ASC'})
      this.setState({orderByArray: modified})
    }
    this.props.orderBy(this.props.tableName, modified)
  }

  toggleDirection(ev, field) {
    let modified = this.state.orderByArray
    modified = modified.map(header => {
      if (Object.keys(header)[0] === field) {
        return {[field]: ev.target.value}
      }
      return header
    })
    this.setState({orderByArray: modified})
    this.props.orderBy(this.props.tableName, modified)
  }

  render() {
    return (
      <OrderList>
        {this.props.queryBundle[this.props.tableName].fields.map(selected => {
          const labelId = `checkbox-list-label-${selected}`
          return (
            <ListItem
              key={selected}
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Order By
                </ListSubheader>
              }
              role={undefined}
              dense
              separator
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={
                    !!this.state.orderByArray.filter(
                      obj => Object.keys(obj)[0] === selected
                    ).length
                  }
                  tabIndex={-1}
                  onChange={this.toggleOrderBy}
                  value={selected}
                  inputProps={{'aria-labelledby': labelId}}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={selected} />
              <ListItemSecondaryAction>
                <Select
                  labelId="label"
                  id="select"
                  onChange={ev => this.toggleDirection(ev, selected)}
                >
                  <MenuItem value="ASC">Asc</MenuItem>
                  <MenuItem value="DESC">Desc</MenuItem>
                </Select>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </OrderList>
    )
  }
}

const OrderList = props => {
  const useStyles = makeStyles(() => ({
    root: {
      width: '100%',
      maxWidth: 240,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 240
    },
    subheader: {
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
      opacity: 0.7,
      fontWeight: 800
    }
  }))

  const classes = useStyles()

  return (
    <List
      className={classes.root}
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          className={classes.subheader}
        >
          Order By
        </ListSubheader>
      }
    >
      {props.children}
    </List>
  )
}

const mapStateToProps = state => ({
  queryBundle: state.queryBundle
})

const mapDispatchToProps = dispatch => {
  return {
    orderBy: (tableName, orderByArray) =>
      dispatch(orderBy(tableName, orderByArray))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBy)
