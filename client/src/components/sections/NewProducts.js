import React, { useEffect } from 'react'
import { Skeleton, Box, Grid, Button } from '@mui/material';
import { useDispatch } from 'react-redux'

import { getProducts } from '../../store/product/productReducer'
import { ProductItem } from './ElNewProducts'
import { SectionContent, SectionHeading } from './ElNewProducts'
import ItemsProduct from './ItemsProduct'
import { useSelector } from 'react-redux'
import { productSelector } from '../../store/product/productReducer'
import { BsArrowRight } from 'react-icons/bs'
import { useHistory } from 'react-router';

const NewProducts = () => {
  const p = useSelector(productSelector)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  let { products, isLoading } = p
  products = products.filter((p, i) => p.isNewProduct === true && i <= 8)


  let loadingBody = <>
    {Array.from(new Array(8)).map((e, i) =>
      <Grid
        key={i}
        item
        lg={3} md={4} sm={4} xs={6}
      >
        <ProductItem>
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
      </Grid>
    )}
  </>

  return (
    <SectionContent>
      <SectionHeading>
        SẢN PHẨM MỚI
      </SectionHeading>
      <Grid container spacing={[1.5, 1.5, 2, 2]}>
        {
          isLoading ? loadingBody :
            products.map(p =>
              <ItemsProduct
                key={p._id}
                p={p}
              />
            )
        }
      </Grid>
      <Box sx={{ textAlign: 'center', mt: '35px' }}>
        <Button
          variant='outlined'
          size='large'
          sx={{ borderRadius: '0' }}
          endIcon={<BsArrowRight />}
          onClick={() => history.push('/perfume')}
        >Xem thêm</Button>
      </Box>
    </SectionContent>
  )
}

export default NewProducts
