import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Breadcrumb, Container } from 'react-bootstrap'
import Slider from "react-slick"
import { Box } from '@mui/system'
import { FaShippingFast } from 'react-icons/fa'
import ReplyIcon from '@mui/icons-material/Reply';
import { styled as styledMUI } from '@mui/material/styles';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { Stack, Divider, Grid, Paper, Typography, Chip } from '@mui/material'
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';

import InputQuality from '../components/InputQuality'
import RatingStart from '../components/RatingStart'
import { apiUrl } from '../context/contanst'
import { toVND } from '../helper'
import { ButtonApp } from '../components/Button'
import { ButtonVariation } from '../components/ButtonVariation'

const DetailProduct = (props) => {
  const productId = props.match.params.productId;
  const [producState, setProductState] = useState({
    isLoadding: true,
    product: {},
  });
  const initialState = {
    value: '30ml',
    quality: 1
  }
  const [size, setSize] = useState(initialState);
  const { isLoadding, product } = producState;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/product/${productId}`)

        if (res.data.success)
          setProductState({
            isLoadding: false,
            product: res.data.product
          })
      } catch (error) {
        console.error('GET_PRODUCT_FAILD')
      }
    }
    getProduct();

    return () => {
      setProductState({
        isLoadding: true,
        product: {}
      })
    }
  }, [productId])

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
  }

  const handleOnClick = (e) => {
    setSize({
      ...size,
      value: e.target.innerText
    })
  }

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item to='/' as={Link} active>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>
          Product
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>
      {
        isLoadding ? 'Loading' :
          <Grid container spacing='25px' pb='20px'>
            <Grid item xs={12} md={4}>
              <SliderApp {...settings}>
                {product.images.map((img, i) =>

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
                  divider={<Divider orientation="vertical" flexItem />}
                  direction='row'
                  spacing={2}
                >
                  <RatingStart number={product.rating_number} />
                  <Stack spacing={0.5}
                    direction='row'
                    alignItems='center'>
                    <TextMain>0</TextMain>
                    <TextSub variant='subtitle1'>Đánh giá</TextSub>
                  </Stack>
                  <Stack
                    spacing={0.5}
                    direction='row'
                    alignItems='center'>
                    <TextMain>12</TextMain>
                    <TextSub variant='subtitle1'>Đã bán</TextSub>
                  </Stack>
                </Stack>

                <Stack
                  gap='10px'
                  direction='row'
                  alignItems='center'
                  p='15px 20px'
                  bgcolor='#FAFAFA'
                  mt='10px'
                  flexWrap='wrap'
                >
                  <PriceLineThought variant='subtitle2'>{toVND(product.price)}</PriceLineThought>
                  <Stack
                    spacing={2}
                    direction='row'
                    alignItems='center'
                  >
                    <PriceSale>{toVND(product.price_sale)}</PriceSale>
                    <TagPercentSale>{`${product.percent_sale}% giảm`}</TagPercentSale>
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
                      Vận chuyển
                    </Typography>
                    <Box >
                      <Stack
                        direction="row"
                        gap='5px'
                        alignItems='center'
                      >
                        <FaShippingFast style={{ color: 'var(--color-primary)' }} />
                        <Typography sx={{ fontSize: '14px' }}>Miễn phí vận chuyển</Typography>
                      </Stack>
                      <Stack>
                        <Typography variant='subtitle1' pl='21px'>Miễn phí vận chuyển cho đơn hàng 3 sản phẩm</Typography>
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
                        <ButtonVariation label='30ml' className={size.value === '30ml' ? 'active' : ''} onClick={handleOnClick} />
                        <ButtonVariation label='60ml' className={size.value === '60ml' ? 'active' : ''} onClick={handleOnClick} />
                        <ButtonVariation label='100ml' className={size.value === '100ml' ? 'active' : ''} onClick={handleOnClick} />
                        <ButtonVariation label='150ml' className={size.value === '150ml' ? 'active' : ''} onClick={handleOnClick} />
                      </Stack>
                    </Box>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems='center'
                    my={'20px'}
                  >
                    <Typography variant='subtitle1' minWidth='110px'>
                      Số lượng
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
                    <ButtonApp color='primary' variant='outlined' startIcon={<AddShoppingCartIcon />}>Thêm vào giỏ hàng</ButtonApp>
                    <ButtonApp color='primary' variant='contained'>Mua ngay</ButtonApp>
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
                      <ReplyIcon color='primary' sx={{ fontSize: 20 }} />
                      <Typography sx={{ fontSize: '14px', maxWidth: '110px' }}>
                        7 ngày hoàn trả
                      </Typography>
                    </Stack>
                    <Stack
                      flexDirection='row'
                      alignItems='center'
                      gap='5px'
                    >
                      <VerifiedUserIcon color='primary' sx={{ fontSize: 20 }} />
                      <Typography sx={{ fontSize: '14px', maxWidth: '110px' }}>
                        Hàng chính hãng 100%
                      </Typography>
                    </Stack>
                    <Stack
                      flexDirection='row'
                      alignItems='center'
                      gap='5px'
                    >
                      <EmojiTransportationIcon color='primary' sx={{ fontSize: 20 }} />
                      <Typography sx={{ fontSize: '14px', maxWidth: '110px' }}>
                        Miễn phí vận chuyển
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
      }
    </Container >
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
    .slick-dots {
      display: none !important;
    }

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


const TextMain = styled(Typography)({
  color: 'black',
  fontSize: '16px',
})


const TextSub = styled(Typography)({
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


const TagPercentSale = styledMUI(Paper)(({ theme }) => ({
  fontSize: '.75rem',
  color: '#fff',
  textTransform: 'uppercase',
  backgroundColor: `${theme.palette.primary.main}`,
  boxShadow: 'none',
  borderRadius: '2px',
  padding: '2px 4px',
  fontWeight: '500',
  lineHeight: '1',
  whiteSpace: 'nowrap',
}))

