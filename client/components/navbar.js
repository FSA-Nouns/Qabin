import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Grid, Card, List, ListItem, Typography, Button} from '@material-ui/core'
import ProgressionBar from './stepper'
import {makeStyles} from '@material-ui/core/styles'
import {grey} from '@material-ui/core/colors'

const useStyles = makeStyles(() => ({
  authBox: {
    width: '100%',
    marginBottom: 30
  },
  root: {
    width: '100%'
  },
  authLink: {
    padding: 10,
    backgroundColor: '#3f51b5',
    color: 'white',
    fontSize: '0.875rem',
    minWidth: '64px',
    boxSizing: 'border-box',
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    lineHeight: '1.75',
    borderRadius: '8px',
    letterSpacing: '0.02857em',
    '&:hover': {
      background: '#32439F'
    }
  }
}))

const Navbar = props => {
  const classes = useStyles()

  const {handleClick, isLoggedIn} = props
  return (
    <Grid container justify="space-between" className={classes.root}>
      <Grid xs={1} />
      <ProgressionBar xs={6} location={props.location} />
      <Grid item container justify="space-around" xs={12} sm={3}>
        {isLoggedIn ? (
          <Grid
            container
            className={classes.authBox}
            alignItems="flex-end"
            justify="space-evenly"
          >
            {/* The navbar will show these links after you log in */}
            <Link to="/home" className={classes.authLink}>
              <Typography variant="subtitle1">Home</Typography>
            </Link>
            <a href="#" className={classes.authLink} onClick={handleClick}>
              <Typography variant="subtitle1">Logout</Typography>
            </a>
          </Grid>
        ) : (
          <Grid
            item
            container
            className={classes.authBox}
            alignItems="flex-end"
            justify="space-evenly"
          >
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className={classes.authLink}>
              <Typography variant="subtitle1">Login</Typography>
            </Link>
            <Link to="/signup" className={classes.authLink}>
              <Typography variant="subtitle1">Sign Up</Typography>
            </Link>
          </Grid>
        )}
      </Grid>
      <Grid xs={1} />
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
