import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'


const Page404 = () => {
  return (
    <Body>
      <Noise />
      <Overlay />
      <Terminal>
        <Typography variant='h3' marginBottom='30px'>Error <Errorcode>404</Errorcode></Typography>
        <OutPut>The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</OutPut>
        <OutPut>Please try <LinkBack to='/'>come back</LinkBack>.</OutPut>
        <OutPut>Good luck.</OutPut>
      </Terminal>
    </Body>
  )
}

export default Page404

const scan = keyframes`
  0%        { background-position: 0 -100vh; }
  35%, 100% { background-position: 0 100vh; }
`

const Body = styled.div`
  box-sizing: border-box;
  height: 100vh;
  background-color: #000000;
  background-image: radial-gradient(#11581E, #041607), url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Inconsolata', Helvetica, sans-serif;
  font-size: 1.5rem;
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1ex rgba(51, 255, 51, 1),
      0 0 2px rgba(255, 255, 255, 0.8);
`

const Noise = styled.div`
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  opacity: .02;
`

const Overlay = styled.div`
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background:
      repeating-linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0) 100%);
  background-size: auto 4px;
  z-index: 1;

  &:before {
    content: "";
  pointer-events: none;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      0deg,
      transparent 0%,
      rgba(32, 128, 32, 0.2) 2%,
      rgba(32, 128, 32, 0.8) 3%,
      rgba(32, 128, 32, 0.2) 3%,
      transparent 100%);
  background-repeat: no-repeat;
  animation: ${scan} 7.5s linear 0s infinite;
  }
`

const Terminal = styled.div`
  box-sizing: inherit;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  min-width: 100%;
  padding: 20rem;
  text-transform: uppercase;

  @media (max-width: 1024px) {
    padding: 6rem;
  }
  @media (max-width: 768px) {
    padding: 6rem;
  }

  @media (max-width: 576px) {
    padding: 2rem;
  }
`

const OutPut = styled.p`
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
  0 0 1px rgba(51, 255, 51, 0.4),
  0 0 2px rgba(255, 255, 255, 0.8);

  &:before {
    content:  '>        ';
    display: inline;
  }

  @media (max-width: 576px) {
    font-size: 15px;
  }
`

const Errorcode = styled.p`
  color: white;
  display: inline;
`

const LinkBack = styled(Link)`
  color: #fff;
  text-decoration: none;

  &::before {
    content: "[";
  }
  &::after {
    content: "]";
  }

  &:hover {
    color: white
  }
`