import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Container, Box, Stack, AppBar, Divider, IconButton } from '@mui/material';
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import DropDown from './DropDown'
import { HeadLeft, HeadRight, HeadItem, LinkContact, NavbarBrand, NavbarCollapse, NavbarNav, NavItem, NavLink, ImageProfile } from '../../assets/styles/ElNavbar'
import HearIcon from './HearIcon'
import ButtonMobile from './ButtonMobile'
import SideBarMobile from './SideBarMobile'
import SidebarShoppingCart from './SidebarShoppingCart'
import ShoppingIcon from './ShoppingIcon'
import { apiUrl } from '../../context/contanst'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../store/auth/authSlice'
import Search from '../Search';
import PageSearchMobile from '../PageSearchMobile';

const listNavbar = [
  { path: '/', text: 'Home' },
  { path: '/perfume', text: 'Perfume' },
  { path: '/forGirl', text: 'For Girl' },
  { path: '/forMan', text: 'For Man' },
  { path: '/contact', text: 'Contact' },
]

const NavbarMenu = ({ match }) => {
  const { user } = useSelector(selectAuth)
  const [isShowDropDown, setIsShowDropDown] = useState(false)
  const [showPageSearch, setShowPageSearch] = useState(false)
  const ref = useRef(null)
  const urlActive = match.path

  showPageSearch ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'unset';

  const handleOnClickUser = () => {
    setIsShowDropDown(!isShowDropDown)
  }

  const handleShowPageSearch = () => {
    setShowPageSearch(!showPageSearch)
  }

  useEffect(() => {
    const checkClickOutside = (e) => {
      if (isShowDropDown && !ref.current?.contains(e.target)) {
        setIsShowDropDown(false)
      }
    }

    document.addEventListener('click', checkClickOutside)
    return () => {
      document.removeEventListener('click', checkClickOutside)
    }

  }, [isShowDropDown])

  return (
    <>
      <AppBar position='sticky'>
        <Box sx={{ backgroundColor: 'rgb(46, 46, 46)', display: ['none', 'none', 'none', 'block'] }}>
          <Container>
            <Stack
              flexDirection='row'
              justifyContent='space-between'
              minHeight='2.5rem'
            >
              <HeadLeft>
                <HeadItem><LinkContact href='#' >Phone: (+84) 968246516</LinkContact></HeadItem>
                <Divider orientation="vertical" variant="middle" flexItem />
                <HeadItem><LinkContact href='#' > <FaTwitter /> </LinkContact></HeadItem>
                <HeadItem><LinkContact href='#' > <FaFacebookF /> </LinkContact></HeadItem>
                <HeadItem><LinkContact href='#' > <FaInstagram /> </LinkContact></HeadItem>
                <HeadItem><LinkContact href='#' > <FaYoutube /> </LinkContact></HeadItem>
              </HeadLeft>

              <HeadRight>
                {user ?
                  <>
                    <HeadItem style={{ borderRight: 'unset' }} >
                      <LinkContact ref={ref} onClick={handleOnClickUser} >
                        <ImageProfile src={user.image ? `${apiUrl}/static/${user.image}` : '/assets/images/img-profile.png'} />
                        <p style={{ margin: 'unset' }}>{user.fullname}</p>
                      </LinkContact>
                    </HeadItem>
                    <DropDown isShowDropDown={isShowDropDown} />
                  </>
                  : <>
                    <HeadItem><LinkContact as={Link} to='/register' > Register </LinkContact></HeadItem>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <HeadItem><LinkContact as={Link} to='/login'  > Login </LinkContact></HeadItem>
                  </>
                }
              </HeadRight>

            </Stack>
          </Container>
        </Box>
        <Box component='nav' minHeight='65px' display='flex'>
          <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <NavbarBrand to='/'>ShopPi</NavbarBrand>
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='space-between'
              width='100%'
              sx={{ display: ['flex', 'flex', 'flex', 'none'] }}
            >
              <ButtonMobile />
              <Search />

              <Stack
                flexDirection='row'
                gap={1}
              >
                <IconButton sx={{ display: ['flex', 'none', 'none', 'none'] }} onClick={handleShowPageSearch}>
                  <AiOutlineSearch />
                </IconButton>
                <ShoppingIcon />

              </Stack>
            </Box>
            <SideBarMobile />
            <SidebarShoppingCart />
            <NavbarCollapse>
              <NavbarNav>
                {listNavbar && listNavbar.map(p =>
                  <NavItem key={p.text} className={urlActive === p.path ? 'active' : ''}>
                    <NavLink as={Link} to={p.path}>{p.text}</NavLink>
                  </NavItem>
                )
                }
              </NavbarNav>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Search />
                <Stack
                  flexDirection='row'
                  pl='10px'
                >
                  <HearIcon />
                  <ShoppingIcon />
                </Stack>
              </Box>
            </NavbarCollapse>
          </Container>
        </Box>
        <PageSearchMobile show={showPageSearch} onClose={() => setShowPageSearch(!showPageSearch)} />
      </AppBar >
    </>
  )
}

export default NavbarMenu


