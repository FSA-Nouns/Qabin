import React from 'react'
import {Grid, Typography} from '@material-ui/core'
// import {gray} from '@material-ui/core/colors'
import {SimpleCard} from '../home'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
// import {style, useStyles} from './join-styles'
import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

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
        <Typography
          // className={classes.typography.h3}
          variant="subtitle2"
        >
          STEPS
        </Typography>
        {/* <Typography variant="caption">
        Follow the pop-up arrows to each step
      </Typography> */}

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

// export default function JoinSteps(props) {
//   const classes = useStyles
//   // (props)
//   return (
//     // <Grid container direction="column">
//     //   <Typography variant="h6">Step 1 - Gather your data</Typography>
//     //   <Typography variant="body1" align="center">
//     //     We need you to provide us with your datasets. If you havent already,
//     //     upload your data in .csv format
//     //   </Typography>
//     // </Grid>
//     // style={style.typography.h3}

//     <div
//       className={clsx(classes.list, {
//         [classes.fullList]: anchor === 'top' || anchor === 'bottom',
//       })}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <div>
//       {['left', 'right', 'top', 'bottom'].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//           <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
//             {list(anchor)}
//           </Drawer>
//         </React.Fragment>
//       ))}
//     </div>

//     <SimpleCard>
//       <Typography
//         // className={classes.typography.h3}
//         variant="subtitle2"
//       >
//         STEPS {<HelpIcon fontSize="small" />}
//       </Typography>
//       <Typography variant="caption">
//         Follow the pop-up arrows to each step
//       </Typography>
//       <Typography variant="subtitle2">Step 1:</Typography>
//       <Typography variant="caption">
//         Select a table (lets call it Table 2) to connect data. This will help
//         analyse data across the connected tables on common data field.
//       </Typography>
//       <Typography variant="subtitle2">Step 2:</Typography>
//       <Typography variant="caption">
//         Select column in existing table (lets call it Table 1) that has common
//         data with the Table 2.
//       </Typography>
//       <Typography variant="subtitle2">Step 3:</Typography>
//       <Typography variant="caption">
//         Select column in Table 2 that has common data with the Table 1.
//       </Typography>
//       <Typography variant="subtitle2">Step 4:</Typography>
//       <Typography variant="caption">
//         Select the area on the venn diagram to column in Table 2 that has common
//         data with the Table 1.
//       </Typography>
//       <Typography variant="subtitle2">Step 5:</Typography>
//       <Typography variant="caption">
//         Save and proceed to select the fields from each table to visualize
//         results.
//       </Typography>
//     </SimpleCard>
//   )
// }
