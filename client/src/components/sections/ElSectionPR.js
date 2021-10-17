import { styled as styledMUI } from '@mui/system'
import { Box, Grid } from '@mui/material'

export const WapperContent = styledMUI(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
}))


export const ColContent = styledMUI(Grid)(({ theme, imgfirst }) => ({

  order: `${imgfirst === 'true' ? 1 : 2}`,
  padding: 'unset',

  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  '& div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    padding: '35px',
    fontSize: '15px',

    [theme.breakpoints.between('xs', 'md')]: {
      padding: '20px',
      fontSize: '13px',
    },
  },

  [theme.breakpoints.down('sm')]: {
    order: 'unset',
  }
}))

