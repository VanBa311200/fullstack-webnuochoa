import React, { useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css, keyframes } from 'styled-components'
import { IoMdClose } from 'react-icons/io'
import { GiShoppingCart } from 'react-icons/gi'

import { toVND } from '../../helper';
import InputQuality from '../InputQuality';
import { TagSalePercent } from './ElNewProducts'
import RatingStart from '../RatingStart';
import { apiUrl } from '../../context/contanst';
import { useDispatch } from 'react-redux'
import { addItemCart } from '../../store/cart/cartSlice';


const ModalProduct = ({ isShow, data, onCloseModal }) => {
  const dispatch = useDispatch()
  const initialState = {
    index: 1,
    value: '30ml',
    quality: 1
  }
  const [size, setSize] = useState(initialState);

  const valueInput = (quality) => {
    setSize({
      ...size,
      quality
    })
  }

  const handleAddItemCart = () => {
    const product = { ...data, ...size }
    dispatch(addItemCart(product))
    setSize(initialState)
    onCloseModal(false)
  }

  const options = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }

  return (
    data ?
      <Modal show={isShow}>
        <ModalOverlay onClick={() => onCloseModal(false)} />
        <ModalBody>
          <Wrap>
            <Left listImage={data.images}>
              <Slider {...options}>
                {
                  data.images.map((p, i) => (
                    <ImgItem key={i}>
                      <img src={`${apiUrl}/static/${p.fileName}`} alt={p.name} />
                    </ImgItem>
                  ))
                }
              </Slider>
            </Left>
            <Right>
              <h2>{data.id_brand.name}</h2>
              <h3>{data.name}</h3>
              <RatingStart number={data.rating_number} />
              <p>{data.description}</p>
              <GroupAction>
                <div>
                  <span>Kích thước: </span>
                  <Action>
                    <button className={`size ${size.index === 1 ? 'active' : ''}`}
                      onClick={() => setSize({ ...size, index: 1, value: '30ml' })}
                    >30ml</button>
                    <button className={`size ${size.index === 2 ? 'active' : ''}`}
                      onClick={() => setSize({ ...size, index: 2, value: '60ml' })}
                    >60ml</button>
                    <button className={`size ${size.index === 3 ? 'active' : ''}`}
                      onClick={() => setSize({ ...size, index: 3, value: '100ml' })}
                    >100ml</button>
                  </Action>
                </div>
                <div>
                  <span>Số lượng: </span>
                  <InputQuality onClick={valueInput} />
                </div>
                <div>
                  <span>Giá: </span>
                  <p className='price'>
                    {toVND(data.price_sale)}
                    <TagSalePercent style={{ marginLeft: '10px' }}>
                      {`-${data.percent_sale}%`}
                    </TagSalePercent>
                  </p>
                </div>
                <div>
                  <Action>
                    <ButtonAddCart onClick={handleAddItemCart}>
                      <IconCart />
                      thêm vào giỏ hàng
                    </ButtonAddCart>
                    <ButtonByNow style={{ marginLeft: '15px' }} onClick={handleAddItemCart}>
                      mua ngay
                    </ButtonByNow>
                  </Action>
                </div>
              </GroupAction>
            </Right>
          </Wrap>
          <IconClose onClick={() => onCloseModal(false)} />
        </ModalBody>
      </Modal> : ''
  )
}

export default ModalProduct

const fadeGrownUP = keyframes`
  from {
    opacity: 0;
    transform: scale(.7);
  } to {  
    opacity: 1;
    transform: scale(1);
  }
`

const fadeOut = keyframes`
  from {
    opacity: 0;
  }to {
    opacity: 1;
  }
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100vh;
  width: 100%;
  display: ${({ show }) => show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
`

const ModalOverlay = styled.div`
  position: absolute;
  width: 100%;  
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  animation: ${fadeOut} .4s ease forwards;
`

const ModalBody = styled.div`
  height: auto;
  width: 700px;
  z-index: 1;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  padding: 30px 30px;
  animation: ${fadeGrownUP} .4s ease forwards;
`

const Wrap = styled.div`
  display: flex;
  flex: 1;
`

const Right = styled.div`
  padding: unset;
  padding-left: 20px;
  width: 70%;
  height: 100%;

  h2 {
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 18px;
  }

  & > p {
    font-size: 15px; 
    margin-top: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`

const List = (data) => {
  let style = '';

  data.forEach((e, i) => {
    style += `
    .slick-dots li:nth-child(${i + 1}) button:before {
      content: '';
      width: var(--size-box);
      height: var(--size-box);
      background-image: url(${apiUrl}/static/${e.fileName});
      background-size: var(--size-box) var(--size-box);
      }
    `
  })

  return css`${style}`;
}

const Left = styled(Right)`
  --size-box: 50px;
  padding: unset;
  width: 40%;

  .slick-dots {
    bottom: calc(var(--size-box)* -1);
    position: static;
  }

  .slick-dots li {
    width: var(--size-box);
    height: var(--size-box);
    margin: 0 5px;
  }

  .slick-dots li button {
    width: var(--size-box);
    height: var(--size-box);
  }

  .slick-prev,
  .slick-next {
    z-index: -2;
  }

  ${({ listImage }) => listImage ? List(listImage) : ''}
`

const ImgItem = styled.div`
width: inherit;

  img {
  display: block;
  width: 100%;
  height: 450px;
  object-fit: cover;
}
`

const IconClose = styled(IoMdClose)`
position: absolute;
top: 10px;
right: 10px;
color: black;
font-size: 30px;
cursor: pointer;
`

const GroupAction = styled.div`
display: flex;
flex-direction: column;
  

  & > div {
  display: flex;
  margin: 10px 0;
  align-items: center;
}

  & div p {
  margin: unset;
  display: flex;
  align-items: center;
}

div > span {
  width: 110px;
}

  .price {
  font-size: 20px;
  color:var(--color-primary);
  font-weight: 500;
}
`

const Action = styled.div`
display: flex;

  .size.active {
  border: 1px solid var(--color-primary);
}

  .size:hover {
  border: 1px solid var(--color-primary);
}

  .size {
  cursor: pointer;
  min-width: 5rem;
  min-height: 2.125rem;
  box-sizing: border-box;
  padding: 4px 5px;
  margin: 0px 8px 0px 0px;
  color: rgba(0, 0, 0, 0.8);
  text-align: left;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.09);
  position: relative;
  background: rgb(255, 255, 255);
  outline: 0px;
  word-break: break-word;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
`

const ButtonAddCart = styled.button`
display: flex;
justify-content: center;
align-items: center;
height: 48px;
padding: 0 20px;
outline: none;
border-radius: 2px;
border: none;
text-transform: capitalize;
background-color: var(--color-primary-3);
`

const IconCart = styled(GiShoppingCart)`
font-size: 25px;
margin-right: 7px;
`

const ButtonByNow = styled(ButtonAddCart)`
background-color: var(--color-primary);
color: white;
`