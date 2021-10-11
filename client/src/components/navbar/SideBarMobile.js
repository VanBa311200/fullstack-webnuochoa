import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaPhoneSquareAlt, FaFacebookF, FaInstagram } from 'react-icons/fa'
import { AiFillYoutube } from 'react-icons/ai'
import { CSSTransition } from 'react-transition-group'
import { useSelector } from 'react-redux'

import { selectAuth } from '../../store/auth/authSlice'
import { NavbarContext } from '../../context/NavbarContext'
import '../../assets/styles/Csstransition/styles.css'
import HearIcon from './HearIcon'
import ShoppingIcon from './ShoppingIcon'
import { Col } from 'react-bootstrap'
import style from '../../assets/styles/Css/Styles.module.css'
import { SideBarM, HeadSidebar, ImgProfile, DFCenter, LinkAction, NavbarRight, FormSearch, FormInput, ButtonSearch, BodySideBarMobile, SideBarNav, FooterSBMobile, FooterSocial, FooterPhone, ListSocial, ListItem, ItemNav, LinkCustom, Overlay } from '../../assets/styles/ElNavbar'
const SideBarMobile = ({ show }) => {
  const nodeRef = React.useRef(null)
  const { user } = useSelector(selectAuth)
  const { showSidebarMobile, setShowSidebarMobile } = useContext(NavbarContext);

  const handleOnlick = () => {
    setShowSidebarMobile(false);
  }

  return (
    <>

      <CSSTransition
        in={showSidebarMobile}
        nodeRef={nodeRef}
        timeout={450}
        classNames="sidebarmobile"
        unmountOnExit
      >
        <Fragment>
          <Overlay onClick={handleOnlick} />
          <SideBarM ref={nodeRef}>
            <HeadSidebar onClick={handleOnlick}>
              <DFCenter>
                <Link to='/account' >
                  <ImgProfile src="/assets/images/img-profile.png" alt='Image_Profile' width='50px' height='50px' />
                </Link>
              </DFCenter>
              <DFCenter>
                {user ? <LinkAction to='/user' as={Link} >{user.fullname}</LinkAction >
                  : <>
                    <LinkAction to='/register' as={Link} >Register</LinkAction >
                    <LinkAction to='/login' as={Link} >Login</LinkAction >
                  </>
                }
              </DFCenter>
              <NavbarRight style={{ padding: '0 15px' }}>
                <FormSearch width='180px'>
                  <FormInput style={{ paddingRight: '32px' }} />
                  <ButtonSearch>
                    <FaSearch />
                  </ButtonSearch>
                </FormSearch>
                <Col className={style.df}>
                  <HearIcon color='#fff' />
                  <ShoppingIcon color='#fff' />
                </Col>
              </NavbarRight>
            </HeadSidebar>
            <BodySideBarMobile>
              <SideBarNav>
                <ListItem onClick={handleOnlick}>
                  <ItemNav delay='0.3s'>
                    <LinkCustom to='/'>Home</LinkCustom>
                  </ItemNav >
                  <ItemNav delay='0.4s'>
                    <LinkCustom to='/perfum'>Perfum</LinkCustom>
                  </ItemNav >
                  <ItemNav delay='0.5s'>
                    <LinkCustom to='/skincare'>Skin Care</LinkCustom>
                  </ItemNav>
                  <ItemNav delay='.6s'>
                    <LinkCustom to='/perfum/forman'>For Man</LinkCustom>
                  </ItemNav>
                  <ItemNav delay='.7s'>
                    <LinkCustom to='/contact'>Contact</LinkCustom>
                  </ItemNav>
                </ListItem>
              </SideBarNav>
              <FooterSBMobile show={show}>
                <FooterPhone>
                  <FaPhoneSquareAlt style={{ marginRight: '7px' }} />
                  <span>+84 68246516</span>
                </FooterPhone>
                <FooterSocial>
                  <ListSocial>
                    <FaFacebookF />
                  </ListSocial>
                  <ListSocial>
                    <AiFillYoutube />
                  </ListSocial>
                  <ListSocial>
                    <FaInstagram />
                  </ListSocial>
                </FooterSocial>
              </FooterSBMobile>
            </BodySideBarMobile>
          </SideBarM>
        </Fragment>
      </CSSTransition>
    </>
  )
}

export default SideBarMobile
