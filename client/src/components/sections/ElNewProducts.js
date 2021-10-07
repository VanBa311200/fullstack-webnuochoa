import styled, { keyframes } from 'styled-components'

import { Container, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../assets/styles/Css/_Variable.css'

const FadeInBottom = keyframes`
  from {
    opacity: 0;
    top: 30%;
  }to {
    opacity: 1;
    top: 50%;
  }
`

export const SectionContent = styled(Container)`
  padding-top: 55px;
  padding-bottom: 55px;
`

export const SectionHeading = styled.h2`
  text-transform: uppercase;
  text-align: center;
  color: #000;
  font-size: 25px;
  font-weight: 500;
  padding-bottom: 40px;
  margin: unset;

  @media (min-width: 320px) and (max-width: 576px) {
    font-size: 20px;
  }
`

export const ProductItem = styled(Col)`
  position: relative;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  }

  @media only screen and (min-width: 320px) and (max-width: 411px) {
    padding: 0 5px;
  }
`

export const OptionDetail = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 40px;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  display: none;
  animation: ${FadeInBottom} 0.3s linear;
`

export const PImg = styled.img`
  max-width: 100%;
  height: auto;
  user-select: none;
`

export const ProductImage = styled.div`
  position: relative;

  &:hover ${OptionDetail}{
    display: flex;
    z-index: 1000;
  }
  
  &:hover ${PImg} {
    filter: blur(2px);
    -webkit-filter: blur(2px);
  }
`

export const LinkProduct = styled(Link)`
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
`

export const ViewOption = styled.div`
  color: #fff;
  padding: 10px 16px 10px 16px;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  transition: all 0.3s;
  border: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    z-index: 1;
  }
`

export const ProductInfo = styled.div`
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`

export const ProductBrand = styled.p`
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 3.5px;
  text-transform: uppercase;
  user-select: none;

  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  @media (min-width: 320px) and (max-width: 576px) {
    margin-bottom: 7px;
    font-size: 13.5px;
  }
`

export const ProductName = styled(Link)`
  color: var(--color-primary);
  font-size: 17px;
  text-decoration: none;
  user-select: none;
  
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;     


  &:hover {
    text-decoration: none;
    color: var(--color-primary);
  }

  @media (min-width: 320px) and (max-width: 576px) {
    font-size: 15px;
  }
`

export const ProductInfoGroup = styled.div`
  /* margin-top: auto; */
  margin-top: 15px;

`

export const ProductInfoPriceSale = styled.p`
  font-size: 15px;
  color: var(--text-sale);
  text-decoration: line-through;
  font-weight: bold;
  letter-spacing: 1.3px;
  margin-bottom: 0px;
  user-select: none;

  @media (min-width: 320px) and (max-width: 576px) {
    font-size: 13px;
  }
`

export const TagSalePercent = styled.span`
  background-color: var(--color-primary);
  width: auto;
  border-radius: 3px;
  font-weight: normal;
  padding: 0 5px;
  font-weight: 400;
  height: fit-content;
  color: white;

`

export const ProductInfoPrice = styled.p`
  margin-bottom: unset;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1.3px;
  user-select: none;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (min-width: 320px) and (max-width: 576px) {
    font-size: 13px;
  }
`


