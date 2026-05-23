# 1-Retail: Complete Retail Management System

## Motivation

1-Retail is a comprehensive full-stack retail management system built for small and medium-sized retail businesses. The application streamlines inventory management, sales processing, customer credit tracking, and business analytics through a modern and responsive interface.

Many retail businesses still rely on manual bookkeeping, spreadsheets, or disconnected systems that make tracking stock, profits, and customer debts difficult. 1-Retail was designed to solve these problems by providing a centralized digital solution with real-time updates, automated calculations, and secure data management.

The project focuses on:

* Simplifying daily retail operations
* Improving inventory visibility
* Tracking sales and profits in real time
* Managing customer debts efficiently
* Providing actionable business insights
* Offering a scalable and maintainable architecture

---

## Quick Start

### Prerequisites

Before running the project locally, ensure you have the following installed:

* Node.js >= 18.0.0
* MongoDB >= 5.0.0
* npm or yarn package manager

---

### Clone Repository

```bash
git clone https://github.com/Prince-ij/1-Retail.git
cd 1-Retail
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/retail-production
TEST_MONGODB_URI=mongodb://localhost:27017/retail-test

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Email Service
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Server
PORT=3001
NODE_ENV=development
```

Build and start the backend server:

```bash
npm run tsc
npm run dev
```

---

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Optional frontend `.env`:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

---

### Access the Application

| Service               | URL                                                              |
| --------------------- | ---------------------------------------------------------------- |
| Frontend              | [http://localhost:5173](http://localhost:5173)                   |
| Backend API           | [http://localhost:3001](http://localhost:3001)                   |
| Swagger Documentation | [http://localhost:3001/api-docs](http://localhost:3001/api-docs) |
| Health Check          | [http://localhost:3001/ping](http://localhost:3001/ping)         |

---

### First-Time Setup

1. Register a new account
2. Verify your email address
3. Login to the application
4. Add products to inventory
5. Start recording sales and credits

---

## Usage

### Core Features

#### Authentication & Security

* User registration and login
* Email verification workflow
* JWT-based authentication
* Password reset system
* Session persistence
* Secure password hashing with bcrypt

#### Product Management

* Add, edit, and delete products
* Real-time inventory tracking
* Low-stock monitoring
* Supplier tracking
* Cost and profit calculations
* Product search and filtering

#### Sales Processing

* Record sales transactions
* Automatic receipt generation
* Multi-product sales support
* Real-time stock deduction
* Daily sales analytics
* Profit tracking

#### Credit Management

* Record credit sales
* Track customer debts
* Partial and full payment support
* Payment history tracking
* Outstanding debt analytics
* Automatic credit status updates

#### Dashboard Analytics

* Daily sales overview
* Profit summaries
* Low-stock alerts
* Debt summaries
* Quick access operations

---

### Technology Stack

#### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication
* Swagger/OpenAPI
* Winston Logging
* Zod Validation
* Nodemailer
* Helmet
* CORS

#### Frontend

* React 18
* TypeScript
* Vite
* Redux Toolkit
* TanStack React Query
* React Bootstrap
* React Hook Form
* React Router DOM
* Axios
* Lucide React

---

### Project Structure

```text
1-Retail/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── schemas/
│   │   ├── utils/
│   │   ├── tests/
│   │   ├── requests/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── logs/
│   ├── package.json
│   ├── tsconfig.json
│   └── eslint.config.mjs
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   ├── reducers/
    │   ├── assets/
    │   ├── hooks.ts
    │   ├── types.ts
    │   ├── store.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── package.json
    ├── vite.config.ts
    ├── vercel.json
    ├── tsconfig.json
    └── index.html
```

---

### API Endpoints

#### Authentication

| Method | Endpoint                             | Description    |
| ------ | ------------------------------------ | -------------- |
| POST   | `/api/users`                         | Register user  |
| POST   | `/api/users/login`                   | User login     |
| GET    | `/api/users/:id`                     | Get user by ID |
| POST   | `/api/users/reset`                   | Reset password |
| GET    | `/api/users/verify-email/:id/:token` | Verify email   |

#### Products

| Method | Endpoint              | Description      |
| ------ | --------------------- | ---------------- |
| GET    | `/api/products`       | Get all products |
| POST   | `/api/products`       | Create product   |
| PUT    | `/api/products`       | Update product   |
| DELETE | `/api/products/:name` | Delete product   |

#### Sales

| Method | Endpoint                  | Description       |
| ------ | ------------------------- | ----------------- |
| GET    | `/api/sales`              | Get sales records |
| POST   | `/api/sales`              | Record sale       |
| PUT    | `/api/sales/:id`          | Update sale       |
| GET    | `/api/sales/total/:date`  | Daily sales total |
| GET    | `/api/sales/profit/:date` | Daily profit      |

#### Credits

| Method | Endpoint             | Description    |
| ------ | -------------------- | -------------- |
| GET    | `/api/credits`       | Get credits    |
| POST   | `/api/credits`       | Create credit  |
| PUT    | `/api/credits/:id`   | Update credit  |
| POST   | `/api/credits/pay`   | Record payment |
| GET    | `/api/credits/total` | Total debt     |

---

### Testing

Run backend tests:

```bash
cd backend
npm test
```

Run a specific test file:

```bash
npm test -- user_auth.test.ts
```

Test coverage includes:

* Authentication flows
* Product management
* Sales processing
* Credit management
* Validation logic
* Business rules

---

### Security Features

* JWT token authentication
* Password hashing with bcrypt
* Runtime schema validation using Zod
* Helmet security middleware
* CORS protection
* Input sanitization
* Secure email verification tokens

---

### Deployment

#### Frontend Deployment

Recommended platforms:

* Vercel
* Netlify
* AWS S3 + CloudFront

#### Backend Deployment

Recommended platforms:

* Railway
* Render
* Heroku
* DigitalOcean
* AWS EC2

#### Database

* MongoDB Atlas recommended for production

---

## Contributing

Contributions are welcome.

### Development Workflow

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/amazing-feature
```

3. Make your changes
4. Add or update tests
5. Commit your changes

```bash
git commit -m "Add amazing feature"
```

6. Push your branch

```bash
git push origin feature/amazing-feature
```

7. Open a Pull Request

---

### Contribution Guidelines

* Follow TypeScript best practices
* Maintain clean architecture
* Keep components reusable and modular
* Add proper validation and error handling
* Update documentation where necessary
* Ensure tests pass before submitting

---

## Author

### Prince-ij

* GitHub: [https://github.com/Prince-ij](https://github.com/Prince-ij)
* Repository: [https://github.com/Prince-ij/1-Retail](https://github.com/Prince-ij/1-Retail)

---

## License

This project is licensed under the ISC License.

---

## Project Metrics

* 10,000+ lines of code
* 25+ API endpoints
* 20+ reusable React components
* Full TypeScript implementation
* RESTful API architecture
* Real-time business analytics

---

Built for modern retail businesses looking to digitize and simplify their operations.
