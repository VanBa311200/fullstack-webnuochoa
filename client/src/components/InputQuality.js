import React, { useRef, } from 'react'
import styled from 'styled-components'
import { styled as styledMUI } from '@mui/material/styles';
import { Stack, Button } from '@mui/material'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

const InputQuality = ({ onClick, value }) => {
  const input = useRef(value || 1);

  const hadleOnClickMinus = () => {
    if (input.current <= 1)
      input.current = 1
    else
      input.current -= 1

    onClick(input.current)
  }
  const hadleOnClickPlus = () => {
    input.current += 1
    onClick(input.current)
  }

  return (
    <Container>
      <Wrap onClick={hadleOnClickMinus} sx={{ minWidth: '32px' }}>
        <IconMinus />
      </Wrap>
      <input useref={input} type="text" autoComplete='off' value={value || input.current} onChange={(e) => input.current = e.target.value} />
      <Wrap onClick={hadleOnClickPlus} sx={{ minWidth: '32px' }}>
        <IconPlus />
      </Wrap>
    </Container>
  )
}

export default InputQuality


const Container = styledMUI(Stack)({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid rgba(0,0,0,.09)`,
  flexDirection: 'row',

  '& input': {
    width: '50px',
    height: '32px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeft: '1px solid rgba(0,0,0,.09)',
    borderRight: '1px solid rgba(0,0,0,.09)',
    borderTop: 'none',
    borderBottom: 'none',
    outline: 'none',
  }

})


const Wrap = styledMUI(Button)(({ theme }) => ({
  width: '32px',
  height: '32px',
  cursor: 'pointer',
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  minWidth: "32px",
  color: '1px solid rgba(0,0,0,.09)',
}))


const IconPlus = styled(AiOutlinePlus)`

`

const IconMinus = styled(AiOutlineMinus)`

`

