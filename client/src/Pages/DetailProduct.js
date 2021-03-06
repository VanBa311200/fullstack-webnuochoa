import axios from 'axios'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { Link as LinkApp, useHistory } from 'react-router-dom'
import Slider from "react-slick"
import { Box } from '@mui/system'
import { FaShippingFast } from 'react-icons/fa'
import ReplyIcon from '@mui/icons-material/Reply';
import { styled as styledMUI } from '@mui/material/styles';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { Stack, Divider, Grid, Typography, Container, Breadcrumbs, Link, Skeleton } from '@mui/material'
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';

import InputQuality from '../components/InputQuality'
import RatingStart from '../components/RatingStart'
import { apiUrl } from '../context/contanst'
import { toVND } from '../helper'
import { ButtonApp } from '../components/Button'
import { ButtonVariation } from '../components/ButtonVariation'
import { useDispatch } from 'react-redux'
import { addItemCart } from '../store/cart/cartSlice'
import { toast } from 'react-toastify'



const DetailProduct = (props) => {
  const productId = props.match.params.productId;
  const dispatch = useDispatch()
  const history = useHistory()
  const [producState, setProductState] = useState({
    isLoadding: true,
    product: {},
    state: 'success',
  });
  const initialState = {
    value: '30ml',
    quality: 1
  }
  const [size, setSize] = useState(initialState);
  const { isLoadding, product, state } = producState;


  const settings = {
    customPaging(i) {
      return (
        <div>
          <img src={`${apiUrl}/static/${product.images[i]?.fileName}`} alt={product.name} />
        </div>
      )
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2500,
    autoplay: true,
  }

  const BodyLoading = () => (
    <>
      <Container >
        <Grid container spacing='25px' pb='20px'>
          <Grid item xs={12} md={4}>
            <Skeleton
              height='477px'
              width='100%'
              animation='wave'
              variant="rectangular" />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton
              animation='wave'
              width='80%'
              height={40}
            />
            <Stack
              flexDirection='row'
              gap={1.5}
            >
              <Skeleton
                animation='wave'
                width='100px'
              />
              <Skeleton
                animation='wave'
                width='60px'
              />
              <Skeleton
                animation='wave'
                width='60px'
              />
            </Stack>
            <Box>
              <Skeleton animation='wave' height={100} />
            </Box>
            <Box paddingLeft='20px'>
              <Stack
                flexDirection='row'
                gap={5.5}
                marginTop='15px'
              >
                <Box>
                  <Skeleton animation='wave' width={100} />
                </Box>
                <Stack
                  flexDirection='column'
                >
                  <Skeleton animation='wave' width={120} />
                  <Skeleton animation='wave' width={140} />
                  <Skeleton animation='wave' width={140} />
                  <Skeleton animation='wave' width={140} />
                </Stack>
              </Stack>
              <Stack
                flexDirection='row'
                gap={5.5}
                marginTop='15px'
              >
                <Box>
                  <Skeleton animation='wave' width={100} />
                </Box>
                <Stack
                  flexDirection='row'
                  flexWrap='wrap'
                  gap={1}
                  maxWidth='370px'
                >
                  <Skeleton animation='wave' width={70} />
                  <Skeleton animation='wave' width={70} />
                  <Skeleton animation='wave' width={70} />
                  <Skeleton animation='wave' width={70} />
                  <Skeleton animation='wave' width={70} />
                  <Skeleton animation='wave' width={70} />
                  <Skeleton animation='wave' width={70} />
                </Stack>
              </Stack>
              <Stack
                flexDirection='row'
                gap={5.5}
                marginTop='15px'
              >
                <Box>
                  <Skeleton animation='wave' width={100} />
                </Box>
                <Stack
                  flexDirection='row'
                  flexWrap='wrap'
                  gap={1}
                  maxWidth='370px'
                >
                  <Skeleton animation='wave' width={140} />
                </Stack>
              </Stack>
              <Stack
                flexDirection='row'
                gap={1.5}
                marginTop='15px'
              >
                <Box>
                  <Skeleton animation='wave' width={100} height={80} />
                </Box>
                <Box>
                  <Skeleton animation='wave' width={140} height={80} />
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )

  const handleOnClick = (value) => {
    setSize({
      ...size,
      quality: value
    })
  }

  const handleSetSize = (e) => {
    setSize({
      ...size,
      value: e.target.innerText
    })
  }

  const handleAddItem = () => {
    dispatch(addItemCart({ ...product, ...size }))
    toast.success('Ba??n ??a?? th??m sa??n ph????m va??o gio?? ha??ng')
  }

  // const findProductsFaild = (<>
  //   <Container>
  //     <Box height='70vh' width='100%'>
  //       <Typography variant='5'>Kh??ng ti??m ki????m th????y k????t qua?? mong mu????n</Typography>
  //     </Box>
  //   </Container>
  // </>
  // )


  let body = (
    <>
      {state === 'faild' ? history.push('/page404') :
        <Container sx={{ minHeight: '60vh' }}>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              padding: '15px 0',
              display: ['none', 'none', 'flex', 'flex']
            }}
          >
            <Link
              underline="hover"
              color="inherit"
              component={LinkApp}
              to='/'
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              component={LinkApp}
              to='/perfume'
            >
              Prefume
            </Link>
            {isLoadding ? <Skeleton
              animtion='wave'
              width={388}
              height={32}
            /> : <Typography color="text.primary">{product.name}</Typography>}
          </Breadcrumbs>
          {
            isLoadding ? <BodyLoading /> :
              <Grid
                container
                spacing='25px'
                pb='20px'
              >
                <Grid item xs={12} md={4}>
                  <SliderApp {...settings}>
                    {product && product.images.map((img, i) =>

                      <div className='image-slice' key={i}>
                        <img src={`${apiUrl}/static/${img.fileName}`} alt={img.fileName} />
                      </div>
                    )}
                  </SliderApp>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box>
                    <Stack>
                      <NameProduct>{product.name}</NameProduct>
                    </Stack>
                    <Stack
                      alignItems='center'
                      direction='row'
                      gap='10px'
                    >
                      <RatingStart number={product.rating_number} />
                      <Divider orientation="vertical" flexItem variant='middle' />
                      <Stack
                        spacing={0.5}
                        direction='row'
                        alignItems='center'
                      >
                        <TextMain>32</TextMain>
                        <TextSub variant='subtitle1'>??a??nh gia??</TextSub>
                      </Stack>
                      <Divider orientation="vertical" flexItem variant='middle' />
                      <Stack
                        spacing={0.5}
                        direction='row'
                        alignItems='center'>
                        <TextMain>69</TextMain>
                        <TextSub variant='subtitle1'>??a?? ba??n</TextSub>
                      </Stack>
                    </Stack>

                    <Stack
                      gap='10px'
                      direction='row'
                      alignItems='center'
                      p='15px 20px'
                      bgcolor='#f5f5f5'
                      mt='10px'
                      flexWrap='wrap'
                    >
                      {product.percent_sale && <PriceLineThought variant='subtitle2'>{toVND(product.price)}</PriceLineThought>}
                      <Stack
                        spacing={2}
                        direction='row'
                        alignItems='center'
                      >
                        <PriceSale>{toVND(product.price_sale)}</PriceSale>
                        {product.percent_sale && <TagPercentSale>{`${product.percent_sale}% gia??m`}</TagPercentSale>}
                      </Stack>
                    </Stack>
                    <Box
                      pl='15px'
                      mt='25px'
                    >
                      <Stack
                        direction="row"
                      >
                        <Typography variant='subtitle1' minWidth='110px'>
                          V????n chuy????n
                        </Typography>
                        <Box >
                          <Stack
                            direction="row"
                            gap='5px'
                            alignItems='center'
                          >
                            <FaShippingFast style={{ color: 'var(--color-primary)' }} />
                            <Typography sx={{ fontSize: '14px' }}>Mi????n phi?? v????n chuy????n</Typography>
                          </Stack>
                          <Stack>
                            <Typography variant='subtitle1' pl='21px'>
                              Mi????n phi?? v????n chuy????n cho ????n ha??ng 3 sa??n ph????m
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems='center'
                        my={'20px'}
                      >
                        <Typography variant='subtitle1' minWidth='110px'>
                          Variants
                        </Typography>
                        <Box >
                          <Stack
                            direction="row"
                            gap={1}
                            alignItems='center'
                            flexWrap='wrap'
                          >
                            <ButtonVariation
                              className={size.value === '30ml' ? 'active' : ''}
                              onClick={handleSetSize}
                            >
                              30ml
                            </ButtonVariation>
                            <ButtonVariation
                              className={size.value === '60ml' ? 'active' : ''}
                              onClick={handleSetSize}
                            >
                              60ml
                            </ButtonVariation>
                            <ButtonVariation
                              className={size.value === '100ml' ? 'active' : ''}
                              onClick={handleSetSize}
                            >
                              100ml
                            </ButtonVariation>
                            <ButtonVariation
                              className={size.value === '150ml' ? 'active' : ''}
                              onClick={handleSetSize}
                            >
                              150ml
                            </ButtonVariation>
                          </Stack>
                        </Box>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems='center'
                        my={'20px'}
                      >
                        <Typography variant='subtitle1' minWidth='110px'>
                          S???? l??????ng
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                          <InputQuality onClick={handleOnClick} />
                        </Box>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        flexDirection="flexStart"
                        spacing={2}
                      >
                        <ButtonApp
                          color='primary'
                          variant='outlined'
                          startIcon={<AddShoppingCartIcon sx={{ color: 'primary.main' }} />}
                          onClick={handleAddItem}
                        >
                          Th??m va??o gio?? ha??ng
                        </ButtonApp>
                        <ButtonApp
                          color='primary'
                          variant='contained'
                          onClick={handleAddItem}
                        >Mua ngay</ButtonApp>
                      </Stack>
                    </Box>
                    <Box mt='25px'>
                      <Divider />
                      <Stack
                        flexDirection='row'
                        justifyContent='space-evenly'
                        gap={1.5}
                        p='15px'
                      >
                        <Stack
                          flexDirection='row'
                          alignItems='center'
                          gap='5px'
                        >
                          <ReplyIcon color='primary' sx={{ fontSize: 20, color: 'primary.main' }} />
                          <Typography sx={{ fontSize: '14px', maxWidth: '110px' }}>
                            7 nga??y hoa??n tra??
                          </Typography>
                        </Stack>
                        <Stack
                          flexDirection='row'
                          alignItems='center'
                          gap='5px'
                        >
                          <VerifiedUserIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                          <Typography sx={{ fontSize: '14px', maxWidth: '110px' }}>
                            Ha??ng chi??nh ha??ng 100%
                          </Typography>
                        </Stack>
                        <Stack
                          flexDirection='row'
                          alignItems='center'
                          gap='5px'
                        >
                          <EmojiTransportationIcon color='primary' sx={{ fontSize: 20, color: 'primary.main' }} />
                          <Typography sx={{ fontSize: '14px', maxWidth: '110px' }}>
                            Mi????n phi?? v????n chuy????n
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
          }
        </Container >
      }
    </>
  )

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/product/${productId}`)

        if (res.data.success)
          setProductState({
            state: 'success',
            isLoadding: false,
            product: res.data.product
          })
      } catch (error) {
        setProductState({
          product: {},
          isLoadding: false,
          state: 'faild'
        })
      }
    }
    getProduct();
  }, [productId])


  return (
    <>
      {body}
    </>
  )
}

export default DetailProduct

const SliderApp = styled(Slider)`
  .image-slice {
    width: 100%;
    height: 410px;
    align-items: center;
    background-color: #f5f6fa;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain ;
    }
  }

  .slick-arrow {
    z-index: -1;
    display: none !important;
  }

  @media (min-width: 320px) and (max-width: 576px) {
    /* .slick-dots {
      display: none !important;
    } */

    .image-slice {
      height: 345px;
    }
  }
  .slick-dots {
      margin-top: 15px;
      position: relative;
      bottom: unset;
  }

  .slick-dots li img{
    width: 100%;
    height: 45px;
    object-fit: contain;
  }

  .slick-dots li img:after {
    width: 100%;
    height: 100%;
    object-fit: cover;

  }

  .slick-dots li {
    opacity: .5;
    width: 45px;
    height: 45px;
    background-color: #f5f6fa;
  }
  .slick-dots li.slick-active {
    opacity: 1;
  }
`


const NameProduct = styledMUI(Typography)({
  fontSize: '20px',
  marginBottom: '6px',
  color: 'rgba(0, 0, 0, 0.8)',
})


const TextMain = styledMUI(Typography)({
  color: 'black',
  fontSize: '14px !important',
})


const TextSub = styledMUI(Typography)({
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
})


const PriceLineThought = styledMUI(Typography)({
  fontSize: '1rem',
  textDecoration: 'line-through',
})

const PriceSale = styledMUI(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: '500',
  color: `${theme.palette.primary.main}`,
}))


export const TagPercentSale = styledMUI('p')(({ theme }) => ({
  fontSize: '.75rem',
  color: '#fff',
  textTransform: 'uppercase',
  backgroundColor: `${theme.palette.primary.main}`,
  boxShadow: 'none',
  borderRadius: '2px',
  padding: '4px',
  fontWeight: '500',
  lineHeight: '1',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  margin: 'unset',
}))

