import styled from 'styled-components'
import { Col } from 'react-bootstrap'

export const WapperContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const ColContent = styled(Col)`
  order: ${({ imgfirst }) => imgfirst === 'true' ? 1 : 2};
  padding: unset;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 35px;
    font-size: 15px;
  }

  @media (max-width: 975px) {
    order: unset;
  }

  @media  (min-width: 320px) and (max-width: 576px) {
    div {
    padding: 20px;
    font-size: 13px;
  }
  }
`

export const ButtonOutLine = styled.a`
  padding: 8px 15px;
  max-width: 180px;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  font-size: 16px;
  outline: none;
  cursor: pointer;
  background-color: transparent;

  &:hover {
    text-decoration: none;
    color: var(--text-white);
    background-color: var(--color-primary);
  }

  @media  (min-width: 320px) and (max-width: 576px) {
    font-size: 13px;
    max-width: 150px;
  }
`