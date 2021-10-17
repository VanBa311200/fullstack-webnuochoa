import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from "styled-components"

import { apiUrl } from '../../context/contanst'
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
              <picture key={i}>
                <source
                  media="(max-width:576px)"
                  srcSet='https://via.placeholder.com/545x799.png?text=Loading...'
                />
                <ImageSlide src='https://via.placeholder.com/1882x723.png?text=Loading...' />
              </picture>

            )
          }
        </Slider>
        : <>
          <Slider {...settings}>

            {carousel.slides.map((item, index) =>
              <picture key={index}>
                <source
                  media="(max-width:576px)"
                  srcSet={`${apiUrl}/static/${item.imageMobile.fileName}`}
                />
                <ImageSlide
                  src={`${apiUrl}/static/${item.imageDesktop.fileName}`}
                  alt={item.name}
                />
              </picture>
            )}
          </Slider>
        </>
      }
    </>
  )


  return (
    <Container>
      <SlideInner>
        {body}
      </SlideInner>
    </Container>
  )
}

export default Carousel



const Container = styled.section`
        position: relative;
        `

const ImageSlide = styled.img`
        width: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border: none;
        outline: none;

        @media (min-width: 600px) {
          height: auto;
        }

        @media (min-width: 320px) and (max-width: 600px) {
          height: auto;
        }
`

const SlideInner = styled.div`
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .slick-dots {
          position: static;
  }

        @media (min-width: 320px) and (max-width: 567px) {
    .slick-dots li {
          width: 10px;
        height: 10px;
    }
  }
        `
