import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Grid, Card, List, ListItem, Typography, Button} from '@material-ui/core'
import ProgressionBar from './stepper'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import {grey} from '@material-ui/core/colors'

const useStyles = makeStyles(() => ({
  authBox: {
    width: '100%'
  },
  root: {
    width: '100%'
  },
  progressionContainer: {
    padding: '2rem',
    width: '100%'
  },
  title: {
    flexGrow: 1
  }
}))

const Navbar = props => {
  const classes = useStyles()

  const {handleClick, isLoggedIn} = props
  return (
    <Grid container alignItems="center" className={classes.root}>
      <AppBar xs={12} position="static">
        <Toolbar>
          <Typography
            variant="h6"
            onClick={() => props.history.push('/home')}
            className={classes.title}
          >
            <a className="logo" href="#">
              Qabin
            </a>
          </Typography>
          <Grid
            item
            container
            justify="space-around"
            xs={12}
            alignItems="center"
            sm={3}
          >
            {isLoggedIn ? (
              <Grid
                container
                className={classes.authBox}
                alignItems="center"
                justify="center"
              >
                {/* The navbar will show these links after you log in */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                >
                  Logout
                </Button>
              </Grid>
            ) : (
              <Grid
                item
                container
                className={classes.authBox}
                alignItems="center"
                justify="space-evenly"
              >
                {/* The navbar will show these links before you log in */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => props.history.push('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => props.history.push('/signup')}
                >
                  Sign Up
                </Button>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid
        xs={12}
        container
        justify="center"
        className={classes.progressionContainer}
      >
        <ProgressionBar xs={6} location={props.location} />
      </Grid>
    </Grid>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
