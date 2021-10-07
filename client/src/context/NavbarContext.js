import React, { createContext, useState } from 'react'
export const NavbarContext = createContext();

const NavbarContextProvider = ({ children }) => {
  const [showSidebarMobile, setShowSidebarMobile] = useState(false)
  const [showShoppingCart, setShowShoppingCart] = useState(false)

  if (showSidebarMobile || showShoppingCart) {
    document.body.style.overflowY = 'hidden'
  } else document.body.style.overflowY = 'unset'

  const navbarContextData = {
    showSidebarMobile, setShowSidebarMobile,
    showShoppingCart, setShowShoppingCart
  }

  return (
    <NavbarContext.Provider value={navbarContextData}>
      {children}
    </NavbarContext.Provider>
  )
}


export default NavbarContextProvider
