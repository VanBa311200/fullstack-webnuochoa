import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { styled as styledMUI } from '@mui/styles'
import { Container, Box, Grid, Paper } from '@mui/material'
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaTelegramPlane } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
      <FooterTop>
        <Container>
          <Grid container spacing={2.5}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Box sx={{ display: 'flex' }}>
                <Brand to="/">ShopPi</Brand>
              </Box>
              <Text style={{ paddingTop: '15px' }}>We inspire and reach millions of travelers
                across 90 local websites</Text>
              <ListGroup>
                <li><Link to="/"><FaFacebookF /></Link></li>
                <li><Link to="/"><FaTwitter /></Link></li>
                <li><Link to="/"><FaInstagram /></Link></li>
                <li><Link to="/"><FaYoutube /></Link></li>
              </ListGroup>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Title>Contact Us</Title>
              <Text>(+84) 968246516</Text>
              <Text>Đ.Nguyễn Ảnh Thủ, P.Hiệp Thành, Q.12, TP.HCM</Text>
              <Text>vanba311200@gmail.com</Text>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Title>NEW LATEST</Title>
              <Text>Get the latest updates and offers.</Text>
              <GroupForm>
                <input type="email" placeholder='Email' />
                <button><FaTelegramPlane /></button>
              </GroupForm>
            </Grid>
          </Grid>
        </Container>
      </FooterTop>

      <FooterBottom>
        <Wrap>
          <Left>
            <li><Link to="/">Contact</Link></li>
            <li><Link to="/">Term of use</Link></li>
            <li><Link to="/">Privacy</Link></li>
            <li><Link to="/">Environmental Policy</Link></li>
          </Left>
          <Right>
            <p>
              Copyright ©{(new Date().getFullYear())} All rights reserved <br />
              Design by <a href="https://www.facebook.com/nguyen.van.ba00">Nguyễn Văn Ba</a>
            </p>
          </Right>
        </Wrap>
      </FooterBottom>
    </footer>
  )
}

export default Footer


const FooterTop = styledMUI(Paper)(({ theme }) => ({
  padding: '65px 0 30px 0',
  backgroundColor: '#222736',
}))

const FooterBottom = styledMUI(Paper)(() => ({
  padding: '10px',
  backgroundColor: '#1e2331',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
}))


const Brand = styled(Link)`
  padding: 7px 35px;
  border: 3px solid var(--color-primary);
  color: #fff;
  margin-bottom: 10px;
  font-size: 28px;
  background-color: var(--color-primary);
  font-family: "Courgette", sans-serif;

  &:hover {
    color: white;
    text-decoration: none;
  }
`

const Text = styled.p`
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 10px;
`

const Title = styled.h4`
  text-transform: uppercase;
  font-size: 18px;
  color: var(--color-primary);
  margin-bottom: 1rem;
`

const ListGroup = styled.ul`
  list-style: none;
  display: flex;
  padding: unset;

  li {
    list-style: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    transition: all .4s ease;

    &:hover {
      background-color: var(--color-primary);
    }
  }

  li a {
    color: white;
  }
`

const GroupForm = styled.div`
  position: relative;

  @media (min-width: 320px) and (max-width: 768px) {
    max-width: 270px;
  }

  input {
    height: 50px;
    padding-left: 20px;
    padding-right: 60px;
    outline: none;
    border-radius: 2px;
    width: 100%;
    color: var(--color-primary);
    border: none;
    background-color: #393D4A;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background-color: var(--color-primary);
    height: 50px;
    width: 56px;
    outline: none;
    cursor: pointer;
  }

  button svg {
    color: white;
    font-size: 20px;
  }
`

const Wrap = styledMUI(Container)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',


  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  }

}))


const Left = styled.ul`
  display: flex;
  gap: 35px;
  padding: unset;

  li {
    list-style:none;
  } 

  li a {
    color: var(--text-secondary);
  }

  @media only screen and (min-width: 320px) and (max-width: 768px) {
    gap: 12px;

    li a {
      font-size: 13px;
    }
  }
`

const Right = styled.div`
  p {
    text-align: right;
    color: var(--text-secondary);
    margin: unset;
  }

  @media only screen and (min-width: 320px) and (max-width: 768px) {

    p {
      font-size: 13px;
      text-align: center;
    }
  }
`
