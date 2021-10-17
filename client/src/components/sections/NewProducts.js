import React, { useState } from 'react'
import { Skeleton, Box, Grid } from '@mui/material';

import { ProductItem } from './ElNewProducts'
import { SectionContent, SectionHeading } from './ElNewProducts'
import ItemsProduct from './ItemsProduct'
import { useSelector } from 'react-redux'
import { productSelector } from '../../store/product/productReducer'

const NewProducts = () => {
  const p = useSelector(productSelector)

  const [dataModal, setDataModal] = useState({
    isShow: false,
    data: null,
  })

  let { products, isLoadding } = p
  products = products.filter((p, i) => p.isNewProduct === true && i <= 8)

  const handleClick = (data) => {
    setDataModal({
      ...dataModal,
      isShow: true,
      data,
    })
  }


  let loadingBody = <>
    {Array.from(new Array(8)).map((e, i) =>
      <ProductItem
        key={i}
        lg={3} md={4} xs={6}
      >
        <Skeleton variant="rectangular" width='100%' height={345} />
        <Box>
          <Skeleton width='45%' sx={{ height: '36px', my: 1 }} />
          <Skeleton width="100%" />
          <Skeleton width="60%" />
        </Box>
        <Box sx={{ mt: '15px' }}>
          <Skeleton width="50%" />
          <Skeleton width="90%" />
          <Skeleton width="30%" />
        </Box>
      </ProductItem>
    )}
  </>

  return (
    <SectionContent>
      <SectionHeading>
        SẢN PHẨM MỚI
      </SectionHeading>
      <Grid container spacing={[1.5, 1.5, 2, 2]}>
        {
          isLoadding ? loadingBody :
            products.map(p =>
              <ItemsProduct
                key={p._id}
                p={p}
                onClick={handleClick}
              />
            )
        }
      </Grid>
    </SectionContent>
  )
}

export default NewProducts
