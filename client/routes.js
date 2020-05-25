import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, EditData} from './components'
import {me} from './store'
import QueryData from './components/query-data'
import QueryResult from './components/query-result'
import Home from './components/home'
import Navbar from './components/navbar'
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

/**
 * Main browser URL and paired components set here
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Grid container>
        <Grid item xs={12}>
          <Route path="/" component={Navbar} />
        </Grid>
        <MainGrid>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {isLoggedIn && (
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/home" component={Home} />
                <Route path="/editData" component={EditData} />
                <Route path="/queryBuilder" component={QueryData} />
                <Route path="/results" component={QueryResult} />
              </Switch>
            )}
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </MainGrid>
      </Grid>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

function MainGrid(props) {
  const useStyles = makeStyles(() => ({
    root: {
      margin: '1rem'
    }
  }))

  const classes = useStyles()

  return (
    <Grid item className={classes.root} container justify="center" xs={12}>
      {props.children}
    </Grid>
  )
}

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
