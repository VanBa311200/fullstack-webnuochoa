import React, { useRef, } from 'react'
import styled from 'styled-components'
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
      <Wrap onClick={hadleOnClickMinus}>
        <IconMinus />
      </Wrap>
      <input useref={input} type="text" autoComplete='off' value={value || input.current} onChange={(e) => input.current = e.target.value} />
      <Wrap onClick={hadleOnClickPlus}>
        <IconPlus />
      </Wrap>
    </Container>
  )
}

export default InputQuality


const Container = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0,0,0,.09);

  input {
    width: 50px;
    height: 32px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid rgba(0,0,0,.09);
    border-right: 1px solid rgba(0,0,0,.09);
    border-top: none;
    border-bottom: none;
    outline: none;
  }
`

const Wrap = styled.button`
    width: 32px;
    height: 32px;
    cursor: pointer;
    outline: none;
    border: none;
    background-color: transparent;
`

const IconPlus = styled(AiOutlinePlus)`

`

const IconMinus = styled(AiOutlineMinus)`

`

