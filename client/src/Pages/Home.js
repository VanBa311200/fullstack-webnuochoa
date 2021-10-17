import React from 'react'
import { Divider } from '@mui/material'

import { CarouselData } from '../components/carousel/CarouselData'
import Carousel from '../components/carousel/Carousel'
import NewProducts from '../components/sections/NewProducts'
import SectionPR from '../components/sections/SectionPR'
import { Paper } from '@mui/material'

const Home = () => {


  return (
    <Paper >
      <Carousel slides={CarouselData} />
      <NewProducts />
      <Divider />
      <SectionPR />
    </Paper>
  )
}

export default Home
