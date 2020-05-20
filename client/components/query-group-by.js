import React, {Component} from 'react'
import {connect} from 'react-redux'
import {groupBy} from '../store/query'

import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core'

import {makeStyles} from '@material-ui/styles'
import theme from '../theme'

class GroupBy extends Component {
  constructor() {
    super()
    this.state = {
      groupByArray: []
    }
    this.toggleGroupBy = this.toggleGroupBy.bind(this)
  }

  toggleGroupBy(ev) {
    let modified = []
    if (this.state.groupByArray.includes(ev.target.value)) {
      modified = this.state.groupByArray.filter(
        field => field !== ev.target.value
      )
      if (this.state.groupByArray) {
        this.setState({groupByArray: modified})
      }
    } else {
      modified = [ev.target.value, ...this.state.groupByArray]
      this.setState({groupByArray: modified})
    }
    this.props.groupBy(this.props.tableName, modified)
  }

  render() {
    return (
      <OrderList>
        {this.props.queryBundle[this.props.tableName].fields.map(selected => {
          const labelId = `checkbox-list-label-${selected}`
          return (
            <ListItem key={selected} role={undefined} dense separator>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={this.state.groupByArray.indexOf(selected) !== -1}
                  tabIndex={-1}
                  onChange={this.toggleGroupBy}
                  value={selected}
                  inputProps={{'aria-labelledby': labelId}}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={selected} />
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
      height: 240
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
          Group By
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
    groupBy: (tableName, groupByArray) =>
      dispatch(groupBy(tableName, groupByArray))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupBy)
