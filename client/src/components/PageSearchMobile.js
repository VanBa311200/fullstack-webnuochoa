import React, { useRef, useState } from 'react'
import { styled as styledMUI } from '@mui/styles'
import { Box, Typography, IconButton, Stack } from '@mui/material'
import { ReactComponent as IconLoading20px } from '../assets/icon/Spin-1s-20px.svg'
import { AiFillCloseCircle } from 'react-icons/ai'
import { VscClose } from 'react-icons/vsc'
import SearchIcon from '@mui/icons-material/Search';
import { CSSTransition } from 'react-transition-group';

import axios from 'axios'
import { apiUrl } from '../context/contanst'
import ItemSearch from './ItemSearch'



const PageSearchMobile = ({ show, onClose }) => {
  const [inputText, setInputText] = useState('')
  const [products, setProducts] = useState([])
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)
  let typingTimer = useRef(null)
  const nodeRef = useRef(null)
  let doneTypingInterval = 400

  const handleOnChange = (e) => {
    setInputText(e.target.value)
    clearTimeout(typingTimer.current)
    if (e.target.value) {
      typingTimer.current = setTimeout(() => onSubmit(e.target.value), doneTypingInterval)
    }
  }

  const handleOnCLick = (e) => {
    setInputText('')
    setProducts([])
  }

  const onSubmit = async (value) => {
    if (value.length > 2) {
      setIsLoadingSearch(true)
      await axios.get(`${apiUrl}/api/product/searchProduct/${value}`)
        .then((res) => {
          setProducts(res.data.products)
          setIsLoadingSearch(false)
        })
        .catch((error) => {
          setIsLoadingSearch(false)
          console.log(error.response.message)
        })
    }
  }

  const handleOnClose = () => {
    onClose()
  }

  return (
    <CSSTransition
      in={show}
      nodeRef={nodeRef}
      timeout={300}
      classNames="fadeInDown"
      unmountOnExit
    >

      <Container ref={nodeRef}>
        <IconButton sx={{
          position: 'absolute',
          top: '0px',
          right: '0px',
          padding: '20px'
        }}
          onClick={handleOnClose}
        >
          <VscClose />
        </IconButton>
        <Typography variant='body1' mt='40px'>Tìm kiếm sản phẩm</Typography>
        <WrapInput>
          <input
            autoFocus
            onChange={handleOnChange}
            value={inputText}
            type="text"
            placeholder='Search...'
          />
          {inputText &&
            <WrapIcon>
              <IconButton
                sx={{ fontSize: '20px' }}
                onClick={handleOnCLick}
              >
                <AiFillCloseCircle />
              </IconButton>
            </WrapIcon>
          }
        </WrapInput>
        {inputText &&
          <Stack
            flexDirection='row'
            gap='10px'
            justifyContent='center'
            alignItems='center'
            marginTop='10px'

          >
            {isLoadingSearch ? <IconLoading20px /> : <SearchIcon sx={{ fontSize: '20px', color: 'grey.600' }} />}
            <Typography sx={{
              fontSize: '14px',
              color: 'grey.600',
              textAlign: 'center',
              maxWidth: '200px',
              minWidth: '0px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordBreak: 'break-word',
            }}
            >
              Kết quả tìm kiếm '{inputText}'
            </Typography>
          </Stack>
        }
        <Box paddingY='20px'>
          {!!products.length ? products.map((p, index) =>
            <ItemSearch key={index} {...p} onClick={handleOnClose} />
          ) : ''}

        </Box>
      </Container>
    </CSSTransition>
  )
}

export default PageSearchMobile

const Container = styledMUI('div')(({ theme }) => ({
  // height: 'calc(100vh)',
  // width: '100vw',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  padding: '8px 15px',
  backgroundColor: `${theme.palette.background.paper}`,
  overflow: 'hidden',
  position: 'fixed',
  zIndex: 2,
}))

const WrapInput = styledMUI('div')(({ theme }) => ({
  width: '100%',
  marginTop: '20px',
  position: 'relative',

  '& > input ': {
    outline: 'none',
    border: 'none',
    width: '100%',
    padding: '6px 45px 6px 8px',
    fontSize: '20px',
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
    color: `${theme.palette.grey[700]}`,
  },
}))

const WrapIcon = styledMUI('div')(() => ({
  position: 'absolute',
  top: '50%',
  right: '5px',
  transform: 'translateY(-50%)',
}))