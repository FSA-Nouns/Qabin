import React from 'react'
import {Typography} from '@material-ui/core'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles({
  root: {
    fontColor: 'white'
  },
  list: {
    width: 250,
    height: 500
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
      <Typography variant="h6" style={{padding: '20px'}}>
        STEPS
      </Typography>

      <Divider />

      <Typography variant="subtitle1" style={{padding: '10px'}}>
        Step 1:
      </Typography>
      <Typography variant="caption" style={{padding: '10px'}}>
        Select a table (lets call it Joined Table) to connect data. This will
        help analyse data across the connected tables on common data field.
      </Typography>

      <Divider />

      <Typography variant="subtitle2" style={{padding: '10px'}}>
        Step 2:
      </Typography>
      <Typography variant="caption" style={{padding: '10px', margin: '10px'}}>
        Select column in existing table (lets call it Main Table) that has
        common data with the Joined Table.
      </Typography>

      <Divider />

      <Typography variant="subtitle2" style={{padding: '10px'}}>
        Step 3:
      </Typography>
      <Typography variant="caption" style={{padding: '10px'}}>
        Select column in Joined Table that has common data with the Main Table.
      </Typography>

      <Divider />

      <Typography variant="subtitle2" style={{padding: '10px'}}>
        Step 4:
      </Typography>
      <Typography variant="caption" style={{padding: '10px'}}>
        Select the area on the venn diagram to column in Joined Table that has
        common data with the Main Table.
      </Typography>

      <Divider />

      <Typography variant="subtitle2" style={{padding: '10px'}}>
        Step 5:
      </Typography>
      <Typography variant="caption" style={{padding: '10px'}}>
        Save and proceed to select the fields from each table to visualize
        results.
      </Typography>
    </div>
  )

  return (
    <React.Fragment key="left">
      <Button onClick={toggleDrawer('left', true)} fontColor="white">
        <HelpIcon fontSize="small" style={{color: 'white'}} />
      </Button>
      <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </React.Fragment>
  )
}
