import React, { useContext } from 'react'
import { NavbarContext } from '../../context/NavbarContext'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const ButtonMobile = () => {
  const { setShowSidebarMobile, showSidebarMobile } = useContext(NavbarContext);

  const onClickHandler = (e) => {
    setShowSidebarMobile(!showSidebarMobile)
  }

  return (
    <IconButton onClick={onClickHandler}>
      {showSidebarMobile ? <CloseIcon /> : <MenuIcon />}
    </IconButton >
  )
}

export default ButtonMobile
