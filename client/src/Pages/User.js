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
import DialogChangePass from '../components/DialogChangePass'
import DialogChangePhone from '../components/DialogChangePhone'
import DialogChangeAddress from '../components/DialogChangeAddress'


const User = (props) => {
  const { user } = useSelector(selectAuth)
  const [showDialogName, setShowDialogName] = React.useState(false)
  const [isOpenUserNav, setIsOpenUserNav] = React.useState(false);
  const [showDialogChangePass, setShowDialogChangePass] = React.useState(false);
  const [showDialogChangePhone, setShowDialogChangePhone] = React.useState(false);
  const [showDialogChangeAddress, setShowDialogChangeAddress] = React.useState(false);

  const handleOpenUserNav = () => {
    setIsOpenUserNav(!isOpenUserNav)
  }

  const handleOnCloseUserNav = (value) => {
    setIsOpenUserNav(value)
  }

  return (
    <Master1>
      <Container maxWidth='lg' sx={{ marginTop: '20px', marginBottom: '20px', minHeight: '60vh' }}>
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
            </Wrapper>
          </Grid>
          <Grid item md={6} xs={12}>
            <Wrapper>
              <div>
                <span>Địa chỉ</span>
                {user.address ?
                  <>
                    <p>{user.address.addressDetail}</p>
                    <p>{user.address.ward}</p>
                    <p>{user.address.district}</p>
                    <p>{user.address.city}</p>
                  </>
                  :
                  <p>...</p>
                }
              </div>
              <button onClick={() => setShowDialogChangeAddress(true)} >Sửa</button>
            </Wrapper>
          </Grid>
          <Grid item md={6} xs={12}>
            <Wrapper>
              <div>
                <span>Số điện thoại</span>
                <p>{user.phone || '...'}</p>
              </div>
              <button onClick={() => setShowDialogChangePhone(true)}>Sửa</button>
            </Wrapper>
          </Grid>
          <Grid item md={6} xs={12}>
            <Wrapper>
              <div>
                <span>Đổi mật khẩu</span>
                <p>{'*********'}</p>
              </div>
              <button onClick={() => setShowDialogChangePass(true)}>Đổi mật khẩu</button>
            </Wrapper>
          </Grid>
        </Grid>
        <UserNavbar {...props} show={isOpenUserNav} onClick={handleOnCloseUserNav} />
      </Container>
      <DialogUserName
        show={showDialogName}
        onClose={() => setShowDialogName(false)}
      />
      <DialogChangePass show={showDialogChangePass} onClose={() => setShowDialogChangePass(false)} />
      <DialogChangePhone show={showDialogChangePhone} onClose={() => setShowDialogChangePhone(false)} />
      <DialogChangeAddress show={showDialogChangeAddress} onClose={() => setShowDialogChangeAddress(false)} />
    </Master1>
  )
}

export default User


const Wrapper = styledMUI('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  fontSize: '15px',

  '& div': {
    flex: 1,
    fontWeight: 500,
    overflow: 'hidden',
    padding: '0 15px',

    '& span': {
      color: theme.palette.grey[600],
    },
    '& p': {
      color: theme.palette.grey[800],
      wordBreak: 'break-word',
      marginBottom: 'unset',
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
    padding: '0 15px',
  },

  [theme.breakpoints.up('md')]: {
    paddingLeft: '40px',
  },
}))