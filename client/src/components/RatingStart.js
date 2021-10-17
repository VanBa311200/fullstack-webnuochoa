import React from 'react'
import styled from 'styled-components'

const RatingStart = ({ number }) => {
  return (
    <Rating>
      <StarOuter>
        <StarInner percent={`${number / 5 * 100}%`} />
      </StarOuter>
      <RatingNumber>{parseFloat(number).toFixed(1)}</RatingNumber>
    </Rating>
  )
}

export default RatingStart

const Rating = styled.div`
`

const StarOuter = styled.div`
  position: relative;
  display: inline-block;
  user-select: none;


  &::before {
    content: "\f005 \f005 \f005 \f005 \f005";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    color: var(--text-smoke);
    font-size: 13px;
  }
`

const StarInner = styled.div`
  position: absolute;
  width: ${({ percent }) => percent ? percent : '0'};
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  user-select: none;


  &::before {
    content: "\f005 \f005 \f005 \f005 \f005";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    color: var(--text-yellow);
    font-size: 13px;
  }
`

export const RatingNumber = styled.span`
  color: var(--color-primary);
  user-select: none;
  margin-left: 8px;
  position: relative;
  font-size: 14px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0;
    background-color: var(--color-primary);
    height: 1px;
    width: 100%;
    display: block;
  }
`


