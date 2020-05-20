import React from 'react'
import {Grid, Typography} from '@material-ui/core'
// import {gray} from '@material-ui/core/colors'
import {SimpleCard} from '../home'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
import {style, useStyles} from './join-styles'

export default function JoinSteps(props) {
  const classes = useStyles
  // (props)
  return (
    // <Grid container direction="column">
    //   <Typography variant="h6">Step 1 - Gather your data</Typography>
    //   <Typography variant="body1" align="center">
    //     We need you to provide us with your datasets. If you havent already,
    //     upload your data in .csv format
    //   </Typography>
    // </Grid>
    // style={style.typography.h3}
    <SimpleCard>
      <Typography
        // className={classes.typography.h3}
        variant="subtitle2"
      >
        STEPS {<HelpIcon fontSize="small" />}
      </Typography>
      <Typography variant="caption">
        Follow the pop-up arrows to each step
      </Typography>
      <Typography variant="subtitle2">Step 1:</Typography>
      <Typography variant="caption">
        Select a table (lets call it Table 2) to connect data. This will help
        analyse data across the connected tables on common data field.
      </Typography>
      <Typography variant="subtitle2">Step 2:</Typography>
      <Typography variant="caption">
        Select column in existing table (lets call it Table 1) that has common
        data with the Table 2.
      </Typography>
      <Typography variant="subtitle2">Step 3:</Typography>
      <Typography variant="caption">
        Select column in Table 2 that has common data with the Table 1.
      </Typography>
      <Typography variant="subtitle2">Step 4:</Typography>
      <Typography variant="caption">
        Select the area on the venn diagram to column in Table 2 that has common
        data with the Table 1.
      </Typography>
      <Typography variant="subtitle2">Step 5:</Typography>
      <Typography variant="caption">
        Save and proceed to select the fields from each table to visualize
        results.
      </Typography>
    </SimpleCard>
  )
}
