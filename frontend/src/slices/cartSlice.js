import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };
//localStorage store strings parse into an object or initialState to be an empty array
// 可以看到数据

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 复数
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      // return all remaining items and delete the one we want to delete
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
       localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state, action)=>{
      state.cartItems=[];
      return updateCart(state)
    }
  },
});

export const {addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems} = cartSlice.actions;
export default cartSlice.reducer;
