import React, { createContext, useReducer } from 'react'

import axios from 'axios'
import { apiUrl, PRODUCTS_LOADING_SUCCESS, PRODUCTS_LOADING_FAILD } from './contanst'
import { productReducer } from '../reducers/productReducer'

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {

  const [productState, dispatch] = useReducer(productReducer, {
    isLoadding: true,
    products: [],
  })

  const getNewProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/product/newProduct`)

      if (res.data.success) {
        // console.log(res.data)
        dispatch({
          type: PRODUCTS_LOADING_SUCCESS,
          payload: res.data.products
        })
      }
    } catch (error) {
      dispatch({
        type: PRODUCTS_LOADING_FAILD
      })
      console.error('PRODUCTS_LOADING_FAILD')
    }
  }

  const productContextdata = {
    productState,
    getNewProducts,
    dispatch
  }

  return (


    <ProductContext.Provider value={productContextdata}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider
