import React, { useState } from 'react'
import { Container, Grid, Box, Typography, FormControl, Select, MenuItem, Stack, Skeleton, Pagination, PaginationItem } from '@mui/material'
import { Link, useHistory } from 'react-router-dom'

import { ProductItem } from '../components/sections/ElNewProducts'
import ItemsProduct from '../components/sections/ItemsProduct'
import axios from 'axios'
import { apiUrl } from '../context/contanst'

const Perfume = (props) => {
  const history = useHistory()
  const [brands, setBrands] = useState([])

  const [resultPage, setResultPage] = useState({
    isLoadding: true,
    products: null,
    totalPage: 1
  })

  // limit products of one page
  const _limit = 8
  let refSearch = React.useRef(null)

  // get params location ?_page
  refSearch = new URLSearchParams(props.location.search)
  const page = parseInt(refSearch.get('_page'))
  const searchByBrand = refSearch.get('_searchByBrand')

  const [textFilter, setTextFilter] = useState({
    gender: '',
    brand: ``,
  })


  // handle onChange Filter
  const handleOnChangeFilter = (e) => {
    setTextFilter({ ...textFilter, [e.target.name]: e.target.value })
    setResultPage({ ...resultPage, isLoadding: true })
    history.push(`${props.location.pathname}?_page=1&_searchByBrand=${e.target.value}`)
  }

  // handle onChange Pagination
  const handleChangePagination = (e, value) => {
    setResultPage({ ...resultPage, isLoadding: true })
    // history.push(`/perfume?_page=${value}${searchByBrand ? `&_searchByBrand=${searchByBrand}` : ''}`)
  }

  // fetch brand
  React.useEffect(() => {
    const getAllBrand = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/brand`)
        if (!res.data.success) {
          console.log(res.data.message)
        } else {
          setBrands(res.data.brands)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getAllBrand()
  }, [])

  // fetch products
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/product?_page=${page ? page : 1}&_limit=${_limit}${searchByBrand ? `&_searchByBrand=${searchByBrand}` : ''}`)
        setResultPage({ isLoadding: false, products: res.data.resultPage.products, totalPage: res.data.resultPage.totalPage })
      } catch (error) {
        history.push('/page404')
      }
    }
    fetchProducts()
  }, [page, searchByBrand, history])



  let loadingBody = <>
    {Array.from(new Array(8)).map((e, i) =>
      <Grid
        key={i}
        item
        lg={3} md={4} sm={4} xs={6}
      >
        <ProductItem
          lg={3} md={4} xs={6}
        >
          <Skeleton variant="rectangular" width='100%' height={255} />
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
    <Container sx={{ paddingY: '50px' }}>
      <Box marginBottom='35px'>
        <Typography variant='h4' textAlign='center'>Perfume</Typography>
      </Box>

      <Box
        display='flex'
        marginBottom='10px'
        alignItems='center'
        flexWrap='wrap'
      >

        <Stack
          flexDirection="row"
          padding="15px"

          gap={2}
          flexGrow='1'
          justifyContent='flex-start'
          alignItems='center'
          sx={{ backgroundColor: '#f5f6fa' }}
        >
          <Typography paddingX='15px'>Filter</Typography>
          <FormControl size="small" sx={{ maxWidth: '150px', minWidth: '150px' }}>
            <Select
              value={textFilter.brand}
              onChange={handleOnChangeFilter}
              displayEmpty
              name='brand'
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                '& fieldset legend': {
                  maxWidth: 0,
                },
                backgroundColor: 'white',
                borderRadius: '0'
              }}
            >
              <MenuItem value=''>Brands</MenuItem>
              {brands && brands.map(b => <MenuItem key={b._id} value={b._id}>{b.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Stack>
      </Box>
      <Box>
        <Grid container spacing={[1.5, 1.5, 2, 2]}>
          {
            resultPage.isLoadding ? loadingBody :
              resultPage.products.map(p =>
                <ItemsProduct
                  key={p._id}
                  p={p}
                />
              )
          }
        </Grid>
      </Box>
      <Box paddingTop='20px'>
        <Pagination
          count={resultPage.totalPage}
          size="medium"
          page={page ? page : 1}
          onChange={handleChangePagination}
          shape="rounded"
          hideNextButton={page === resultPage.totalPage}
          hidePrevButton={page === 1}
          sx={{
            '& .MuiPagination-ul': {
              justifyContent: 'flex-end',
            }
          }}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/perfume?_page=${item.page}${searchByBrand ? `&_searchByBrand=${searchByBrand}` : ''}`}
              {...item}
              disabled={item.page === page ? true : false}
              sx={{
                marginX: 0,
              }}
            />
          )}
        />

      </Box>
    </Container>
  )
}

export default Perfume
