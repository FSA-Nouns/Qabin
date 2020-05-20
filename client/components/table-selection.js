import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid, Button, Card, Box, Typography} from '@material-ui/core'
import {selectTable, unselectTable} from '../store/selectedTables'
import {reset} from '../store/query'
import {makeStyles} from '@material-ui/core/styles'

function SimpleCard(props) {
  const useStyles1 = makeStyles({
    root: {
      margin: 15,
      padding: 5
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  })

  const classes = useStyles1()

  return <Card className={classes.root}>{props.children}</Card>
}

export class TableSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: []
    }
  }

  handleClick = tableName => {
    if (!this.state.clicked.includes(tableName)) {
      const newArr = this.state.clicked.slice()
      const newState = [...newArr, tableName]
      this.setState({clicked: newState})
      this.props.selectTable(tableName)
    } else {
      const newState = this.state.clicked.filter(table => tableName !== table)
      this.setState({clicked: newState})
      this.props.unselectTable(tableName)
    }
  }

  render() {
    return (
      <SimpleCard>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography component="span" variant="h5" align="justify">
              Select Tables:
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={1} direction="row">
              {this.props.tables.map(table => {
                return (
                  <Grid item xs={6} key={table}>
                    <Button
                      variant="contained"
                      size="medium"
                      color={
                        this.state.clicked.includes(table)
                          ? 'primary'
                          : 'default'
                      }
                      onClick={() => this.handleClick(table)}
                    >
                      {`${table.slice(table.indexOf('_') + 1)}`}
                    </Button>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </SimpleCard>
    )
  }
}

const mapStateToProps = state => ({
  tables: Object.keys(state.queryBundle)
})

const mapDispatchToProps = dispatch => {
  return {
    selectTable: table => {
      dispatch(selectTable(table))
    },
    unselectTable: table => {
      dispatch(unselectTable(table))
      dispatch(reset(table))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableSelection)
