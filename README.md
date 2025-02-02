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
cd L2Assignment-2
```
### 3️⃣ **Install Dependencies**

npm install 
#### OR
yarn install


### 4️⃣ Environment Variables
Create a .env file and add the following information:

PORT=5000
MONGO_URI=mongodb://localhost:27017/bikestore
If using MongoDB Atlas, change MONGO_URI accordingly.


5️⃣ Run the Server

npm run dev
- OR
yarn dev
The server will run on http://localhost:5000.

### 🗂 Project Structure
```sh
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
```

## 🚀 **API Endpoints**
### 🏍️ Bike Routes

| Method | Endpoint            | Description             |
|--------|---------------------|-------------------------|
| POST   | `/api/products`     | Create a new bike      |
| GET    | `/api/products`     | Get all bikes          |
| GET    | `/api/products/:id` | Get a specific bike by ID |
| PUT    | `/api/products/:id` | Update a bike         |
| DELETE | `/api/products/:id` | Delete a bike         |

### 📦 Order Routes

| Method| Endpoint    	        | Description          |
|------| -----------------------|-------------------------|
| POST | `/api/orders`	        | Place an order          |
| GET	 |  `/api/orders/revenue`	| Calculate total revenue |



