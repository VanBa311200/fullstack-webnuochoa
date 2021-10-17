import React from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from '../context/contanst'
import { Stack, Box, Typography } from '@mui/material'
import { styled as styledMUI } from '@mui/styles'
import { ProductInfoPrice, ProductInfoPriceSale } from './sections/ElNewProducts';
import { toVND } from '../helper';


const ItemSearch = ({ images, name, price, price_sale, _id, onClick, ...rest }) => {
  return (
    <Stack
      flexDirection='row'
      marginTop='12px'
      // paddingX='15px'
      component={Link}
      to={`/product/${_id}`}
      onClick={() => onClick(false)}
    >
      <BoxImage>
        <ImageSearch
          src={`${apiUrl}/static/${images[0].fileName}`}
          alt={name}
          width='100%' height='50px' />
      </BoxImage>
      <Box sx={{ marginLeft: '10px' }}>
        <Typography sx={{
          marginBottom: '10px',
          fontSize: '13px',
          fontWeight: 700,
          color: '#444',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        >{name}</Typography>
        <Stack flexDirection='row' gap={1}>
          <ProductInfoPrice sx={{ fontSize: '13px' }}>{toVND(price)}</ProductInfoPrice>
          <ProductInfoPriceSale sx={{ fontSize: '11px' }}>{toVND(price_sale)}</ProductInfoPriceSale>
        </Stack>
      </Box>
    </Stack >
  )
}

export default ItemSearch


const BoxImage = styledMUI('div')(() => ({
  minWidth: '60px',
}))

const ImageSearch = styledMUI('img')(() => ({
  width: '100%',
  minHeight: '100%',
  backgroundPosition: 'center',
  objectFit: 'fill',
}))

