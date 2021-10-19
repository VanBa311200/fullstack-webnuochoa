import React from 'react'
import { Container, Grid, Box, Typography } from '@mui/material'
import { styled as styledMUI } from '@mui/styles'
import { RiAccountCircleFill } from 'react-icons/ri'
import { IoIosArrowDown } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/auth/authSlice'

import Master1 from '../views/Master1'

import UserNavbar from '../components/UserNavbar'
import DialogUserName from '../components/DialogUserName'


const User = (props) => {
  const { user } = useSelector(selectAuth)
  const [showDialogName, setShowDialogName] = React.useState(false)
  const [isOpenUserNav, setIsOpenUserNav] = React.useState(false);

  const handleOpenUserNav = () => {
    setIsOpenUserNav(!isOpenUserNav)
  }

  const handleOnCloseUserNav = (value) => {
    setIsOpenUserNav(value)
  }

  return (
    <Master1>
      <Container maxWidth='lg' sx={{ marginTop: '20px', minHeight: '60vh' }}>
        <Typography
          component='h1'
          sx={{
            color: 'grey.800',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontWeight: '600'
          }}
          onClick={handleOpenUserNav}
        >
          <Box component='div' display='flex' alignItems='center' marginRight='10px'>
            <RiAccountCircleFill fontSize='27px' />
          </Box>
          Tài khoản của tôi
          <Box component='div' marginLeft='7px' display='flex' alignItems='center' marginRight='10px'>
            <IoIosArrowDown fontSize='20px' />
          </Box>
        </Typography>
        <Grid container spacing={5} marginTop='1px'>
          <Grid item md={6} xs={12}>
            <Wrapper>
              <div>
                <span>Họ tên</span>
                <p>{user.fullname}</p>
              </div>
              <button onClick={() => setShowDialogName(!showDialogName)}>Sửa</button>
            </Wrapper>
          </Grid>
          <Grid item md={6} xs={12}>
            <Wrapper>
              <div>
                <span>Email</span>
                <p>{user.email}</p>
              </div>
              <button>Sửa</button>
            </Wrapper>
          </Grid>
          <Grid item md={6} xs={12}>
            <Wrapper>
              <div>
                <span>Địa chỉ</span>
                <p>{'...' || user.address}</p>
              </div>
              <button>Sửa</button>
            </Wrapper>
          </Grid>
          <Grid item md={6} xs={12}>
            <Wrapper>
              <div>
                <span>Số điện thoại</span>
                <p>{'...' || user.phone}</p>
              </div>
              <button>Sửa</button>
            </Wrapper>
          </Grid>
        </Grid>
        <UserNavbar {...props} show={isOpenUserNav} onClick={handleOnCloseUserNav} />
      </Container>
      <DialogUserName
        show={showDialogName}
        onClose={() => setShowDialogName(false)}
      />
    </Master1>
  )
}

export default User


const Wrapper = styledMUI('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  fontSize: '15px',

  '& div': {
    width: '65%',

    fontWeight: 500,
    overflow: 'hidden',

    '& span': {
      color: theme.palette.grey[600],
    },
    '& p': {
      color: theme.palette.grey[800],
      wordBreak: 'break-word',
    },
  },

  '& button': {
    textDecoration: 'underline',
    color: theme.palette.text.primary,
    ouline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    height: '18px',
    fontSize: '15px',
    cursor: 'pointer',
  },

  [theme.breakpoints.down('md')]: {
    justifyContent: 'space-evenly',
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: '20px',
  },
}))