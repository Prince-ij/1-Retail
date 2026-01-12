# 1-Retail Frontend

A modern, responsive React application for retail business management, built with TypeScript, Vite, and a comprehensive UI component library. This frontend provides an intuitive interface for managing inventory, processing sales, tracking customer credits, and monitoring business analytics.

## 🚀 Technology Stack

### Core Technologies

- **React 18** - Latest React with concurrent features and improved performance
- **TypeScript** - Full type safety and enhanced developer experience
- **Vite** (Rolldown) - Ultra-fast build tool optimized for modern development
- **React Router DOM v7** - Client-side routing with data loading capabilities

### State Management

- **Redux Toolkit** - Modern Redux with simplified store management
- **TanStack React Query v5** - Server state management, caching, and synchronization
- **React Hook Form** - Performant forms with minimal re-renders

### UI & Styling

- **React Bootstrap v2** - Responsive, mobile-first component library
- **Bootstrap v5** - Modern CSS framework with utility classes
- **Lucide React** - Beautiful, consistent icons
- **React Select** - Enhanced dropdown and multi-select components

### HTTP & API

- **Axios** - Promise-based HTTP client with interceptors
- **React Query Integration** - Seamless server state management

### Development Tools

- **ESLint** - Code linting with React-specific rules
- **TypeScript ESLint** - TypeScript-aware linting
- **Vite TypeScript Support** - Fast TypeScript compilation

## 📋 Core Features

### 🔐 Authentication System

- **User Registration**: Multi-step signup with form validation
- **Email Verification**: Secure account activation flow
- **Login/Logout**: JWT-based authentication with persistent sessions
- **Password Recovery**: Secure password reset via email
- **Protected Routes**: Automatic route protection based on auth status

### 🎯 Dashboard Analytics

- **Real-time Metrics**: Today's sales, profit, and debt summaries
- **Visual Indicators**: Color-coded cards for different metric types
- **Quick Actions**: Fast access buttons for common operations
- **Nigerian Naira Formatting**: Localized currency display
- **Low Stock Alerts**: Visual warnings for inventory management

### 📦 Product Management

- **Product Listing**: Searchable, filterable product inventory
- **Add/Edit Products**: Comprehensive product forms with validation
- **Stock Monitoring**: Real-time stock levels with low-stock indicators
- **Supplier Tracking**: Manage product sources and costs
- **Product Details**: Individual product view pages

### 💰 Sales Processing

- **Sales Creation**: Step-by-step sales workflow
- **Product Selection**: React Select dropdown with search
- **Automatic Calculations**: Real-time total and profit calculations
- **Receipt Generation**: Professional receipts with unique IDs
- **Sales History**: Filterable transaction history
- **Receipt Viewing**: Dedicated receipt display pages

### 💳 Credit Management

- **Credit Sales**: Record products sold on credit
- **Payment Tracking**: Partial and full payment processing
- **Customer Management**: Track individual customer debt
- **Payment History**: Complete payment transaction records
- **Credit Receipts**: Professional credit transaction receipts
- **Status Management**: Visual status indicators (pending/settled)

### 🧭 Navigation & UX

- **Responsive Navigation**: Mobile-friendly navigation bar
- **Breadcrumb Navigation**: Clear page hierarchy
- **Loading States**: Skeleton loading and spinners
- **Error Handling**: User-friendly error messages
- **Notifications**: Toast-style notifications for actions
- **Form Validation**: Real-time form validation with error states

## 🏗️ Project Structure

```
src/
├── components/                 # React Components
│   ├── Authentication/         # Auth-related components
│   │   ├── index.tsx          # Landing page with features showcase
│   │   ├── LogIn.tsx          # Login form with validation
│   │   ├── SignUp.tsx         # Registration form
│   │   ├── Verify.tsx         # Email verification components
│   │   ├── Reset.tsx          # Password reset form
│   │   └── ResetLink.tsx      # Reset link request form
│   ├── DashBoard/             # Dashboard components
│   │   └── index.tsx          # Main dashboard with metrics
│   ├── Products/              # Product management
│   │   ├── index.tsx          # Product list and management
│   │   ├── AddProductModal.tsx # Product creation modal
│   │   └── ProductViewPage.tsx # Individual product details
│   ├── Sales/                 # Sales management
│   │   ├── index.tsx          # Sales history and filtering
│   │   ├── SaleModal.tsx      # New sale creation modal
│   │   └── ReceiptView.tsx    # Sales receipt display
│   ├── Debts/                 # Credit/debt management
│   │   ├── index.tsx          # Credit list and management
│   │   ├── CreditModal.tsx    # Credit sale creation
│   │   ├── PayModal.tsx       # Payment recording modal
│   │   └── CreditReceipt.tsx  # Credit receipt display
│   ├── NavBar/                # Navigation
│   │   └── index.tsx          # Main navigation component
│   └── AlertDismissable/      # Notifications
│       └── index.tsx          # Toast notification component
├── services/                  # API Service Layer
│   ├── userServices.ts        # User authentication APIs
│   ├── productServices.ts     # Product management APIs
│   ├── saleServices.ts        # Sales transaction APIs
│   └── creditServices.ts      # Credit management APIs
├── reducers/                  # Redux State Management
│   ├── userReducer.ts         # User authentication state
│   └── notificationReducer.ts # App notifications state
├── assets/                    # Static Assets
│   ├── images/                # Application images
│   │   ├── logo.png           # App logo
│   │   ├── dashboard.jpg      # Dashboard hero image
│   │   ├── inventory.jpg      # Inventory feature image
│   │   ├── reciept.jpg        # Sales feature image
│   │   └── credit.jpg         # Credit feature image
│   └── fonts/                 # Custom fonts
│       └── EagleHorizonP.ttf  # Custom brand font
├── hooks.ts                   # Custom React Hooks
├── types.ts                   # TypeScript Type Definitions
├── store.ts                   # Redux Store Configuration
├── App.tsx                    # Main App Component with Routing
├── main.tsx                   # React App Entry Point
└── index.css                  # Global Styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Backend API running on http://localhost:3001

### Installation

1. **Install dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Environment Setup** (optional)

   ```bash
   # Create .env file
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

   Application will be available at: http://localhost:5173

### Build & Deployment

1. **Production Build**

   ```bash
   npm run build
   ```

2. **Preview Production Build**

   ```bash
   npm run preview
   ```

3. **Deploy to Vercel** (configured)
   ```bash
   # Automatic deployment via vercel.json
   # Or manually: vercel --prod
   ```

## 🎨 UI/UX Features

### Design System

- **Consistent Branding**: Custom Eagle Horizon font and brand colors
- **Responsive Design**: Mobile-first approach with Bootstrap grid
- **Color Coding**: Intuitive color schemes for different data types
- **Visual Hierarchy**: Clear typography and spacing systems
- **Accessibility**: ARIA labels and keyboard navigation support

### User Experience

- **Loading States**: Skeleton loaders and loading spinners
- **Error Boundaries**: Graceful error handling and recovery
- **Form Validation**: Real-time validation with clear error messages
- **Success Feedback**: Immediate feedback for user actions
- **Intuitive Navigation**: Logical flow between different sections

### Mobile Responsiveness

- **Mobile Navigation**: Collapsible navigation menu
- **Touch-Friendly**: Large touch targets for mobile users
- **Responsive Tables**: Scrollable tables on mobile devices
- **Adaptive Layout**: Components adapt to screen size

## 🔧 Development Guidelines

### Component Structure

- Functional components with TypeScript
- Custom hooks for reusable logic
- Props interfaces for type safety
- Clear component composition patterns

### State Management Patterns

- Redux Toolkit for global state
- React Query for server state
- Local state for component-specific data
- Form state managed by React Hook Form

### Code Quality

- ESLint configuration with React rules
- TypeScript strict mode enabled
- Consistent code formatting
- Proper error handling patterns

### API Integration

- Centralized API service functions
- Axios interceptors for authentication
- React Query for caching and synchronization
- Proper error handling and retry logic

## 📱 Key Components

### Authentication Flow

- **Landing Page**: Feature showcase and call-to-action
- **Registration**: Multi-step form with validation
- **Login**: Secure authentication with remember me
- **Email Verification**: Clear verification process
- **Password Reset**: Secure reset workflow

### Dashboard Components

- **Metric Cards**: Today's sales, profit, debt summaries
- **Quick Actions**: Fast access to common operations
- **Alert System**: Low stock and other important notifications
- **Navigation Hub**: Central access to all features

### Data Management Components

- **Product Modal**: Comprehensive product creation/editing
- **Sales Modal**: Multi-step sales process with calculations
- **Credit Modal**: Credit sale recording with customer details
- **Payment Modal**: Flexible payment recording system

### Display Components

- **Receipt Views**: Professional receipt formatting
- **Data Tables**: Sortable, filterable data display
- **Form Components**: Reusable form elements with validation
- **Modal Components**: Consistent modal patterns

## 🚀 Performance Optimizations

### Build Optimizations

- **Vite + Rolldown**: Ultra-fast build times
- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image and font optimization

### Runtime Performance

- **React Query Caching**: Intelligent server state caching
- **Memoization**: React.memo and useMemo for expensive operations
- **Lazy Loading**: Route-based lazy loading
- **Virtual Scrolling**: For large data sets (if implemented)

### User Experience

- **Instant Navigation**: Client-side routing with prefetching
- **Optimistic Updates**: Immediate UI updates for better UX
- **Error Recovery**: Automatic retry mechanisms
- **Offline Indicators**: Network status awareness

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality

# Type Checking
npm run type-check   # Run TypeScript compiler check
```

## 🔮 Future Enhancements

### Planned Features

- **Advanced Reporting**: Charts and graphs for business analytics
- **Barcode Scanning**: Product identification via camera
- **Multi-language Support**: Internationalization (i18n)
- **Offline Support**: Progressive Web App capabilities
- **Print Integration**: Direct receipt printing
- **Advanced Filtering**: More sophisticated data filtering

### Technical Improvements

- **Unit Testing**: Jest and React Testing Library setup
- **E2E Testing**: Playwright or Cypress integration
- **Performance Monitoring**: Real User Monitoring (RUM)
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Accessibility Audit**: WCAG compliance improvements

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Prince-ij**

- GitHub: [@Prince-ij](https://github.com/Prince-ij)
- Project: [1-Retail](https://github.com/Prince-ij/1-Retail)

---

**Built with modern React practices and user experience in mind for small retail businesses.**
