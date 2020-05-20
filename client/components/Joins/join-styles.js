import React from 'react'
import {red, blue} from '@material-ui/core/colors'
import {
  createMuiTheme,
  responsiveFontSizes,
  makeStyles
} from '@material-ui/core/styles'

// let theme = createMuiTheme();
// theme = responsiveFontSizes(theme);

export const useStyles =
  // makeStyles(theme => (
  {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: blue //theme.palette.background.paper
    },
    typography: {
      h3: {
        fontSize: '1rem',
        '@media (min-width:0px)': {
          fontSize: '1.5rem'
        }
        // [theme.breakpoints.up('xs')]: {
        //   fontSize: '5rem'
        // }
      }
    },
    gridListJoin: {
      width: 500,
      height: 450,
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)'
    },
    titleBarJoin: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
    },
    icon: {
      color: 'white'
    }
  }
// ))

export const tileData = [
  {
    img: '',
    title: 'Image1'
  },
  {
    img: '',
    title: 'Image2'
  },
  {
    img: '',
    title: 'Image3'
  },
  {
    img: '',
    title: 'Image4'
  },
  {
    img: '',
    title: 'Image5'
  },
  {
    img: '',
    title: 'Image6'
  },
  {
    img: '',
    title: 'Image7'
  },
  {
    img: '',
    title: 'Image8'
  },
  {
    img: '',
    title: 'Image9'
  }
]
