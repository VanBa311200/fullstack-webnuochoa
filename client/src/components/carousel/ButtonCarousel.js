import React from 'react'

import { ButtonSlide, IconPrev, IconNext } from './ElCarousel'

const ButtonCarousel = ({ direction, moveSlide }) => {
  return (
    <ButtonSlide
      onClick={moveSlide}
      direction={direction}
    >
      {
        direction === 'next' ?
          <IconNext />
          : <IconPrev />
      }
    </ButtonSlide>
  )
}

export default ButtonCarousel
