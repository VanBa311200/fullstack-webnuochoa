export const apiUrl = process.env.NODE_ENV !== 'production' ?
  'http://localhost:5000'
  :
  ''

export const LOCAL_STORAGE_TOKEN_AUTH = 'LOCAL_STORAGE_TOKEN_AUTH'
export const SET_AUTH = 'SET_AUTH'

export const ITEMSCART = 'ITEMSCART'
export const PRODUCTS_LOADING_SUCCESS = 'PRODUCTS_LOADING_SUCCESS'
export const PRODUCTS_LOADING_FAILD = 'PRODUCTS_LOADING_FAILD'
export const ADD_ITEM_CART = 'ADD_ITEM_CART'
export const REMOVE_ITEM_CART = 'REMOVE_ITEM_CART'
export const UPDATE_ITEM_CART = 'UPDATE_ITEM_CART'
export const GET_ITEM_CART = 'GET_ITEM_CART'