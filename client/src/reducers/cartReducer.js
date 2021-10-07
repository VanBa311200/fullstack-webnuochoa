import { ADD_ITEM_CART, ITEMSCART, REMOVE_ITEM_CART, UPDATE_ITEM_CART, GET_ITEM_CART } from '../context/contanst'
import { getLocalLocalStorage, setLocalLocalStorage } from '../helper';

export const cartReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_ITEM_CART:
      const i = state.product.findIndex(i => i._id === payload._id && i.value === payload.value)
      if (i !== -1) {
        state.product.forEach((element, index) => {
          if (index === i) {
            element.quality += payload.quality;
            return false
          }
        });
        setLocalLocalStorage(ITEMSCART, state)
        return {
          ...state,
        }
      } else {
        state.product = [...state.product, payload]
        setLocalLocalStorage(ITEMSCART, state)
        return {
          ...state
        }
      }

    case REMOVE_ITEM_CART:
      const newP = state.product.filter(i => i._id !== payload.id || i.value !== payload.value)
      state.product = newP
      setLocalLocalStorage(ITEMSCART, state)
      return {
        ...state,
      }

    case UPDATE_ITEM_CART:
      const o = state.product.findIndex(i => i._id === payload._id && i.value === payload.value)
      o !== -1 ? state.product[o].quality = payload.quality : console.log('')
      setLocalLocalStorage(ITEMSCART, state)
      return {
        ...state,
      }

    case GET_ITEM_CART:
      const product = JSON.parse(getLocalLocalStorage(ITEMSCART))
      state = product
      return {
        ...state,
      }
    default:
      break;
  }
}