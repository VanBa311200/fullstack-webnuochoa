import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import '../../assets/styles/font/flaticon/flaticon.css'
import style from '../../assets/styles/Css/Styles.module.css'
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaSearch } from 'react-icons/fa'
import { Container, Row, Col } from 'react-bootstrap'
import { Head, HeadLeft, HeadRight, HeadItem, LinkContact, NavbarBrand, Navbar, NavbarCollapse, NavbarNav, NavItem, NavLink, NavbarRight, FormSearch, FormInput, ButtonSearch, ImageProfile } from '../../assets/styles/ElNavbar'
import HearIcon from './HearIcon'
import ButtonMobile from './ButtonMobile'
import SideBarMobile from './SideBarMobile'
import SidebarShoppingCart from './SidebarShoppingCart'
import ShoppingIcon from './ShoppingIcon'
import { AuthContext } from '../../context/AuthContext'
import { apiUrl } from '../../context/contanst'

const NavbarMenu = () => {
  const { authState: { user } } = useContext(AuthContext)

  return (
    <>
      <Container fluid style={{ padding: '0px' }}>
        <Head>
          <Container style={{ padding: '0.7%' }}>
            <Row>
              <Col md={6}>
                <HeadLeft>
                  <HeadItem><LinkContact href='/' >Phone: (+84) 968246516</LinkContact></HeadItem>
                  <HeadItem><LinkContact href='/' > <FaTwitter /> </LinkContact></HeadItem>
                  <HeadItem><LinkContact href='/' > <FaFacebookF /> </LinkContact></HeadItem>
                  <HeadItem><LinkContact href='/' > <FaInstagram /> </LinkContact></HeadItem>
                  <HeadItem><LinkContact href='/' > <FaYoutube /> </LinkContact></HeadItem>
                </HeadLeft>
              </Col>
              <Col md={6}>
                <HeadRight>
                  {user ?
                    <HeadItem style={{ borderRight: 'unset' }}>
                      <LinkContact >
                        <ImageProfile src={user.image ? `${apiUrl}/static/${user.image}` : '/assets/images/img-profile.png'} />
                        {user.fullname}
                      </LinkContact>
                    </HeadItem>
                    : <>
                      <HeadItem><LinkContact as={Link} to='/register' > Register </LinkContact></HeadItem>
                      <HeadItem><LinkContact as={Link} to='/login'  > Login </LinkContact></HeadItem>
                    </>
                  }
                </HeadRight>
              </Col>
            </Row>
          </Container>
        </Head>
        <Navbar>
          <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <NavbarBrand as={Link} to='/'>ShopPI</NavbarBrand>
            <ButtonMobile />
            <SideBarMobile />
            <SidebarShoppingCart />
            <NavbarCollapse>
              <NavbarNav>
                <NavItem className='active'>
                  <NavLink as={Link} to='/'>Home</NavLink>
                </NavItem>
                <NavItem >
                  <NavLink as={Link} to='/'>Perfume</NavLink>
                </NavItem>
                <NavItem >
                  <NavLink as={Link} to='/'>Skin Care</NavLink>
                </NavItem>
                <NavItem >
                  <NavLink as={Link} to='/'>For Man</NavLink>
                </NavItem>
                <NavItem >
                  <NavLink as={Link} to='/'>Contact</NavLink>
                </NavItem>
              </NavbarNav>
              <NavbarRight>
                <FormSearch>
                  <FormInput placeholder='Search product...' />
                  <ButtonSearch>
                    <FaSearch />
                  </ButtonSearch>
                </FormSearch>
                <Col className={style.df}>
                  <HearIcon />
                  <ShoppingIcon />
                </Col>
              </NavbarRight>
            </NavbarCollapse>
          </Container>
        </Navbar>
      </Container>
    </>
  )
}

export default NavbarMenu
