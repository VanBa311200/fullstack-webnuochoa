import React, { useRef, useState } from 'react'
import { styled as styledMUI } from '@mui/styles'
import { Box, Typography, IconButton, Stack } from '@mui/material'
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
  let typingTimer = useRef(null)
  const nodeRef = useRef(null)
  let doneTypingInterval = 500

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
    if (value.length > 2)
      await axios.get(`${apiUrl}/api/product/searchProduct/${value}`)
        .then((res) => {
          setProducts(res.data.products)
        })
        .catch((error) => console.log(error.response.message))
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
        <Typography variant='body1'>Tìm kiếm sản phẩm</Typography>
        <IconButton sx={{
          position: 'absolute',
          top: '0px',
          right: '0px',
        }}
          onClick={handleOnClose}
        >
          <VscClose />
        </IconButton>
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
            <SearchIcon sx={{ fontSize: '20px', color: 'grey.600' }} />
            <Typography sx={{
              fontSize: '14px',
              color: 'grey.600',
              textAlign: 'center'
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
  height: 'calc(100vh - 60px)',
  padding: '8px 15px',
  backgroundColor: `${theme.palette.background.paper}`,
  width: '100vw',
  overflow: 'hidden',
  position: 'relative',
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