 E-Commerce API Documentation

Base URL for all endpoints: `http://localhost:3000/api`

1. Authentication Endpoints

1.1 Register User
- URL: `/auth/register`
- Method: `POST`
- Body: 
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Responses:
  - `201 Created`: Returns user object and JWT token.
  - `400 Bad Request`: If user exists or validation fails.

1.2 Login User
- URL: `/auth/login`
- Method: `POST`
- Body: 
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Responses:
  - `200 OK`: Returns user object and JWT token.
  - `401 Unauthorized`: Invalid credentials.

1.3 Update User Profile
- URL: `/auth/profile`
- Method: `PUT`
- Headers: `Authorization: Bearer <token>`
- Body (All fields optional):
  ```json
  {
    "name": "John Updated",
    "email": "johnupdated@example.com",
    "password": "newpassword123"
  }
  ```

2. Product Endpoints

2.1 Get All Products
- URL: `/products`
- Method: `GET`
- Query Parameters:
  - `search` (optional) - Search by product name
  - `category` (optional) - Filter by category
  - `sort` (optional) - Sort by `price_asc`, `price_desc`, or latest
  - `page`, `limit` (optional) - Pagination parameters
- Responses:
  - `200 OK`: Returns array of products and pagination info.

2.2 Create Product
- URL: `/products`
- Method: `POST`
- Body:
  ```json
  {
    "name": "Product Name",
    "description": "Description",
    "price": 99.99,
    "category": "Electronics",
    "stock": 10
  }
  ```

3. Cart Endpoints (Requires Authentication)

3.1 Get User Cart
- URL: `/cart`
- Method: `GET`
- Headers: `Authorization: Bearer <token>`
- Responses:
  - `200 OK`: Returns cart items populated with product details and the total bill.

3.2 Add Item to Cart
- URL: `/cart`
- Method: `POST`
- Headers: `Authorization: Bearer <token>`
- Body:
  ```json
  {
    "productId": "64abcdef1234567890",
    "quantity": 1
  }
  ```

3.3 Remove Item from Cart
- URL: `/cart/:itemId`
- Method: `DELETE`
- Headers: `Authorization: Bearer <token>`
- Path Parameter: `itemId` (The Product's Mongo ID, NOT the Cart Item ID)

4. Order Endpoints (Requires Authentication)

4.1 Create Order (Checkout)
- URL: `/orders`
- Method: `POST`
- Headers: `Authorization: Bearer <token>`
- Body:
  ```json
  {
    "shippingAddress": "123 Main St, City, Country"
  }
  ```
- Responses:
  - `201 Created`: Generates simulated payment transaction, records order, and empties user cart.
  - `400 Bad Request`: Cannot checkout an empty cart.

4.2 Get Logged-In User Orders
- URL: `/orders`
- Method: `GET`
- Headers: `Authorization: Bearer <token>`
- Responses:
  - `200 OK`: Returns array of your past orders.
