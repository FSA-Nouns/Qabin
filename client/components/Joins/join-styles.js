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
      minWidth: 300,
      width: '100%'
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
      width: 100,
      height: 100,
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
    },

    list: {
      width: 120
    },

    fullList: {
      width: 'auto'
    },
    image: {
      position: 'relative',
      height: 200,
      width: '100% !important' // Overrides inline-style
      // height: 100,
    }
  }

export const tileData = [
  {
    img: './left.png',
    title: 'LEFT',
    width: '30%'
  },
  {
    img: './left.png',
    title: 'LEFT OUTER',
    width: '30%'
  },
  {
    img: './left-out.png',
    title: 'RIGHT',
    width: '30%'
  },
  {
    img: './left.png',
    title: 'RIGHT OUTER',
    width: '30%'
  },
  {
    img: './left.png',
    title: 'FULL',
    width: '30%'
  },
  {
    img: './left.png',
    title: 'FULL OUTER',
    width: '30%'
  },
  {
    img: './left.png',
    title: 'INNER',
    width: '30%'
  }
]
