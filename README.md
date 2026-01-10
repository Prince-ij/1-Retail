# 1-Retail: Complete Retail Management System

A comprehensive full-stack web application designed for retail business management, offering inventory tracking, sales processing, customer credit management, and business analytics through a modern, responsive interface.

## 🛠️ Technology Stack

### Backend

- **Node.js** with **Express.js** and **TypeScript**
- **MongoDB** with **Mongoose** ODM
- **JWT Authentication** with email verification
- **Swagger/OpenAPI** for API documentation
- **Winston** logging system
- **Bcrypt** for secure password hashing
- **Nodemailer** for email services

### Frontend

- **React 18** with **TypeScript** and **Vite**
- **Redux Toolkit** for state management
- **TanStack React Query** for server state
- **React Bootstrap** for responsive UI
- **React Hook Form** for form handling
- **React Router** for navigation
- **Axios** for API communication

## 📋 Core Features

### 🔐 Authentication System

- User registration with email verification
- Secure JWT-based authentication
- Password reset functionality
- Account verification workflow

### 📦 Product Management

- Add, edit, and delete products
- Track product details (name, description, size, price, cost, supplier)
- Real-time inventory management
- Stock level monitoring with low-stock alerts
- Product search and filtering

### 💰 Sales Processing

- Record sales transactions with automatic receipt generation
- Unique receipt ID for each transaction
- Automatic total price calculation
- Today's sales tracking and analytics
- Profit calculation (selling price - cost price)

### 💳 Credit Management

- Record sales on credit with buyer information
- Track outstanding debts by customer
- Payment processing (partial and full payments)
- Credit status management (pending/settled)
- Debtor analytics and reporting

### 📊 Business Dashboard

- Real-time sales metrics for today
- Profit tracking and analysis
- Low-stock product alerts
- Total debt overview
- Unique debtor count
- Quick action buttons for common operations

## 🗂️ Project Structure

```
1-Retail/
├── backend/
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   │   ├── User.ts      # User authentication model
│   │   │   ├── Product.ts   # Product inventory model
│   │   │   ├── Sales.ts     # Sales transaction model
│   │   │   └── Credit.ts    # Credit/debt tracking model
│   │   ├── routes/          # Express route handlers
│   │   ├── services/        # Business logic layer
│   │   ├── schemas/         # Zod validation schemas
│   │   ├── utils/           # Middleware, logging, email utilities
│   │   └── tests/           # Test suites
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   │   ├── Authentication/  # Login, signup, verification
    │   │   ├── DashBoard/      # Main dashboard with metrics
    │   │   ├── Products/       # Product management interface
    │   │   ├── Sales/          # Sales processing interface
    │   │   └── Debts/          # Credit/debt management
    │   ├── services/        # API service functions
    │   ├── reducers/        # Redux state management
    │   └── types.ts         # TypeScript type definitions
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB database
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Prince-ij/1-Retail.git
   cd 1-Retail
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install

   # Create .env file with:
   # MONGODB_URI=your_mongodb_connection_string
   # JWT_SECRET=your_jwt_secret
   # EMAIL_USER=your_email_username
   # EMAIL_PASS=your_email_password

   npm run dev
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api-docs

## 🔧 API Endpoints

### Authentication

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/verify` - Email verification
- `POST /api/users/reset-password` - Password reset

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Add new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Sales

- `GET /api/sales` - Get sales records
- `POST /api/sales` - Record new sale
- `GET /api/sales/total/:date` - Get total sales by date
- `GET /api/sales/profit/:date` - Get profit by date

### Credits

- `GET /api/credits` - Get credit records
- `POST /api/credits` - Record credit sale
- `PUT /api/credits/:id/payment` - Record payment

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Includes tests for:
# - User authentication
# - Product CRUD operations
# - Sales processing
# - Credit management
```

## 📱 Key Features in Detail

### Dashboard Metrics

- **Today's Sales**: Real-time sales total in Nigerian Naira
- **Today's Profit**: Calculated profit margin for current day
- **Low Stock Alerts**: Products with stock below 5 units
- **Debt Summary**: Total outstanding debts and unique debtor count

### Product Management

- Comprehensive product information tracking
- Automatic stock updates during sales
- Supplier information management
- Cost and pricing management for profit calculation

### Sales System

- Automatic receipt generation with unique IDs
- Real-time inventory updates
- Profit calculation based on cost vs selling price
- Sales analytics by date and buyer

### Credit System

- Flexible credit sales with buyer tracking
- Payment recording system
- Automatic status updates (pending/settled)
- Outstanding debt monitoring

## 🛡️ Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Email verification for account activation
- Input validation with Zod schemas
- CORS and Helmet security middleware

## 📈 Business Impact

This application digitizes traditional retail operations, providing:

- **Efficiency**: Automated calculations and record-keeping
- **Insights**: Real-time business analytics
- **Accuracy**: Reduced manual errors in transactions
- **Scalability**: Handles growing inventory and customer base
- **Accessibility**: Web-based interface accessible from any device

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ for small retail businesses looking to modernize their operations**
