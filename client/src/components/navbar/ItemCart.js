import React, { useContext } from 'react'

import { toVND } from '../../helper';
import { CartContext } from '../../context/CartContext';
import InputQuality from '../InputQuality';
import { CartItem, CartImage, CartInfo, CartInfoName, CartInfoSize, CartInfoPrice, CartAction, ButtonDeleteCart } from '../../assets/styles/ElNavbar'
import { apiUrl } from '../../context/contanst';

const ItemCart = ({ product, delay }) => {

  const { removeItemCart, updateItemCart } = useContext(CartContext)

  const getValue = (value) => {
    const newP = { ...product, quality: value }
    updateItemCart(newP)
  }

  const handleRemoveItem = () => {
    removeItemCart(product._id, product.value)
  }

  return (
    <CartItem delay={delay}>
      <CartImage src={`${apiUrl}/static/${product.images[0].fileName}`} />
      <CartInfo>
        <CartInfoName>{product.name}</CartInfoName>
        <CartInfoSize>{product.value}</CartInfoSize>
        <CartInfoPrice>{toVND(product.price_sale)}</CartInfoPrice>
        <CartAction>
          <InputQuality onClick={getValue} value={product.quality} />
          <ButtonDeleteCart onClick={handleRemoveItem}>Xóa</ButtonDeleteCart>
        </CartAction>
      </CartInfo>
    </CartItem>
  )
}

export default ItemCart
