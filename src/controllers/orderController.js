const Order = require("../models/Order");
const Cart = require("../models/Cart");
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product",
    );
    const validItems = cart
      ? cart.items.filter((item) => item.product != null)
      : [];

    if (!cart || validItems.length === 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Your cart is empty or contains unavailable products",
        });
    }

    // Recalculate total strictly from valid items
    const actualTotal = validItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );

    const simulatedTransactionId =
      "TXN_" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const order = await Order.create({
      user: req.user.id,
      items: validItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: actualTotal,
      shippingAddress,
      paymentStatus: "completed",
      paymentSimulationDetails: {
        transactionId: simulatedTransactionId,
        method: "Simulated Credit Card",
        paidAt: Date.now(),
      },
    });
    cart.items = [];
    cart.bill = 0;
    await cart.save();
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.product",
      "name price imageUrl",
    );
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized to view this order" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
