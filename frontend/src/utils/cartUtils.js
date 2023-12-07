export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
  //2个小数点
};

export const updateCart = (state) => {
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

  localStorage.setItem("cart", JSON.stringify(state)); // save state to loaclStorage
};
