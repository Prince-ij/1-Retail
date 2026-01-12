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

   # Complete environment variables setup

   MONGODB_URI=mongodb://localhost:27017/retail-production
   TEST_MONGODB_URI=mongodb://localhost:27017/retail-test
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password # Use App Password for Gmail
   PORT=3001
   NODE_ENV=development

   ```

   ```

4. **Build the application**

   ```bash
   npm run tsc
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

   Server starts at `http://localhost:3001` with hot reloading enabled.

## 🚀 Usage

### Development Mode

```bash
npm run dev
```

- Automatic TypeScript compilation and restart on changes
- Morgan logging for HTTP requests
- Detailed error messages and stack traces
- Swagger documentation available at `/api-docs`

### Production Mode

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

The application includes comprehensive test coverage for all critical business logic:

### Test Configuration

- **Test Environment**: Separate test database to avoid data pollution
- **Test Runner**: Node.js built-in test runner with TypeScript support
- **Test Strategy**: Integration tests covering API endpoints and business logic
- **Test Data**: Helper functions create consistent test data
- **Database Cleanup**: Automatic cleanup before and after test suites

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- --grep "user authentication"

# Run with verbose output
NODE_ENV=test npm test

# Run tests with coverage (if configured)
npm run test:coverage
```

### Test Suites Overview

#### Authentication Tests (`user_auth.test.ts`)

- ✅ User registration with validation
- ✅ Email verification workflow
- ✅ User login and JWT token generation
- ✅ Password reset functionality
- ✅ Protected route authentication
- ✅ Token expiration handling

#### Product Management Tests (`products.test.ts`)

- ✅ Product creation with validation
- ✅ Product retrieval and filtering
- ✅ Product updates and stock management
- ✅ Product deletion and referential integrity
- ✅ Stock level validation
- ✅ Supplier information management

#### Sales Transaction Tests (`sales_creation.test.ts`)

- ✅ Sales recording with automatic calculations
- ✅ Inventory updates during sales
- ✅ Receipt ID generation and uniqueness
- ✅ Profit calculation accuracy
- ✅ Sales analytics by date
- ✅ Buyer transaction history
- ✅ Product sales tracking

#### Credit Management Tests (`credit_creation.test.ts`)

- ✅ Credit sale recording
- ✅ Payment processing (partial and full)
- ✅ Credit status management
- ✅ Debt calculation accuracy
- ✅ Customer debt aggregation
- ✅ Credit receipt generation

### Test Data Management

- **Helper Functions**: Consistent test data creation
- **Database Isolation**: Each test suite runs in isolation
- **Cleanup Procedures**: Automatic test data cleanup
- **Realistic Data**: Test data mimics real-world scenarios

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

## 🚀 Deployment & Production

### Production Environment Setup

1. **Environment Configuration**

   ```bash
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/retail-prod
   JWT_SECRET=your-super-secure-production-jwt-secret-key
   EMAIL_HOST=smtp.sendgrid.net  # Or your production email service
   EMAIL_PORT=587
   EMAIL_USER=apikey  # For SendGrid
   EMAIL_PASS=your-sendgrid-api-key
   PORT=3001
   ```

2. **Database Setup**

   ```bash
   # Create production database indexes
   # Ensure proper backup strategy
   # Configure connection pooling
   ```

3. **Build and Start**
   ```bash
   npm run tsc
   npm start
   ```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application
COPY dist ./dist

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/ping || exit 1

# Start application
CMD ["node", "dist/index.js"]
```

### Cloud Platform Deployment

#### Heroku

```bash
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret

# Deploy
git push heroku main
```

#### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

#### DigitalOcean App Platform

- Connect GitHub repository
- Configure environment variables
- Set build command: `npm run tsc`
- Set run command: `npm start`

### Production Checklist

- [ ] **Environment Variables**: All production configs set
- [ ] **Database**: Production MongoDB with proper indexes
- [ ] **SSL/HTTPS**: SSL certificate configured
- [ ] **Domain**: Custom domain configured
- [ ] **Monitoring**: Application monitoring setup
- [ ] **Logging**: Production logging configured
- [ ] **Backups**: Database backup strategy implemented
- [ ] **Security**: Security headers and rate limiting enabled
- [ ] **Performance**: Database optimization and caching
- [ ] **Documentation**: API documentation accessible

### Monitoring & Maintenance

#### Health Checks

```bash
# Application health
curl http://your-domain.com/ping

# API documentation
curl http://your-domain.com/api-docs
```

#### Log Management

- **Production Logs**: Stored in `logs/` directory
- **Error Tracking**: Centralized error logging
- **Performance Metrics**: Response time monitoring
- **Log Rotation**: Automatic log file rotation

#### Database Maintenance

- **Regular Backups**: Automated daily backups
- **Index Optimization**: Monitor and optimize database indexes
- **Performance Monitoring**: Query performance tracking
- **Data Cleanup**: Archive old data as needed

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
