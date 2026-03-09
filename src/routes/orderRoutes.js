const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
} = require("../controllers/orderController");
const { protect } = require("../middleware/auth");
router.use(protect);
router.route("/").post(createOrder).get(getUserOrders);
router.route("/:id").get(getOrderById);
module.exports = router;
