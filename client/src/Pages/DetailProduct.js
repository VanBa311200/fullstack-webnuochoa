import React, { useEffect, useState } from 'react'

import { Breadcrumb, Container } from 'react-bootstrap'
import axios from 'axios'
import { apiUrl } from '../context/contanst'

const DetailProduct = (props) => {
  const productId = props.match.params.productId;
  const [producState, setProductState] = useState({
    isLoadding: true,
    product: {},
  });

  const { isLoadding, product } = producState;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/product/${productId}`)

        if (res.data.success)
          setProductState({
            isLoadding: false,
            product: res.data.product
          })
      } catch (error) {
        console.error('GET_PRODUCT_FAILD')
      }
    }
    getProduct();

    return () => {
      setProductState({
        isLoadding: true,
        product: {}
      })
    }
  }, [productId])

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>
          Product
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>
      {
        isLoadding ? 'Loading' :
          product.name
      }
    </Container>
  )
}

export default DetailProduct
