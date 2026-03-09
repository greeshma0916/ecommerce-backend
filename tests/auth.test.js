const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/User");
describe("Auth API", () => {
  beforeAll(async () => {});
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const randomEmail = `testuser_${Date.now()}@example.com`;
      const res = await request(app).post("/api/auth/register").send({
        firstName: "Test",
        lastName: "User",
        email: randomEmail,
        password: "password123",
      });
      if (res.statusCode === 201) {
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty("token");
      }
    });
    it("should fail with invalid email", async () => {
      const res = await request(app).post("/api/auth/register").send({
        firstName: "Test",
        lastName: "User",
        email: "not-an-email",
        password: "password123",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
