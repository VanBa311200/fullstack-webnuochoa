import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorage, getLocalStorage } from "../../helper";
import { LOCAL_STORAGE_ITEMSCART } from '../../context/contanst'

const initialState = {
  products: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemCart(state, action) {
      const i = state.products.findIndex(p =>
        p._id === action.payload._id && p.value === action.payload.value
      )
      if (i === -1) {
        state.products.push(action.payload)
      } else {
        state.products[i].quality += action.payload.quality
      }
      setLocalStorage(LOCAL_STORAGE_ITEMSCART, state.products)
    },
    removeItemCart(state, action) {
      const i = state.products.findIndex(p =>
        p._id === action.payload._id && p.value === action.payload.value
      )
      state.products.splice(i, 1)
      setLocalStorage(LOCAL_STORAGE_ITEMSCART, state.products)
    },
    updateItemCart(state, action) {
      const i = state.products.findIndex(p =>
        p._id === action.payload._id && p.value === action.payload.value
      )
      state.products[i].quality = action.payload.quality
      setLocalStorage(LOCAL_STORAGE_ITEMSCART, state.products)
    },
    getItemCart(state, action) {
      const items = getLocalStorage(LOCAL_STORAGE_ITEMSCART)
      if (items)
        state.products = items
    }
  }
})

export const { addItemCart, removeItemCart, updateItemCart, getItemCart } = cartSlice.actions

export const selectCart = state => state.cartReducer.products

export default cartSlice.reducer