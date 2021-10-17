import React from 'react'
import { useDispatch } from 'react-redux';
import { updateItemCart, removeItemCart } from '../../store/cart/cartSlice';
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

import { toVND } from '../../helper';
import InputQuality from '../InputQuality';
import { apiUrl } from '../../context/contanst';
import { CartItem, CartImage, CartInfo, CartInfoName, CartInfoSize, CartInfoPrice, CartAction, ButtonDeleteCart } from '../../assets/styles/ElNavbar'

const ItemCart = ({ product, delay }) => {
  const dispatch = useDispatch()

  const handleOnClick = (value) => {
    const newP = { ...product, quality: value }
    dispatch(updateItemCart(newP))
  }

  const handleRemoveItem = () => {
    dispatch(removeItemCart(product))
  }

  return (
    <CartItem delay={delay}>
      <Box>
        <Link to={`/product/${product._id}`} underline='none' >
          <CartImage src={`${apiUrl}/static/${product.images[0].fileName}`} />
        </Link>
      </Box>
      <CartInfo>
        <CartInfoName to={`/product/${product._id}`}>{product.name}</CartInfoName>
        <CartInfoSize>{product.value}</CartInfoSize>
        <CartInfoPrice>{toVND(product.price_sale)}</CartInfoPrice>
        <CartAction>
          <InputQuality onClick={handleOnClick} value={product.quality} />
          <ButtonDeleteCart onClick={handleRemoveItem}>Xóa</ButtonDeleteCart>
        </CartAction>
      </CartInfo>
    </CartItem >
  )
}

export default ItemCart
