import React from 'react'
import styled, { keyframes } from 'styled-components'

const PageLoadingProsecc = () => {
  return (
    <Wrap>
      <Container>
        <Text> <span>Loading...</span></Text>
      </Container>
    </Wrap>
  )
}

export default PageLoadingProsecc


const animation = keyframes`
  0% {
    left: 0;
  }
  50% {
    left: calc(100% - var(--w));
  }
  100% {
    left: 0;
  }
`

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  margin: auto;
`

const Text = styled.div`
  --w: 50px;
  
  position: relative;
  background-color: white;
  color: #000;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: .4rem;
  padding: 0 10px;

  span {
    color: white;
    mix-blend-mode: difference;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: var(--w);
    height: 100%;
    background-color: #000;
    animation: ${animation} 2s linear infinite;
  }
`

