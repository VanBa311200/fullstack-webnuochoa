import React from 'react'
import { Container } from 'react-bootstrap'

import { CarouselData } from '../components/carousel/CarouselData'
import Carousel from '../components/carousel/Carousel'
import NewProducts from '../components/sections/NewProducts'
import { LineHorizontal } from './El'
import SectionPR from '../components/sections/SectionPR'

const Home = () => {


  return (
    <Container fluid style={{ padding: 'unset' }}>
      <Carousel slides={CarouselData} />
      <NewProducts />
      <LineHorizontal />
      <SectionPR />
    </Container>
  )
}

export default Home
