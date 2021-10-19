import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { styled as styledMUI } from '@mui/system';

import { AiOutlineClose } from 'react-icons/ai'

const fadeOut = keyframes`
from {
 opacity: 0;
}to {
  opacity: 0.5;
}
`

const fadeInLeft_sm = keyframes`
  from {
    transform: translateX(-15px);
    opacity: 0;
  }to { 
    transform: translateX(0);
    opacity: 1;
  }
`

const fadeInRight_sm = keyframes`
  from {
    transform: translateX(15px);
    opacity: 0;
  }to {
    transform: translateX(0);
    opacity: 1;
  }
`

const fadeInBottom = keyframes`
  from{
    transform: translateY(100%);
    opacity: 0;
  }to {
    transform: translateY(0);
    opacity: 1;
  }
`

export const ButtonPrimary = styled.button`
  padding: 8px 15px;
  width: 100%;
  font-size:${({ fontSize }) => fontSize ? fontSize : '15px'};
  color: ${({ color }) => color ? color : 'white'} ;
  background-color: var(--color-primary);
  font-size: 20px;
  border: 1px solid var(--color-primary);
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`


export const HeadItem = styled.li`
  padding: 0 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* &:first-child {
    border-right: 1px solid #fff;
  } */
  `

export const HeadRight = styled.div`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  position: relative;
  `

export const HeadLeft = styled.div`
  list-style: none;
  display: flex;
  `

export const ImageProfile = styled.img`
  --wh: 25px;
  width: var(--wh);
  height: var(--wh);
  border-radius: 50%;
  cursor: pointer;
  margin-right: 10px;
`


export const LinkContact = styled.a`
  color: #fff;
  transition: all .4s ease-in-out;
  text-decoration: none !important;
  display: flex;
  font-size: 15px;
  align-items: center;
  cursor: pointer;
  user-select: none;
  

  &:hover {
    color: var(--color-primary);
  }

  p {
    max-width: 150px;
    
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const Navbar = styled.nav`
  display: flex;
  min-height: 60px;
`

export const NavbarBrand = styledMUI(Link)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },

  fontSize: ' 2.5rem',
  fontFamily: '"Courgette", sans-serif',
  background: `${theme.palette.primary.main}`,
  color: '#fff',
  padding: '1.3% 15px',
  marginRight: '15px',
  cursor: 'pointer',
  lineHeight: '100%',

  '&:hover': {
    color: 'unset !important',
    textDecoration: 'none !important',
  }
}))


export const NavbarCollapse = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;

  @media only screen and (max-width: 992px) {
    display: none;
  }
`

export const NavbarNav = styled.div`
  display: flex;
`

export const NavItem = styled.li`
  list-style: none;
  transition: all .3s ease;
  color: var(--text-disable);

  &.active a{
    color: var(--text-active) !important
  }
`

export const NavLink = styled.a`
  display: inline-block;
  font-weight: bold;
  color: var(--text-disable);
  text-decoration: none !important;
  padding: 8px;
  transition: all .3s ease;
  font-size: 15px;

  &:hover {
    color: var(--text-active);
  }
`


export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background-color: #363636;
  opacity: 0;
  overflow: hidden;
  animation: ${fadeOut} .5s ease forwards;
  transition: all .3s ease; 
`

// ButtonMobile

export const ButtonM = styled.div`
  position: relative;
  z-index: 999;
  width: 35px;
  height: 35px;
  background-color: #fff;
  display: none;
  transition: 0.3s ease;
  border: none;
  outline: none; 

  @media only screen and (max-width: 992px) {
    display: block;
  }
`

export const MenuIcon = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background: transparent;
  top: 2px;
  right: 2px;
  z-index: 1;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
`

export const MenuLine = styled.div`
  width: 100%;
  height: 3px;
  background: #000;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    position: absolute;
    bottom: 10px;
    right: 0;
    background: #000;
  }

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    position: absolute;
    top: 10px;
    right: 0;
    background: #000;
  }
`

export const InputButtonMobile = styled.input`
  width: 30px;
  height: 30px;
  opacity: 0;
  z-index: 2;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  top: 2px;
  right: 2px;
  outline: none;
  border: none;

  &:checked ~ ${MenuIcon} ${MenuLine}:after{
      transform: rotate(90deg);
      top: 0;
  }
  &:checked ~ ${MenuIcon} ${MenuLine}:before{
      transform: rotate(90deg);
      top: 0;
  }

  &:checked ~ ${MenuIcon} {
    transform: rotate(135deg);
  }
`

// SidebarMobile
export const SideBarM = styled.div`
  background-color: rgb(8, 18, 41);
  height: 100vh;
  width: 295px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  overflow: hidden;
  flex-direction: column;
`



export const BodySideBarMobile = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const SideBarNav = styled.div`
  flex: 1 1 auto;
  padding: 0 25px;
  margin-top: 10%;
`

export const ListItem = styled.div`
 display: flex;
 flex-direction: column;
`

export const ItemNav = styled.li`
  border-bottom: ${({ underLine }) => !underLine ? 'thin solid var(--text-secondary)' : 'unset'};
  padding-top: 20px;
  padding-bottom: 20px;
  color: var(--text-white);
  cursor: pointer;
  display: block;
  opacity: 0;
  transform: translateX(-15px);
  animation: ${fadeInLeft_sm} .6s ease-out ${({ delay }) => delay ? delay : ''} forwards; 
  list-style: none;
`


export const LinkCustom = styled(Link)`
  color: var(--text-white);
  text-decoration: none;
  font-size: 16px;

  &:active {
    color: var(--color-primary)
  }

  @media (min-width: 320px) and (max-width: 578px) {
    font-size: 14px;
  }
`


export const ItemUser = styledMUI(LinkCustom)(({ theme }) => ({
  color: `${theme.palette.grey[600]}`,
  marginTop: '15px',
  fontWeight: 600,
}))

export const FooterSBMobile = styled.div`
  height: 48px;
  border-top: 1px solid var(--text-smoke);
  display: flex;
  opacity: 0;

  animation: ${fadeInBottom} .6s ease-out .25s forwards; 
`
export const FooterPhone = styled.div`
  padding: 10px;
  font-size: 15px;
  border-right: 1px solid var(--text-smoke);
  color: var(--text-white);
  display: flex;
  align-items: center;
`
export const FooterSocial = styled(FooterPhone)`
  flex: 1 1 auto;
  border: none;
  font-size: 18px;
  justify-content: space-between;
`

export const ListSocial = styled.div`
  list-style: none;
  padding: 0 7px;
  display: flex;
  align-items: center;
`

/* Sidebar cart shopping */

export const ContainerSlider = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0px -2px 22px -10px rgba(0, 0 ,0 ,.4);

  @media only screen and (max-width: 572px) {
    width: calc(100vw - 65px);
  }
`

export const HeadCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  padding-left: 30px;
  padding-right: 30px;
  position: relative;
  border-bottom: 1px solid var(--text-smoke);
`

export const HeroCart = styled.h4`
font-size: 15px !important;
margin: unset;
`

export const CloseCart = styled.button`
  width: 30px;
  height: 50px;
  border: none;
  outline: none;
  font-size: 17px;
  background-color: transparent;
`

export const IconClose = styled(AiOutlineClose)`
  font-size: 17px;
  display: flex;
  align-items: center;
`

export const ContainerCart = styled.div`
 display: flex;
 flex-direction: column;
 height: calc(100vh - 65px);
`

export const EmptyCart = styled.p`
  font-size: 16px;
  color: black;
  text-align: center;
  margin: auto auto;
  opacity: 0;

  animation:  ${fadeInBottom} .6s ease-out .25s forwards;

  @media (min-width: 320px) and (max-width: 578px) {
    font-size: 14px;
  }
`

export const BodyCart = styled.div`
  overflow-x: hidden;
  flex: 1 1 auto;
`

export const CartList = styled.div`
  padding: 0 15px;
`

export const CartItem = styled.div`
  padding: 15px 0;
  display: flex;
  opacity: 0;
  transform: translateX(15px);
  align-items: center;

  animation: ${fadeInRight_sm} .45s ease-out ${({ delay }) => delay ? delay : '.35'} forwards;
`

export const CartImage = styled.img`
  max-width: 100px;
  outline: none;
  border: none;

  @media (min-width: 0px) and (max-width: 320px) {
    max-width: 70px;
  }
`

export const CartInfo = styled.div`
  margin-left: 25px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 0px) and (max-width: 768px) {
    margin-left: 10px;
  }
`

export const CartInfoName = styled(Link)`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
  color: #000;
  margin-bottom: 6px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;

  &:hover {
    color: unset !important;
    text-decoration: none !important;
  }
`

export const CartInfoOption = styled.div`
  text-align: left;
`

export const CartInfoSize = styled.p`
  font-size: 15px;
  margin: unset;
  letter-spacing: 1.5px;
  font-weight: 500;
`

export const CartInfoPrice = styled.p`
  margin-bottom: unset;
  font-size: 15px;
  letter-spacing: 1px;
  color: var(--color-primary);
`

export const CartAction = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`




export const ButtonDeleteCart = styled.button`
  border: none;
  background-color: transparent;
  font-size: 15px;
  color: var(--color-primary);
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--color-primary);
  }
`

/* Cart Footer */
export const CartFooter = styled.div`
  border-top: 1px solid #cfcfcf;
  padding: 25px;
  opacity: 0;
  transform: translateY(-100%);
  background: #fff;

  animation: ${fadeInBottom} .6s ease-out .25s forwards;

  @media only screen and (max-width: 572px) {
    padding: 15px;
    font-size: 15px;
  }
`

export const CartFooterWapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const CartTaxes = styled.p`
  text-align: center;
  font-size: 16px;

  @media only screen and (max-width: 572px) {
    font-size: 15px;
  }
`

export const PointCenter = styled.span`
  display: inline-block;
  margin: 0 18px;
  content: "";
  height: 3px;
  width: 3px;
  border-radius: 100%;
  background: #fff;
`
export const TotalPrice = styled.span`
  font-size: 16px;

  @media only screen and (max-width: 572px) {
    font-size: 15px;
  }
`

