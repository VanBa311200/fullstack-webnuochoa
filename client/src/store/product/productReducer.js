import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiUrl } from '../../context/contanst'

// redux thunk 
export const getProducts = createAsyncThunk('products/productsPetched',
  async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/product`)
      return res.data.products
    } catch (error) {
      return error.response
    }
  }
)

const initialState = {
  isLoading: true,
  products: []
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // filterNewProducts(state) {
    //   if (state.products)
    //     return Object.keys(state.products).filter(p => p.isNewProduct === true)
    // }
  },
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      // console.log('Fetch product successfully')
      return state = { ...state, isLoading: false, products: action.payload }
    },
    [getProducts.rejected]: (state, action) => {
      console.log('Fetch product failed...!')
    }
  }
})

// export const { } = productSlice.actions

export const productSelector = state => state.productReducer

export default productSlice.reducer