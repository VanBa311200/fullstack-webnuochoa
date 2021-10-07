import React from 'react'
import { ProductItem, ProductImage, LinkProduct, PImg, OptionDetail, ViewOption, ProductInfo, ProductBrand, ProductName, ProductInfoGroup, ProductInfoPrice, ProductInfoPriceSale, TagSalePercent } from './ElNewProducts'
import { AiFillHeart } from 'react-icons/ai'
import { BsEye } from 'react-icons/bs'
import styles from '../../assets/styles/Css/Styles.module.css'
import { toVND } from '../../helper'
import RatingStart from '../RatingStart'
import { apiUrl } from '../../context/contanst'

const ItemsProduct = ({ p, onClick }) => {
  return (
    <ProductItem
      lg={3} md={4} xs={6}
    >
      <ProductImage>
        <LinkProduct to={`product/${p._id}`}>
          <PImg src={`${apiUrl}/static/${p.images[0].fileName}`} />
        </LinkProduct>
        <OptionDetail>
          <ViewOption>
            <AiFillHeart className={styles.flexCenter} style={{ fontSize: '20px' }} />
          </ViewOption>
          <ViewOption onClick={(e) => onClick(p, e)} >
            <BsEye
              className={styles.flexCenter}
              style={{ fontSize: '20px' }}
            />
          </ViewOption>
        </OptionDetail>
      </ProductImage>
      <ProductInfo>
        <ProductBrand>{p.id_brand.name}</ProductBrand>
        <ProductName to={`product/${p._id}`}>{p.name}</ProductName>
        <ProductInfoGroup>
          <ProductInfoPriceSale>{toVND(p.price)}
          </ProductInfoPriceSale>
          <ProductInfoPrice>{toVND(p.price_sale)}
            <TagSalePercent>{`-${p.percent_sale}%`}</TagSalePercent>
          </ProductInfoPrice>
          <RatingStart number={p.rating_number} />
        </ProductInfoGroup>
      </ProductInfo>
    </ProductItem>
  )
}

export default ItemsProduct
