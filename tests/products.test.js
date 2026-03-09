const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
describe("Products API", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe("GET /api/products", () => {
    it("should fetch all products with pagination", async () => {
      const res = await request(app).get("/api/products");
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("pagination");
    });
    it("should filter products by search term", async () => {
      const res = await request(app).get(
        "/api/products?search=nonexistentproduct123",
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
});
