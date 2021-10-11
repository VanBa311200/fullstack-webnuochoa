import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Skeleton } from '@mui/material'

import { apiUrl } from '../../context/contanst'
import { Container, ImageSlide, SlideInner } from './ElCarousel'
import Slider from 'react-slick'
const Carousel = () => {
  const [carousel, setSlides] = useState({
    isLoading: true,
    slides: []
  })

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  }

  useEffect(() => {
    const getBanner = async () => {
      const res = await axios.get(`${apiUrl}/api/banner`)
      if (res.data.success) {
        setSlides({ isLoading: false, slides: Object.values(res.data.data) })
      }
    }

    getBanner()
  }, [])

  let body = (
    <>
      {carousel.isLoading ?
        <Slider {...settings}>
          {
            Array.from(new Array(4)).map((e, i) =>
              <ImageSlide key={i} src='https://via.placeholder.com/1882x723.png?text=++' />
            )
          }
        </Slider>
        : <>
          <Slider {...settings}>

            {carousel.slides.map((item, index) =>
              <ImageSlide key={index} src={`${apiUrl}/static/${item.image.fileName}`} alt={item.name} />
            )}
          </Slider>
        </>
      }
    </>
  )


  return (
    <Container>
      <SlideInner>
        <Slider {...settings}>
          {
            body
          }
        </Slider>
      </SlideInner>
    </Container>
  )
}

export default Carousel
