import React from 'react'
import { Grid, Stack } from '@mui/material'

import { ProductItem, ProductImage, LinkProduct, PImg, ProductInfo, ProductBrand, ProductName, ProductInfoGroup, ProductInfoPrice, ProductInfoPriceSale } from './ElNewProducts'
import { toVND } from '../../helper'
import RatingStart from '../RatingStart'
import { apiUrl } from '../../context/contanst'
import { TagPercentSale } from '../../Pages/DetailProduct'

const ItemsProduct = ({ p }) => {
  return (
    <Grid
      item
      lg={3} md={4} sm={4} xs={6}
    >

      <ProductItem>
        <ProductImage>
          <LinkProduct to={`product/${p._id}`}>
            <PImg src={`${apiUrl}/static/${p.images[0].fileName}`} />
          </LinkProduct>

        </ProductImage>
        <ProductInfo>
          <ProductBrand>{p.id_brand.name}</ProductBrand>
          <ProductName to={`product/${p._id}`}>{p.name}</ProductName>
          <ProductInfoGroup>
            {p.percent_sale && <ProductInfoPriceSale>{toVND(p.price)}
            </ProductInfoPriceSale>}
            <Stack
              flexDirection='row'
              alignItems='center'
              gap='20px'
            >
              <ProductInfoPrice sale={p.percent_sale ? 'true' : 'false'}>{toVND(p.price_sale)}</ProductInfoPrice>
              {p.percent_sale && <TagPercentSale>{`-${p.percent_sale}%`}</TagPercentSale>}
            </Stack>
            <RatingStart number={p.rating_number} />
          </ProductInfoGroup>
        </ProductInfo>
      </ProductItem>
    </Grid>
  )
}

export default ItemsProduct
