import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import '../../assets/styles/Csstransition/styles.css'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { RiLuggageCartLine, RiAccountCircleFill, RiLogoutBoxRLine } from 'react-icons/ri'
import { toast } from 'react-toastify'

import { userLogout } from '../../store/auth/authSlice'

const DropDown = ({ isShowDropDown }) => {
  const noderef = React.useRef(null)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    dispatch(userLogout())
    history.push('/')
    toast.success('Logout success...!')
  }



  return (
    <CSSTransition
      in={isShowDropDown}
      nodeRef={noderef}
      timeout={350}
      classNames="dropDown"
      unmountOnExit
    >
      <DropDownMenu ref={noderef}>
        <DropDownItem>
          <RiAccountCircleFill />
          <Link to='/account'>Tài khoản của tôi</Link>
        </DropDownItem>
        <DropDownItem >
          <RiLuggageCartLine />
          <Link to='/bill'>Đơn mua</Link>
        </DropDownItem>
        <hr />
        <DropDownItem >
          <RiLogoutBoxRLine />
          <Link to='/' onClick={handleLogout}>Đăng xuất</Link>
        </DropDownItem>
      </DropDownMenu>
    </CSSTransition >
  )
}

export default DropDown

const DropDownMenu = styled.div`
  position: absolute;
  top: 130%;
  right: 8px;
  z-index: 999;
  min-width: 190px;
  height: auto;
  display: block;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 -4px 32px rgb(0 0 0 / 20%);
  padding:  8px 18px;

  hr {
    margin: 8px 0;
    border: none;
    border-top: 1px solid rgba(0,0,0,.05);
  }

  &:before {
    position: absolute;
    content: '';
    top: 0;
    right: 20px;
    width: 10px;
    height: 10px;
    background-color: inherit;
    transform: translateY(-50%) rotate(45deg);
  } 
`

const DropDownItem = styled.li`
  text-align: left;
  padding: 10px 0;
  display: flex;
  gap: 10px;
  align-items: center;

  svg {
    font-size: 22px;
  }

  a {
    font-size: 15px;
    color: #666;
    transition: all .4s ease;
  }

  a:hover {
    color: black;
    text-decoration: none;
  }
`