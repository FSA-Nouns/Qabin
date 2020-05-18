import {
  Grid,
  Card,
  List,
  ListItem,
  Typography,
  Button,
  AppBar
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import React, {useState} from 'react'

export default function QueryResultsDataVizSelect(props) {
  const [dataVizStyle, updateDataViz] = useState('table')

  const dataVizOptions = ['table']

  const selectDataViz = viz => {
    updateDataViz(viz)
    props.changeDataVizStyle(viz)
  }
  const useStyles = makeStyles({
    root: {},
    title: {
      fontSize: 14
    },
    buttonLabel: {
      width: '100%'
    }
  })

  const classes = useStyles()
  return (
    <Grid container>
      <Button
        color="primary"
        className={classes.buttonLabel}
        variant="contained"
      >
        Visualization Style
      </Button>
      <SimpleCard>
        {dataVizOptions.map(option => {
          console.log(option, dataVizStyle)
          return (
            <Button
              className={classes.buttonLabel}
              color={option === dataVizStyle ? 'primary' : 'secondary'}
              key={option}
              onClick={() => selectDataViz(option.toLowerCase())}
              variant="contained"
            >
              {option}
            </Button>
          )
        })}
      </SimpleCard>
    </Grid>
  )
}
function SimpleCard(props) {
  const useStyles = makeStyles({
    root: {
      // marginTop: 15,
      padding: 15,
      width: '100%'
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
