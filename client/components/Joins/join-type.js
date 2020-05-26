import React from 'react'
import {Typography, Tooltip} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import ButtonBase from '@material-ui/core/ButtonBase'

export const JoinTypeHints = [
  'Left - It includes all the data in the main table as well as common data in Joined Table',
  'Left Outer - It includes only data in the main table that has no overlap data in Joined Table',
  'Right  - It includes all the data in the Joined table as well as common data in Main Table',
  'Right Outer - It includes only data in the Joined table that has no overlap data in Main Table',
  'Full - It includes all the data in the Main table as well as all the data in Joined Table',
  'Full OUTER - It includes only data which has no overlap in either the Main Table or the Joined table',
  'INNER - It only includes overlap common data in Main and Joined Tables'
]

export default function JoinTypes(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
      margin: '10px'
    },
    image: {
      position: 'relative',
      height: 150,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important',
        height: 150
      },
      '&:hover, &$focusVisible, &$onClick': {
        zIndex: 1,
        '& $imageBackdrop': {},
        '& $imageMarked': {},
        '& $imageTitle': {}
      }
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      border: props.join,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%'
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.05,
      transition: theme.transitions.create('opacity')
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) +
        6}px`,
      color: 'black',
      fontSize: '12px',
      border: '0px solid white'
      // font-weight: '400px'
    }
  }))

  const classes = useStyles()

  return (
    <div className={classes.root}>
      {props.tileData.map((image, index) => (
        <Tooltip
          key={index}
          m={0}
          p={0}
          item
          xs={1}
          title={JoinTypeHints[index]}
          arrow
        >
          <ButtonBase
            focusRipple
            key={image.title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
              border:
                image.title === props.joinType
                  ? '10px solid #00E676'
                  : '10px solid white',
              opacity: image.title === props.joinType ? '100' : '70'
            }}
            onClick={() => props.handleJoinType(image.title, 1, props.index)}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.img})`
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
                border="0px solid white"
              >
                {image.title}
              </Typography>
            </span>
          </ButtonBase>
        </Tooltip>
      ))}
    </div>
  )
}
