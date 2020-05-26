export const useStyles = {
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
    }
  },
  gridListJoin: {
    width: 100,
    height: 100,
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
    width: '100% !important'
  }
}

export const tileData = [
  {
    img: './left-3.png',
    title: 'LEFT',
    width: '30%'
  },
  {
    img: './left-out-3.png',
    title: 'LEFT OUTER',
    width: '30%'
  },
  {
    img: './right-3.png',
    title: 'RIGHT',
    width: '30%'
  },
  {
    img: './right-out-3.png',
    title: 'RIGHT OUTER',
    width: '30%'
  },
  {
    img: './full-3.png',
    title: 'FULL',
    width: '30%'
  },
  {
    img: './full-out-3.png',
    title: 'FULL OUTER',
    width: '30%'
  },
  {
    img: './inner-3.png',
    title: 'INNER',
    width: '30%'
  }
]
