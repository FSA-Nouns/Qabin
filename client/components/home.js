import {makeStyles} from '@material-ui/core/styles'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import FileUpload from './file-upload'
import {getUserTables, deleteUserTable} from '../store/tables'
import Bouncer from 'react-data-bouncer'
import history from '../history'
import HomeSteps from './home-steps'
import {Grid, Card, List, ListItem, Typography, Button} from '@material-ui/core'
import {parseFiles} from '../store/upload'
import DescriptionIcon from '@material-ui/icons/Description'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

// Home page component: renders currently loaded tables for this user on db
// and allows users to upload .csv files.
export class Home extends Component {
  componentDidMount() {
    this.props.getUserTables(this.props.user)
  }
  render() {
    return (
      <Bouncer>
        <Grid container spacing={4}>
          <Grid item sm={3}>
            {/* Card to display instructions for user */}
            <SimpleCard>
              <HomeSteps />
            </SimpleCard>
          </Grid>
          <Grid item xs={12} sm={5}>
            {/* Card to display tables user currently has stored on database */}
            <SimpleCard>
              <Typography variant="h5">My Tables</Typography>
              <List component="nav">
                {this.props.tableNames.length ? (
                  this.props.tableNames.map((table, index) => {
                    return (
                      <ListItem key={index} divider={true}>
                        <ListItemAvatar>
                          <Avatar>
                            <DescriptionIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={table.slice(table.indexOf('_') + 1)}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() =>
                              this.props.deleteUserTable(this.props.user, table)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                  })
                ) : (
                  <Typography variant="subtitle1">
                    You have no tables yet.
                  </Typography>
                )}
              </List>
            </SimpleCard>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="space-between"
            xs={12}
            sm={4}
          >
            {/* Card for file upload functionality. */}
            <SimpleCard>
              <FileUpload />
            </SimpleCard>
            <br />
            <Grid item container alignItems="center">
              {/*
                Button that sends action for files to be parsed.
                Disabled when fileNames and tableNames length are 0. 
                On click, .csv data in files are sent to Redux store
                for partial parse and filenames are set on Redux state;
                user is sent to queryBuilder page if tables already uploaded
                and no additional .csv files are selected.
              */}
              <Button
                disabled={
                  !this.props.files.fileNames.length &&
                  !this.props.files.tableNames.length
                }
                type="button"
                onClick={() => {
                  if (this.props.files.fileNames.length) {
                    this.props.parseFiles(this.props.files, this.props.user)
                  } else {
                    history.push('/queryBuilder')
                  }
                }}
                variant="contained"
                color="primary"
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </Grid>
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
    getUserTables: user => dispatch(getUserTables(user)),
    parseFiles: (files, user) => {
      dispatch(parseFiles(files, user))
    },
    deleteUserTable: (user, table) => dispatch(deleteUserTable(user, table))
  }
}

export function SimpleCard(props) {
  const useStyles = makeStyles({
    root: {
      marginTop: 15,
      padding: 15
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  })

  const classes = useStyles()

  return <Card className={classes.root}>{props.children}</Card>
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
