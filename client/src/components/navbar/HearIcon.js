import React from 'react'
import '../../assets/styles/font/flaticon/flaticon.css'
import style from '../../assets/styles/Css/Styles.module.css'

const HearIcon = ({ color }) => {
  return (
    <div className={style.p}>
      <i className={`flaticon-heart ${style.sizeicon}`} style={{ color: color || 'black' }}></i>
      <span className={style.c}>0</span>
    </div>
  )
}

export default HearIcon