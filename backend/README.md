# 1-Retail Backend API

A comprehensive retail management system API built with Node.js, Express.js, MongoDB, and TypeScript. This system provides complete backend functionality for managing users, products, sales transactions, and credit management for retail businesses.

## 🚀 Features

### Core Functionality

- **User Management**: Registration, authentication, email verification, password reset
- **Product Inventory**: CRUD operations for product management with stock tracking
- **Sales Processing**: Transaction recording, profit calculation, and sales analytics
- **Credit Management**: Customer debt tracking, payment processing, and credit status management

### Technical Features

- **JWT Authentication**: Secure token-based authentication system
- **Type Safety**: Full TypeScript implementation with runtime validation using Zod
- **API Documentation**: Comprehensive Swagger/OpenAPI 3.0 documentation
- **Security**: Helmet, CORS, input validation, and password hashing
- **Testing**: Complete test suite with unit and integration tests
- **Logging**: Structured logging with Winston
- **Email Service**: Automated email verification and password reset

## 🏗️ Architecture

```
src/
├── models/          # MongoDB/Mongoose schemas
├── routes/          # API route handlers
├── services/        # Business logic layer
├── schemas/         # Zod validation schemas
├── utils/           # Utilities (middleware, logger, emailer)
├── tests/           # Test suites
└── requests/        # API testing files (.rest)
```

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **MongoDB** >= 5.0.0
- **npm** or **yarn**

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Prince-ij/1-Retail.git
   cd 1-Retail/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**

   ```bash
   # Database
   MONGODB_URI=mongodb://localhost:27017/retail-production
   TEST_MONGODB_URI=mongodb://localhost:27017/retail-test

   # Authentication
   JWT_SECRET=your-super-secret-jwt-key-here

   # Email Service (for verification/password reset)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password

   # Server
   PORT=3001
   NODE_ENV=development
   ```

5. **Build the application**
   ```bash
   npm run tsc
   ```

## 🚀 Usage

### Development

```bash
npm run dev
```

Server will start on `http://localhost:3001` with hot reloading enabled.

### Production

```bash
npm start
```

### Testing

```bash
npm test
```

### API Documentation

Once the server is running, access the interactive API documentation at:

```
http://localhost:3001/api-docs
```

## 📡 API Endpoints

### Authentication & Users

- `POST /api/users` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/reset-link/:id` - Send password reset email
- `POST /api/users/reset` - Reset password
- `GET /api/users/verify-email/:id/:token` - Verify email address

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/:name` - Get product by name
- `PUT /api/products` - Update product
- `DELETE /api/products/:name` - Delete product

### Sales

- `GET /api/sales` - Get all sales
- `POST /api/sales` - Create new sale
- `PUT /api/sales/:id` - Update sale
- `GET /api/sales/:date` - Get sales by date
- `GET /api/sales/profit/:date` - Get profit by date
- `GET /api/sales/total/:date` - Get total sales by date
- `GET /api/sales/buyer/:buyer` - Get sales by buyer
- `GET /api/sales/product/:name` - Get sales by product

### Credits

- `GET /api/credits` - Get all credits/debts
- `POST /api/credits` - Create new credit entry
- `PUT /api/credits/:id` - Update credit entry
- `GET /api/credits/total` - Get total debt amount
- `GET /api/credits/:date` - Get credits by date
- `GET /api/credits/buyer/:name` - Get credits by buyer
- `POST /api/credits/pay` - Process payment

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

### Authentication Flow

1. Register: `POST /api/users`
2. Verify email: Check email and click verification link
3. Login: `POST /api/users/login` → Returns JWT token
4. Use token: Include in Authorization header for protected routes

## 📊 Data Models

### User

```typescript
{
  id: string,
  details: {
    firstName: string,
    lastName: string,
    email: string
  }
}
```

### Product

```typescript
{
  id: string,
  name: string,
  description?: string,
  size?: string,
  price: number,
  cost: number,
  supplier?: string,
  stock: number
}
```

### Sales

```typescript
{
  id: string,
  product: string,
  buyer: string,
  date: Date,
  quantity: number,
  totalPrice: number,
  receiptId: string
}
```

### Credit

```typescript
{
  id: string,
  product: string,
  buyer?: string,
  date?: Date,
  quantity: number,
  amountPaid?: number,
  totalDebt?: number,
  status?: "pending" | "settled",
  receiptId?: string
}
```

## 🧪 Testing

The application includes comprehensive test coverage:

### Run Tests

```bash
npm test
```

### Test Structure

- **Unit Tests**: Individual service function testing
- **Integration Tests**: API endpoint testing
- **Authentication Tests**: JWT token validation
- **Database Tests**: CRUD operation validation

### Test Files

- `src/tests/user_auth.test.ts` - User authentication flow
- `src/tests/products.test.ts` - Product management
- `src/tests/sales_creation.test.ts` - Sales transactions
- `src/tests/credit_creation.test.ts` - Credit management

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Zod schema validation
- **Security Headers**: Helmet middleware
- **CORS Configuration**: Cross-origin request handling
- **Rate Limiting Ready**: Easily configurable
- **Email Verification**: Account security

## 📝 Logging

Structured logging with Winston:

- **Development**: Console logging with colors
- **Production**: File-based logging (`logs/all.log`, `logs/error.log`)
- **Error Tracking**: Centralized error logging

## 🚀 Deployment

### Environment Setup

1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Set secure JWT secret
4. Configure email service
5. Set up reverse proxy (nginx recommended)

### Production Checklist

- [ ] Environment variables configured
- [ ] Database indexes created
- [ ] SSL certificate installed
- [ ] Monitoring setup
- [ ] Backup strategy implemented
- [ ] Log rotation configured

### Docker Support

```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain test coverage above 80%
- Update API documentation for new endpoints
- Follow conventional commit messages

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Prince-ij**

- GitHub: [@Prince-ij](https://github.com/Prince-ij)

## 🙏 Acknowledgments

- Express.js community
- MongoDB team
- TypeScript team
- All contributors and testers

---

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

**API Documentation**: `http://localhost:3001/api-docs`
**Health Check**: `http://localhost:3001/ping`
