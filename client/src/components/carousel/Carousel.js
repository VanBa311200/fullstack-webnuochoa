import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { apiUrl } from '../../context/contanst'
import { Container, ImageSlide, SlideInner } from './ElCarousel'
import Slider from 'react-slick'
const Carousel = () => {
  const [slides, setSlides] = useState()

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
        setSlides(Object.values(res.data.data))
      }
    }

    getBanner()
  }, [])


  return (
    <Container>
      <SlideInner>
        <Slider {...settings}>
          {slides && slides.map((item, index) =>
            <ImageSlide key={index} src={`${apiUrl}/static/${item.image.fileName}`} alt={item.name} />
          )}
        </Slider>
      </SlideInner>
    </Container>
  )
}

export default Carousel
