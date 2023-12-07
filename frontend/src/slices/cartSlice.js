import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };
//localStorage store strings parse into an object or initialState to be an empty array
// 可以看到数据
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
  //2个小数点
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {// 复数
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
      // Calculate items prices
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      ); //累计初始为0
      // Calculate shipping prices, shipping for free over certain amount
      state.shppingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // Calculate tax prices(certain % tax)
      state.tax = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
      // Calculate total prices
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shppingPrice) +
        Number(state.tax)
      ).toFixed(2);
      localStorage.setItem("cart", JSON.stringify(state));// save state to loaclStorage
    },
  },
});

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;
