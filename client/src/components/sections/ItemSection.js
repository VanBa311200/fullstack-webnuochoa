import React from 'react'

import { WapperContent, ColContent, ButtonOutLine } from './ElSectionPR'

const ItemSection = ({ data }) => {
  return (
    <WapperContent>
      <ColContent md={12} lg={6}>
        <img src={data.img} alt="photos" />
      </ColContent>
      <ColContent md={12} lg={6} {...data}>
        <div>
          <h3>{data.brand}</h3>
          <p>
            <strong>{data.title}</strong>
            <em>{data.sub_title}</em>
          </p>
          <p>
            {data.paragrap}
          </p>
          <ButtonOutLine style={{ textTransform: 'uppercase', marginTop: '20px' }}>KHÁM Phá thêm →</ButtonOutLine>
        </div>
      </ColContent>
    </WapperContent>
  )
}

export default ItemSection
