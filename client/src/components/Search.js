import React, { useState, useRef, useEffect } from 'react'
import { styled as styledMUI } from '@mui/styles'
import { Stack, Paper, Typography, Divider, Box } from '@mui/material'
import { CSSTransition } from 'react-transition-group'
import axios from 'axios'
import { apiUrl } from '../context/contanst'

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ItemSearch from './ItemSearch';


const Search = () => {
  const [textSearch, setTextSearch] = useState('')
  const [showSearchResultBox, setShowSearchResultBox] = useState(false)
  const [productSearch, setProductSearch] = useState([])
  const refOutSide = useRef(null)
  const nodeRef = useRef(null)

  let typingTimer = useRef(null)
  let doneTypingInterval = 800

  useEffect(() => {
    const checkClickOutside = (e) => {
      if (showSearchResultBox && !refOutSide.current?.contains(e.target)) {
        setShowSearchResultBox(false)
      }
    }
    document.addEventListener('click', checkClickOutside)

    return () => {
      document.removeEventListener('click', checkClickOutside)
    }
  }, [showSearchResultBox])

  const handleOnFocus = () => {
    if (textSearch) {
      setShowSearchResultBox(true)
    }
  }

  const handleOnChange = async (e) => {
    setTextSearch(e.target.value)
    setShowSearchResultBox(true)

    clearTimeout(typingTimer.current)
    if (e.target.value) {
      typingTimer.current = setTimeout(() => sendToServe(e.target.value), doneTypingInterval)
      // console.log(typingTimer)
    }
  }

  const sendToServe = async (value) => {
    if (value.length > 2) {
      await axios.get(`${apiUrl}/api/product/searchProduct/${value}`)
        .then((data) => setProductSearch(data.data.products))
        .catch((error) => console.log('Errors', error))
    }
  }

  return (
    <BoxSearch ref={refOutSide} onFocus={handleOnFocus}>
      <WrapperIcon>
        <SearchIcon sx={{ fontSize: '18px' }} />
      </WrapperIcon>
      <StyledInputBase
        placeholder='Search...'
        value={textSearch}
        onChange={handleOnChange}
      />
      {
        textSearch ?
          <WrapperIcon
            onClick={() => setTextSearch('')}
          >
            <CloseIcon sx={{ fontSize: '18px' }} />
          </WrapperIcon> : false
      }


      <CSSTransition
        in={showSearchResultBox}
        nodeRef={nodeRef}
        classNames='fadeInDown'
        timeout={300}
        unmountOnExit
      >
        <BoxResult ref={nodeRef}>
          <Paper
            elevation={0}
          >
            <Stack flexDirection='column'>
              <HeaderSearch>
                <SearchIcon sx={{ fontSize: '15px' }} />
                <Typography
                  variant='subtitle1'
                  sx={{ fontSize: '13px' }}
                >Kết quả cho '{textSearch}'</Typography>
              </HeaderSearch>
            </Stack>
            <Box>
              {
                !!productSearch.length &&
                <>
                  <Divider />
                  {productSearch.map((p) =>
                    <ItemSearch key={p._id} {...p} onClick={() => setShowSearchResultBox(false)} />
                  )}
                </>
              }
            </Box>
          </Paper>
        </BoxResult>
      </CSSTransition>

    </BoxSearch >
  )
}

export default Search

const BoxResult = styledMUI('div')(({ theme }) => ({
  position: 'absolute',
  width: '260px',
  top: '120%',
  left: '0px',
  zIndex: 2,
  padding: '10px 15px',
  borderRadius: '10px',
  boxShadow: '0 -4px 32px rgb(0 0 0 / 20%)',
  backgroundColor: `${theme.palette.background.paper}`,

  '--animate-duration': '0.2s',

  [theme.breakpoints.down('sm')]: {
    width: 'unset',
    minWidth: '100%',
    left: '0px',
  },
}))

const HeaderSearch = styledMUI(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '6px',
  alignItems: 'center'
}))

const BoxSearch = styledMUI('div')(({ theme }) => ({
  minWidth: '60%',
  border: '1px solid #dce0e3',
  borderRadius: '20px',
  height: '40px',
  display: 'flex',
  transition: '0.4s ease',
  maxWidth: '100%',
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    minWidth: '260px',

  },

  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },

  '&:focus BoxSearch': {
    display: 'block',
  },

  '&:focus-within': {
    border: `1px solid ${theme.palette.primary.main}`,
  }
}))

const WrapperIcon = styledMUI('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  justifyContent: 'center',
  padding: '0 10px',
  cursor: 'pointer',
}))

const StyledInputBase = styledMUI('input')(({ theme }) => ({
  height: '100%',
  outline: 'none',
  color: theme.typography.color,
  padding: 'unset',
  caretColor: `${theme.palette.primary.main}`,
  border: 'none',
  backgroundColor: 'transparent',
  [theme.breakpoints.up('md')]: {
    minWidth: '182px',
  },
  [theme.breakpoints.down('md')]: {
    minWidth: 0,
    flexGrow: 1,
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 0,
  },
}))