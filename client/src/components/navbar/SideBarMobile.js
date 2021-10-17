import React, { Fragment, useContext } from 'react'
import { FaPhoneSquareAlt, FaFacebookF, FaInstagram } from 'react-icons/fa'
import { AiFillYoutube } from 'react-icons/ai'
import { CSSTransition } from 'react-transition-group'

import { NavbarContext } from '../../context/NavbarContext'
import '../../assets/styles/Csstransition/styles.css'
import { SideBarM, BodySideBarMobile, SideBarNav, FooterSBMobile, FooterSocial, FooterPhone, ListSocial, ListItem, ItemNav, LinkCustom, Overlay, ItemUser } from '../../assets/styles/ElNavbar'
const SideBarMobile = ({ show }) => {
  const nodeRef = React.useRef(null)
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
                  <ItemNav delay='.8s' underLine>
                    <ItemUser to='/login' > Tài khoản</ItemUser>
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
