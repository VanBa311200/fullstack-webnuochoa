import React, { useContext } from 'react'
import '../../assets/styles/font/flaticon/flaticon.css'
import { useSelector } from 'react-redux'
import { selectCart } from '../../store/cart/cartSlice'

import { NavbarContext } from '../../context/NavbarContext'
import style from '../../assets/styles/Css/Styles.module.css'

const ShoppingIcon = ({ color }) => {
  const cartItems = useSelector(selectCart)
  const { setShowShoppingCart, setShowSidebarMobile } = useContext(NavbarContext)

  const handleClick = () => {
    setShowShoppingCart(true);
    setShowSidebarMobile(false)
  }

  return (

    <div className={style.p}>
      <i className={`flaticon-shopping-cart ${style.sizeicon}`} style={{ color: color || 'black' }}
        onClick={handleClick}
      ></i>
      <span className={style.c}>{cartItems.length}</span>
    </div>
  )
}

export default ShoppingIcon
