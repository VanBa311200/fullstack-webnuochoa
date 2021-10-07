import { PRODUCTS_LOADING_SUCCESS, PRODUCTS_LOADING_FAILD } from '../context/contanst'

export const productReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case PRODUCTS_LOADING_SUCCESS:
      return {
        ...state,
        isLoadding: false,
        products: payload
      }
    case PRODUCTS_LOADING_FAILD:
      return {
        ...state,
        isLoadding: false,
        products: []
      }

    default: return state;
  }
}