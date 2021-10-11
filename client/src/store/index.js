import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productReducer";
import filterProductReducer from "./product/filterProductsReducer";
import cartReducer from "./cart/cartSlice";
import authReducer from "./auth/authSlice";

export default configureStore({
  reducer: {
    productReducer,
    filterProductReducer,
    cartReducer,
    authReducer
  }
})