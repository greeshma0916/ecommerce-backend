const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { validateRegister, validateLogin } = require("../middleware/validation");
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router
  .route("/profile")
  .get(protect, (req, res) => {
    res.json({ success: true, data: req.user });
  })
  .put(protect, updateProfile);
module.exports = router;
