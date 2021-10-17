import React, { useContext } from 'react'
import '../../assets/styles/font/flaticon/flaticon.css'
import { useSelector } from 'react-redux'
import { selectCart } from '../../store/cart/cartSlice'

import { NavbarContext } from '../../context/NavbarContext'
import { IconButton, Badge } from '@mui/material'

import { AiOutlineShoppingCart } from 'react-icons/ai'

const ShoppingIcon = ({ color }) => {
  const cartItems = useSelector(selectCart)

  const { setShowShoppingCart, setShowSidebarMobile } = useContext(NavbarContext)

  const handleClick = () => {
    setShowShoppingCart(true);
    setShowSidebarMobile(false)
  }

  return (

    <IconButton onClick={handleClick}>
      <Badge badgeContent={cartItems.length} >
        <AiOutlineShoppingCart sx={{ color }} />
      </Badge>
    </IconButton>
  )
}

export default ShoppingIcon
