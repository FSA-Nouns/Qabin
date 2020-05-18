import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import {gray} from '@material-ui/core/colors'
import {SimpleCard} from './home'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'

export default function JoinSteps() {
  return (
    // <Grid container direction="column">
    //   <Typography variant="h6">Step 1 - Gather your data</Typography>
    //   <Typography variant="body1" align="center">
    //     We need you to provide us with your datasets. If you havent already,
    //     upload your data in .csv format
    //   </Typography>
    // </Grid>
    <SimpleCard>
      <Typography variant="h4">
        STEPS {<HelpIcon color={gray} fontSize="small" />}
      </Typography>
      <Typography variant="h6">
        Follow the pop-up arrows to each step
      </Typography>
      <Typography variant="h5">Step 1:</Typography>
      <Typography variant="h5">
        Select a table (lets call it Table 2) to connect data. This will help
        analyse data across the connected tables on common data field.
      </Typography>
      <Typography variant="h5">Step 2:</Typography>
      <Typography variant="h5">
        Select column in existing table (lets call it Table 1) that has common
        data with the Table 2.
      </Typography>
      <Typography variant="h5">Step 3:</Typography>
      <Typography variant="h5">
        Select column in Table 2 that has common data with the Table 1.
      </Typography>
      <Typography variant="h5">Step 4:</Typography>
      <Typography variant="h5">
        Select the area on the venn diagram to column in Table 2 that has common
        data with the Table 1.
      </Typography>
      <Typography variant="h5">Step 5:</Typography>
      <Typography variant="h5">
        Save and proceed to select the fields from each table to visualize
        results.
      </Typography>
    </SimpleCard>
  )
}
