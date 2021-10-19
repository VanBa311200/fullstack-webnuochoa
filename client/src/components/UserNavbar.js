import { Container, IconButton } from '@mui/material'
import { Link, Redirect } from 'react-router-dom';
import { RiLuggageCartLine, RiAccountCircleFill, RiLogoutBoxRLine } from 'react-icons/ri'
import { styled as styledMUI } from '@mui/styles'
import { useDispatch } from 'react-redux';
import { userLogout } from '../store/auth/authSlice';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import { CSSTransition } from 'react-transition-group';

const UserNavbar = ({ show, onClick, ...rest }) => {
  const dispatch = useDispatch()
  const ref = React.useRef(null)
  const url = rest.match.path.replace('/', '')

  const handleOnClick = () => {
    dispatch(userLogout())
    return <Redirect to='/' />
  }

  const handleOnClose = () => {
    onClick(!show)
  }

  return (
    <CSSTransition
      in={show}
      classNames='fadeInDown'
      nodeRef={ref}
      timeout={300}
      unmountOnExit
    >
      <Wrapper ref={ref}>
        <Container maxWidth='md' sx={{ marginTop: '30px' }}>
          <WrapIcon >
            <IconButton onClick={handleOnClose}>
              <CloseIcon />
            </IconButton>
          </WrapIcon>
          <NavList>
            <li>
              <LinkItem to='/account' className={url === 'account' ? 'active' : ''}>
                <RiAccountCircleFill />
                <Text>Tài khoản của tôi</Text>
              </LinkItem>
            </li>
            <li>
              <LinkItem to='/bill' className={url === 'bill' ? 'active' : ''}>
                <RiLuggageCartLine />
                <Text>Đơn mua</Text>
              </LinkItem>
            </li>
            <li>
              <LinkItem to='#' onClick={handleOnClick}>
                <RiLogoutBoxRLine />
                <Text>Đăng xuất</Text>
              </LinkItem>
            </li>
          </NavList>
        </Container>
      </Wrapper>
    </CSSTransition>

  )
}

export default UserNavbar

const WrapIcon = styledMUI('div')({
  display: 'flex',
  justifyContent: 'flex-end',
})

const Wrapper = styledMUI('div')({
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  backgroundColor: 'rgba(255,255,255, .8)',
  zIndex: '10000',
  backdropFilter: 'blur(10px)'
})

const NavList = styledMUI('ul')({
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',

  '& li': {
    padding: '10px 0',
  },
})

const LinkItem = styledMUI(Link)(({ theme }) => ({
  fontSize: '17px',
  color: theme.palette.grey[700],
  display: 'flex',
  alignItems: 'center',
  transition: 'all .3s ease',

  '& svg': {
    fontSize: '34px ',
    marginRight: '10px'
  },

  '&:hover': {
    color: theme.palette.grey[900]
  },

  '&.active': {
    color: theme.palette.grey[900],
  }
}))

const Text = styledMUI('p')(({ theme }) => ({
  margin: 'unset',
  transition: 'all .3s ease',
}))