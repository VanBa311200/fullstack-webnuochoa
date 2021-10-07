import React, { useContext } from 'react'
import '../../assets/styles/font/flaticon/flaticon.css'

import { NavbarContext } from '../../context/NavbarContext'
import style from '../../assets/styles/Css/Styles.module.css'
import { CartContext } from '../../context/CartContext'

const ShoppingIcon = ({ color }) => {
  const { setShowShoppingCart, setShowSidebarMobile } = useContext(NavbarContext)
  const { item: { product } } = useContext(CartContext)

  const handleClick = () => {
    setShowShoppingCart(true);
    setShowSidebarMobile(false)
  }

  return (

    <div className={style.p}>
      <i className={`flaticon-shopping-cart ${style.sizeicon}`} style={{ color: color || 'black' }}
        onClick={handleClick}
      ></i>
      <span className={style.c}>{product.length}</span>
    </div>
  )
}

export default ShoppingIcon
