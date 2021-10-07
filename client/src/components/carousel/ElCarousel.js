import styled from "styled-components"


export const Container = styled.section` 
  position: relative;
`

export const ImageSlide = styled.img`
  object-fit: fill;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  outline: none;
`

export const SlideInner = styled.div`
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