import React, { Fragment, useContext } from 'react'
import { FaPhoneSquareAlt, FaFacebookF, FaInstagram } from 'react-icons/fa'
import { AiFillYoutube } from 'react-icons/ai'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

import { NavbarContext } from '../../context/NavbarContext'
import '../../assets/styles/Csstransition/styles.css'
import { SideBarM, BodySideBarMobile, SideBarNav, FooterSBMobile, FooterSocial, FooterPhone, ListSocial, ListItem, ItemNav, LinkCustom, Overlay, ItemUser } from '../../assets/styles/ElNavbar'
import { useDispatch } from 'react-redux'
import { userLogout, selectAuth } from '../../store/auth/authSlice'

const listNavbar = [
  { path: '/', text: 'Home' },
  { path: '/perfume', text: 'Perfume' },
  { path: '/forGirl', text: 'For Girl' },
  { path: '/forMan', text: 'For Man' },
  { path: '/contact', text: 'Contact' },
]

const SideBarMobile = ({ show }) => {
  const nodeRef = React.useRef(null)
  const history = useHistory()
  const { showSidebarMobile, setShowSidebarMobile } = useContext(NavbarContext);
  const dispatch = useDispatch()
  const { user } = useSelector(selectAuth)

  const handleOnlick = () => {
    setShowSidebarMobile(false);
  }

  const handleLogout = () => {
    dispatch(userLogout())
    history.push('/')
    toast.success('Logout success...!')
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
                  {listNavbar && listNavbar.map((p, index) =>
                    <ItemNav key={index} delay={`0.${index + 3}s`}>
                      <LinkCustom to={p.path}>{p.text}</LinkCustom>
                    </ItemNav >
                  )
                  }
                  <ItemNav delay='.8s' underLine>
                    <ItemUser to='/account' > Tài khoản</ItemUser>
                  </ItemNav>
                  {user && <ItemNav delay='.9s' underLine onClick={handleLogout}>
                    <ItemUser to='#' > Đăng xuất</ItemUser>
                  </ItemNav>}
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
