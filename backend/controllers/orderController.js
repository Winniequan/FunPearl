import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//create new order
//route  POST/api/orders
//access Private
const addOrderItems = asyncHandler(async (req, res) => {
res.send("add order items")
});

//get logged in user orders
//route  GET/api/orders/myorders
//access Private
const getMyOrders = asyncHandler(async (req, res) => {
res.send("get my order items")
});

//get order by id
//route  POST/api/orders/:id
//access Private
const getOrderById = asyncHandler(async (req, res) => {
res.send("get Order by id")
});

//update order to paid 
//route  get/api/orders/:id/pay
//access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
res.send("update order to paid")
});

//update order to delivered
//route  get/api/orders/:id/deliver
//access Private / Admin 
const updateOrderToDelivered = asyncHandler(async (req, res) => {
res.send("update order to delivered")
});

//geT orders
//route  GET/api/orders/:id
//access Private/ admin
const getOrders = asyncHandler(async (req, res) => {
res.send("get all Orders")
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
