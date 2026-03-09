const Product = require("../models/Product");
const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
router.route("/").get(getProducts).post(createProduct);
router.delete("/delete-all", async (req, res) => {
  try {
    const result = await Product.deleteMany({});
    res.json({
      message: `Successfully deleted ${result.deletedCount} products.`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);
module.exports = router;
