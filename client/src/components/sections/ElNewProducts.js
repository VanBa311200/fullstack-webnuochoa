import styled from 'styled-components'
import { Container, Typography, Paper, Stack, Box, } from '@mui/material'
import { styled as styledMUI } from '@mui/system'
import { Link } from 'react-router-dom'


export const SectionContent = styledMUI(Container)(({ theme }) => ({
  paddingTop: '55px',
  paddingBottom: '55px',
}))


export const SectionHeading = styledMUI(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  textAlign: 'center',
  color: `${theme.palette.grey[800]}`,
  fontSize: '22px',
  fontWeight: '500',
  paddingBottom: '40px',
  margin: 'unset',

  [theme.breakpoints.down('md')]: {
    fontSize: '18px',
  },
}))


export const ProductItem = styledMUI(Paper)(({ theme }) => ({
  '&:hover': {
    boxShadow: `${theme.shadows[11]}`,
    transition: `all .35s ease`,
  },

}))



export const PImg = styled.img`
  max-width: 100%;
  height: 255px;
  user-select: none;
  object-fit: contain;

  @media (min-width: 320px) and (max-width: 576px) {
    height: 160px;
  }
`

export const ProductImage = styled.div`
  position: relative;
  background-color: #f5f6fa;
  text-align: center;
`

export const LinkProduct = styled(Link)`
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
`



export const ProductInfo = styledMUI(Stack)(({ theme }) => ({
  padding: '15px',
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',

  [theme.breakpoints.down('md')]: {
    padding: '10px',
  },
}))


export const ProductBrand = styledMUI(Box)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 'bold',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  userSelect: 'none',
  marginBottom: '7px',
  color: `${theme.palette.grey[800]}`,

  wordBreak: 'keep-all',
  wordWrap: 'unset',
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  [theme.breakpoints.down('md')]: {
    marginBottom: '4px',
  }
}))


export const ProductName = styled(Link)`
  color: var(--color-primary);
  font-size: 17px;
  text-decoration: none;
  user-select: none;
  
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;     


  &:hover {
    text-decoration: none;
    color: var(--color-primary);
  }

  @media (min-width: 320px) and (max-width: 576px) {
    font-size: 15px;
  }
`

export const ProductInfoGroup = styledMUI(Box)(({ theme }) => ({
  marginTop: '8px',
}))


export const ProductInfoPriceSale = styledMUI(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: `${theme.palette.grey[500]}`,
  textDecoration: 'line-through',
  fontWeight: 500,
  letterSpacing: '1',
  marginBottom: ' 0px',
  userSelect: 'none',

  [theme.breakpoints.down('md')]: {
    fontSize: '13px',
  }
}))


export const TagSalePercent = styled.span`
  background-color: var(--color-primary);
  width: auto;
  border-radius: 3px;
  font-weight: normal;
  padding: 0 5px;
  font-weight: 400;
  height: fit-content;
  color: white;

`

export const ProductInfoPrice = styledMUI(Typography)(({ theme }) => ({
  marginBottom: 'unset',
  fontSize: '16px',
  fontWeight: '500',
  userSelect: 'none',
  color: `${theme.palette.primary.main}`,

  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',

  [theme.breakpoints.down('md')]: {
    fontSize: '15px',
  }
}))



