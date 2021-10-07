import React, { createContext, useReducer, useEffect } from 'react'

import { cartReducer } from '../reducers/cartReducer'
import {
  ADD_ITEM_CART, REMOVE_ITEM_CART, UPDATE_ITEM_CART, GET_ITEM_CART, ITEMSCART
} from './contanst'

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
  const [item, dispatch] = useReducer(cartReducer, {
    product: []
  })

  useEffect(() => {
    if (localStorage.getItem(ITEMSCART)) {
      dispatch({
        type: GET_ITEM_CART
      })
    }
  }, [])

  const addItemCart = (item) => {
    dispatch({
      type: ADD_ITEM_CART,
      payload: item,
    })
  }

  const removeItemCart = (id, value) => {
    dispatch({
      type: REMOVE_ITEM_CART,
      payload: { id, value }
    })
  }

  const updateItemCart = (data) => {
    dispatch({
      type: UPDATE_ITEM_CART,
      payload: data
    })
  }

  const cartContextData = {
    addItemCart,
    removeItemCart,
    updateItemCart,
    item
  }

  return (
    <CartContext.Provider value={cartContextData}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
