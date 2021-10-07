/* eslint-disable react/jsx-pascal-case */
import React, { useContext, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'

import { PRODUCTS_LOADING_FAILD } from '../../context/contanst'
import { ProductContext } from '../../context/ProductContext'
import { SectionContent, SectionHeading } from './ElNewProducts'
import ModalProduct from './ModalProduct'
import ItemsProduct from './ItemsProduct'

const NewProducts = () => {
  const [dataModal, setDataModal] = useState({
    isShow: false,
    data: null,
  })

  const { getNewProducts, productState, dispatch } = useContext(ProductContext)
  const { products, isLoadding } = productState

  useEffect(() => {
    getNewProducts()

    return () => {
      dispatch({
        type: PRODUCTS_LOADING_FAILD
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = (data) => {
    setDataModal({
      ...dataModal,
      isShow: true,
      data,
    })
  }

  const handleCloseModal = (data) => {
    setDataModal({
      ...dataModal,
      isShow: false,
      data: null
    })
  }

  return (
    <SectionContent>
      <SectionHeading>
        SẢN PHẨM MỚI
      </SectionHeading>
      <Row>
        {
          isLoadding ? <p>Is Loading</p> :
            products.map(p =>
              <ItemsProduct
                key={p._id}
                p={p}
                onClick={handleClick}
              />
            )
        }
      </Row>
      <ModalProduct {...dataModal} onCloseModal={handleCloseModal} />
    </SectionContent>
  )
}

export default NewProducts
