import styled from 'styled-components'
import { Link } from 'react-router-dom'


export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
`

export const Form = styled.form`
  margin: auto;
  max-width: 400px;
  min-width: 300px;
`

export const TitleForm = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h3 {
    font-size: 20px;
  }

  p {
    font-size: 15px;
    margin-bottom: unset;
  }
`

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  position: relative;

  input {
    height: 43px;
    width: 100%;
    padding-left: 20px;
    font-size: 15px;
    border: 0.5px solid rgb(221, 219, 219);
    padding-right: 40px;
    border-radius: 5px;
    outline: none;
  }

  input.error {
    border: 1px solid var(--color-error);
  }
`

export const WrappInput = styled.div`
  position: relative;

  input:not(:placeholder-shown) + label,
  input:focus + label{
    top: 0;
    left: 10px;
    padding: 0 7px;
    background-color: white;
    font-size: 13px;
  }
  
  label.error {
    color: var(--color-error);
  }

  label {
    position: absolute;
    top: 50%;
    left: 20px;
    font-size: 15px;
    color: var(--text-disable);
    transform: translateY(-50%);
    pointer-events: none;
    user-select: none;
    transition: all .2s ease;
  }
`

export const ErrorMessage = styled.p`
  color: var(--color-error);
  font-size: 13px;
  padding-left: 10px;
  margin-bottom: unset;
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`

export const IconEye = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
`

export const ButtonAction = styled.button`
  color: white;
  background-color: var(--color-primary);
  font-size: 16px;
  outline: none;
  text-transform: uppercase;
  border-radius: 5px;
  width: 100%;
  border: none;
  height: 43px;
`

export const LinkOption = styled(Link)`
  text-decoration: none;
  color: var(--color-primary);

  &:hover {
    text-decoration: none;
    color: var(--color-primary);
    opacity: 0.7;
  }
`

export const OptionForgot = styled.div`
  text-align: right;
  font-size: 14px;
  margin-bottom: 8px;
  letter-spacing: .2px;
`

export const OptionSign = styled(OptionForgot)`
  text-align: center;
  margin-top: 20px;

  p {
    margin-bottom: unset;
  }
`