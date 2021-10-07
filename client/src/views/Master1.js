import React, { useContext } from 'react'

import Footer from '../components/Footer/Footer'
import NavbarMenu from '../components/navbar/NavbarMenu'
import PageLoadingProsecc from '../components/PageLoadingProsecc'
import { AuthContext } from '../context/AuthContext'

const Master1 = ({ children }) => {
  const { authState: { authLoading } } = useContext(AuthContext)

  return (
    <>
      {
        authLoading ?
          <PageLoadingProsecc /> :
          <>
            <NavbarMenu />
            {children}
            <Footer />
          </>
      }
    </>

  )
}

export default Master1
