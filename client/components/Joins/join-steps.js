import React from 'react'
import {Typography} from '@material-ui/core'
import {SimpleCard} from '../home'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
})

export default function JoinSteps() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    left: false
  })

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({...state, [anchor]: open})
  }

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom'
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <SimpleCard>
        <Typography variant="subtitle">STEPS</Typography>

        <Divider />

        <Typography variant="subtitle2">Step 1:</Typography>
        <Typography variant="caption">
          Select a table (lets call it Table 2) to connect data. This will help
          analyse data across the connected tables on common data field.
        </Typography>

        <Divider />

        <Typography variant="subtitle2">Step 2:</Typography>
        <Typography variant="caption">
          Select column in existing table (lets call it Table 1) that has common
          data with the Table 2.
        </Typography>

        <Divider />

        <Typography variant="subtitle2">Step 3:</Typography>
        <Typography variant="caption">
          Select column in Table 2 that has common data with the Table 1.
        </Typography>

        <Divider />

        <Typography variant="subtitle2">Step 4:</Typography>
        <Typography variant="caption">
          Select the area on the venn diagram to column in Table 2 that has
          common data with the Table 1.
        </Typography>

        <Divider />

        <Typography variant="subtitle2">Step 5:</Typography>
        <Typography variant="caption">
          Save and proceed to select the fields from each table to visualize
          results.
        </Typography>
      </SimpleCard>
    </div>
  )

  return (
    <div>
      <React.Fragment key="left">
        <Button onClick={toggleDrawer('left', true)}>
          {<HelpIcon fontSize="small" />}
        </Button>
        <Drawer
          anchor="left"
          open={state.left}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  )
}
