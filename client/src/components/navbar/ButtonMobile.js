import React, { useContext } from 'react'
// import style from './styled-ele/ButtonMobile.module.css'
import { ButtonM, InputButtonMobile, MenuIcon, MenuLine } from '../../assets/styles/ElNavbar'
import { NavbarContext } from '../../context/NavbarContext'

const ButtonMobile = () => {
  const { setShowSidebarMobile, showSidebarMobile } = useContext(NavbarContext);

  const onChangHandler = (e) => {
    setShowSidebarMobile(e.target.checked)
  }

  return (
    <ButtonM>
      <InputButtonMobile
        type="checkbox"
        onChange={onChangHandler}
        checked={showSidebarMobile}
      />
      <MenuIcon >
        <MenuLine >
        </MenuLine>
      </MenuIcon>
    </ButtonM >
  )
}

export default ButtonMobile
