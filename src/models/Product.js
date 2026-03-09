const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      unique: true,
      trim: true,
      maxLength: [100, "Name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxLength: [1000, "Description cannot be more than 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      default: 0.0,
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: ["Electronics", "Clothing", "Books", "Home & Garden", "Other"],
    },
    stock: {
      type: Number,
      required: [true, "Please add stock quantity"],
      default: 0,
    },
    imageUrl: {
      type: String,
      default: "no-photo.jpg",
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Product", productSchema);
