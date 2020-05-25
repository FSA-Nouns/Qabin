import React from 'react'
import {Grid, Typography} from '@material-ui/core'

// Grid containing Typography elements describing steps for user
export default function HomeSteps() {
  return (
    <Grid container direction="column">
      <Typography variant="h6">Step 1 - Gather your data</Typography>
      <Typography variant="body1" align="center">
        We need you to provide us with your datasets. If you havent already,
        upload your data in .csv format
      </Typography>
    </Grid>
  )
}
