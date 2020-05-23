import React from 'react'
import {Typography, Tooltip} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
// import JoinTooltips, {JoinTypeHints} from './join-tooltips'

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
        width: '100% !important', // Overrides inline-style
        height: 150
      },
      '&:hover, &$focusVisible, &$onClick': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0
        },
        '& $imageMarked': {
          opacity: 0
        },
        '& $imageTitle': {
          border: '4px solid currentColor'
        }
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
      border: '0px solid white',
      fontWeight: '400'
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
              opacity: image.title === props.joinType ? '100' : '0.9'
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

export const JoinTypeHints = [
  'Left nfnkfo;wnfo;wflfcfcmmvpmvdlkvldsmvdslkvldksnvlkdsnvlksdnvlsdknvldsnvldskvnsdlkvnsdlvnldsvnldsknvlsdkvndslvkndslnvdlskvnsdlkvndsklnvlsdknvs',
  'Left - Outer nfnkfo;wnfo;wflfcfcmmvpmvdlkvldsmvdslkvldksnvlkdsnvlksdnvlsdknvldsnvldskvnsdlkvnsdlvnldsvnldsknvlsdkvndslvkndslnvdlskvnsdlkvndsklnvlsdknvs',
  'Right nfnkfo;wnfo;wflfcfcmmvpmvdlkvldsmvdslkvldksnvlkdsnvlksdnvlsdknvldsnvldskvnsdlkvnsdlvnldsvnldsknvlsdkvndslvkndslnvdlskvnsdlkvndsklnvlsdknvs',
  'Right - Outer nfnkfo;wnfo;wflfcfcmmvpmvdlkvldsmvdslkvldksnvlkdsnvlksdnvlsdknvldsnvldskvnsdlkvnsdlvnldsvnldsknvlsdkvndslvkndslnvdlskvnsdlkvndsklnvlsdknvs',
  'Full nfnkfo;wnfo;wflfcfcmmvpmvdlkvldsmvdslkvldksnvlkdsnvlksdnvlsdknvldsnvldskvnsdlkvnsdlvnldsvnldsknvlsdkvndslvkndslnvdlskvnsdlkvndsklnvlsdknvs',
  'Full - OUTER nfnkfo;wnfo;wflfcfcmmvpmvdlkvldsmvdslkvldksnvlkdsnvlksdnvlsdknvldsnvldskvnsdlkvnsdlvnldsvnldsknvlsdkvndslvkndslnvdlskvnsdlkvndsklnvlsdknvs',
  'INNER nfnkfo;wnfo;wflfcfcmmvpmvdlkvldsmvdslkvldksnvlkdsnvlksdnvlsdknvldsnvldskvnsdlkvnsdlvnldsvnldsknvlsdkvndslvkndslnvdlskvnsdlkvndsklnvlsdknvs'
]
