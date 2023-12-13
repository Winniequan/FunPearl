import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//create new order
//route  POST/api/orders
//access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order item");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })), // dont need id
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

//get logged in user orders
//route  GET/api/orders/myorders
//access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

//get order by id
//route  POST/api/orders/:id
//access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//update order to paid
//route  get/api/orders/:id/pay
//access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid");
});

//update order to delivered
//route  get/api/orders/:id/deliver
//access Private / Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

//geT orders
//route  GET/api/orders/:id
//access Private/ admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("get all Orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
