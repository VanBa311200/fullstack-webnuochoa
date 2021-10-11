import { createSlice } from "@reduxjs/toolkit";

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_NEW: 'SHOW_NEW'
}

const filerProductSlice = createSlice({
  name: 'visibilityFilter',
  initialState: VisibilityFilters.SHOW_ALL,
  reducers: {
    setVisibilityFilter(state, action) {
      return state = action.payload
    }
  }
})

export const { setVisibilityFilter } = filerProductSlice.actions

export const selectFilter = state => state.filterProductReducer

export default filerProductSlice.reducer