import React from 'react'

import Footer from '../components/Footer/Footer'
import NavbarMenu from '../components/navbar/NavbarMenu'
import PageLoadingProsecc from '../components/PageLoadingProsecc'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/auth/authSlice'

const Master1 = (props) => {
  const { authLoading } = useSelector(selectAuth)


  return (
    <>
      {
        authLoading ?
          <PageLoadingProsecc /> :
          <>
            <NavbarMenu {...props} />
            {props.children}
            <Footer />
          </>
      }
    </>

  )
}

export default Master1
