import {createSlice} from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart") ? JSON.parse
(localStorage.getItem("cart")) : {cartItems: []};
//localStorage store strings parse into an object or initialState to be an empty array

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducer: {}
})

export default cartSlice.reducer;