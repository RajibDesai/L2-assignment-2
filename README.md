# 🚴‍♂️ **Bike Store API**  

A **RESTful API** built using **Express.js**, **TypeScript**, and **MongoDB**. The schema is defined using **Mongoose** to manage a **Bike Store**. This API allows managing **bikes and orders** and enables **revenue calculation**.


---

## 📌 **Features**  

✅ **Bike Management**: Create, retrieve, update, and delete bikes.  
✅ **Order Management**: Place orders and manage inventory dynamically.  
✅ **Stock Handling**: Automatically update stock availability.  
✅ **Revenue Calculation**: Aggregates total revenue from orders.  
✅ **Search & Filtering**: Retrieve bikes by name, brand, or category.  
✅ **Validation & Error Handling**: Structured responses for validation and not found cases.  

---

## 🛠️ **Installation & Setup**  

### 1️⃣ **Prerequisites**  
- [Node.js](https://nodejs.org/) (v16+ recommended)  
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas)  
- npm or yarn  

### 2️⃣ **Clone the Repository**  
```sh
git clone  https://github.com/RajibDesai/L2Assignment-1.git
cd L2Assignment-1
3️⃣ Install Dependencies
sh
Copy
Edit
npm install
# OR
yarn install
4️⃣ Environment Variables
.env ফাইল তৈরি করে নিচের তথ্য যোগ করুন:

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/bikestore
MongoDB Atlas ব্যবহার করলে MONGO_URI পরিবর্তন করুন।

5️⃣ Run the Server
sh
Copy
Edit
npm run dev
# OR
yarn dev
সার্ভার চালু হবে http://localhost:5000

🗂 Project Structure
bash
Copy
Edit
bike-store/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── app/
│       ├── config/
│       │   └── index.ts
│       ├── modules/
│           ├── interfaces/
│           │   ├── product.interface.ts
│           │   ├── order.interface.ts
│           ├── models/
│           │   ├── product.model.ts
│           │   ├── order.model.ts
│           ├── validations/
│           │   ├── product.validation.ts
│           │   ├── order.validation.ts
│           ├── services/
│           │   ├── product.service.ts
│           │   ├── order.service.ts
│           ├── controllers/
│           │   ├── product.controller.ts
│           │   ├── order.controller.ts
│           ├── routes/
│           │   ├── product.route.ts
│           │   ├── order.route.ts
│           ├── middlewares/
│           │   └── error.middleware.ts
├── package.json
├── tsconfig.json
├── .env
├── README.md
🚀 API Endpoints
🏍️ Bike Routes
Method	Endpoint	Description
POST	/api/products	Create a new bike
GET	/api/products	Get all bikes
GET	/api/products/:id	Get a specific bike by ID
PUT	/api/products/:id	Update a bike
DELETE	/api/products/:id	Delete a bike
📦 Order Routes
Method	Endpoint	Description
POST	/api/orders	Place an order
GET	/api/orders/revenue	Calculate total revenue
🛠️ Usage & Testing the API
1️⃣ Using Postman or Thunder Client
2️⃣ Example: Create a Bike

sh
Copy
Edit
curl -X POST http://localhost:5000/api/products \
-H "Content-Type: application/json" \
-d '{
  "name": "Roadster 3000",
  "brand": "Trek",
  "price": 1500,
  "category": "Road",
  "description": "A lightweight road bike.",
  "quantity": 10,
  "inStock": true
}'
3️⃣ Response:

json
Copy
Edit
{
  "message": "Bike created successfully",
  "success": true,
  "data": {
    "_id": "64a123456789b012c345d678",
    "name": "Roadster 3000",
    "brand": "Trek",
    "price": 1500,
    "category": "Road",
    "description": "A lightweight road bike.",
    "quantity": 10,
    "inStock": true,
    "createdAt": "2025-02-01T10:23:45.123Z",
    "updatedAt": "2025-02-01T10:23:45.123Z"
  }
}
❌ Error Handling
400 Bad Request – Validation errors, missing fields.
404 Not Found – When a bike or order does not exist.
500 Internal Server Error – Unhandled exceptions.
Example:

json
Copy
Edit
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "price": {
        "message": "Price must be a positive number",
        "value": -10
      }
    }
  }
}
📊 Revenue Calculation
Endpoint: GET /api/orders/revenue
Example Response:
json
Copy
Edit
{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 3600
  }
}

