import React from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import '../../assets/styles/Csstransition/styles.css'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../store/auth/authSlice'

const DropDown = ({ isShowDropDown }) => {
  const noderef = React.useRef(null)
  const disptach = useDispatch()
  const handleLogout = () => {
    disptach(userLogout())
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
          <Link to='/account'>Tài khoản của tôi</Link>
        </DropDownItem>
        <DropDownItem >
          <Link to='/bill'>Đơn mua</Link>
        </DropDownItem>
        <hr />
        <DropDownItem >
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
  min-width: 150px;
  height: auto;
  display: block;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 -4px 32px rgb(0 0 0 / 20%);
  padding:  8px 24px;

  hr {
    margin: 8px 0;
    border: none;
    border-top: 1px solid rgba(0,0,0,.05);
  }
`

const DropDownItem = styled.li`
  text-align: left;
  padding: 10px 0;

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