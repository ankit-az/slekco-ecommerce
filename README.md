# Slekco - Modern Multipurpose E-Commerce Platform

Slekco is a modern, responsive, marketplace-style e-commerce application designed for seamless browsing and purchasing across multiple product categories (Electronics, Fashion, Home & Living, Beauty, and Accessories).

Built with a clean monorepo architecture, Slekco delivers a fast Next.js App Router frontend powered by a robust Express.js REST API and MongoDB backend.

---

## 🌟 Features

- **Dynamic Homepage**: Hero showcase, curated category cards, featured products section, seasonal discount promotional banner, and newsletter subscription form.
- **Product Catalog & Filtering**: Search products by title or brand, filter by category, brand, and max price, with multi-option sorting (price asc/desc, newest, highest rated) and pagination.
- **Responsive Mobile Layout**: Mobile-optimized navigation drawer and collapsible filter panel for touch devices.
- **Product Details Page**: Dynamic route (`/products/[slug]`), image gallery with thumbnails, real-time stock status, specs, quantity selector, and related category products.
- **Persistent Shopping Cart**: Zustand state management with `localStorage` persistence, real-time item counter badge, quantity controls, tax/shipping estimates, and mock checkout modal.
- **RESTful API Backend**: Express.js server connected to MongoDB/Mongoose with full CRUD endpoints for products, categories, authentication, and user contact leads.
- **JWT Authentication**: User registration and login flow with password hashing using `bcryptjs` and token protection middleware.
- **Contact & Leads Form**: Frontend form validated using Zod and React Hook Form, submitting lead messages to the backend Contact API.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language & UI**: JavaScript (JSX), [Tailwind CSS](https://tailwindcss.com/) v4
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with `localStorage` persistence)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Client**: [Axios](https://axios-http.com/)
- **Form Handling & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

### Backend
- **Runtime**: Node.js & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) (includes `mongodb-memory-server` fallback for zero-friction out-of-the-box local testing)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcryptjs` password hashing
- **Security & Config**: CORS, `cookie-parser`, `dotenv`

---

## 🏗️ Architecture

```text
┌─────────────────────────────────────────┐
│           Next.js Frontend              │
│  (App Router, Tailwind CSS, Zustand)   │
└────────────────────┬────────────────────┘
                     │ HTTP / REST API (Axios)
                     ▼
┌─────────────────────────────────────────┐
│           Express.js Server             │
│   (Controllers, Routes, Auth Middleware)│
└────────────────────┬────────────────────┘
                     │ Mongoose ODM
                     ▼
┌─────────────────────────────────────────┐
│            MongoDB Database             │
│ (Products, Categories, Users, Contacts) │
└─────────────────────────────────────────┘
```

### Layer Responsibilities
1. **Frontend (Client)**: Renders pages and components, manages cart and authentication state, handles user interactions, performs client-side form validation, and consumes REST APIs.
2. **Backend API (Server)**: Handles incoming REST requests, executes business logic, enforces authentication via JWT middleware, processes search and filter query parameters, and handles global errors.
3. **Database (MongoDB)**: Stores persistent data models (User, Category, Product, Order, Contact) with indexed fields for high-performance querying.

---

## 📂 Project Structure

```text
assignment/
├── client/
│   ├── app/
│   │   ├── cart/page.js
│   │   ├── contact/page.js
│   │   ├── login/page.js
│   │   ├── products/
│   │   │   ├── page.js
│   │   │   └── [slug]/page.js
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   │   ├── cart/
│   │   ├── home/
│   │   │   ├── FeaturedCategories.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Newsletter.jsx
│   │   │   └── PromoBanner.jsx
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   ├── product/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductFilters.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   └── ProductSort.jsx
│   │   └── ui/
│   ├── lib/
│   │   ├── api.js
│   │   └── utils.js
│   ├── store/
│   │   ├── useAuthStore.js
│   │   └── useCartStore.js
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── category.controller.js
│   │   │   ├── contact.controller.js
│   │   │   └── product.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── error.middleware.js
│   │   ├── models/
│   │   │   ├── Category.js
│   │   │   ├── Contact.js
│   │   │   ├── Order.js
│   │   │   ├── Product.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── category.routes.js
│   │   │   ├── contact.routes.js
│   │   │   └── product.routes.js
│   │   ├── utils/
│   │   │   └── seed.js
│   │   └── app.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## ⚡ Setup & Local Running Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd assignment
```

### 2. Configure & Run Backend Server
```bash
cd server
npm install
npm run seed     # Populates database with 5 categories, 18 realistic products & demo user
npm run dev      # Starts Express API at http://localhost:5000
```

### 3. Configure & Run Frontend Client
Open a new terminal window:
```bash
cd client
npm install
npm run dev      # Starts Next.js app at http://localhost:3000
```

---

## 🔑 Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/slekco
JWT_SECRET=slekco_super_secret_jwt_key_2026_change_in_production
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

*(Note: If a local MongoDB instance is not active on port 27017, the server will automatically launch `mongodb-memory-server` as a seamless fallback).*

### Frontend (`client/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🌐 Deployment Documentation

### Frontend Deployment (Vercel)
1. Push project repository to GitHub.
2. Connect repository to [Vercel](https://vercel.com).
3. Set Root Directory to `client`.
4. Configure Environment Variable:
   - `NEXT_PUBLIC_API_URL`: `https://your-backend-api.onrender.com/api`
5. Deploy.

### Backend Deployment (Render / Railway)
1. Create a Web Service on [Render](https://render.com) or [Railway](https://railway.app).
2. Set Root Directory to `server`.
3. Set Build Command: `npm install` and Start Command: `npm start`.
4. Add Environment Variables:
   - `PORT`: `5000`
   - `MONGODB_URI`: `<Your MongoDB Atlas Connection String>`
   - `JWT_SECRET`: `<Production Secret Key>`
   - `CLIENT_URL`: `https://your-frontend-domain.vercel.app`
   - `NODE_ENV`: `production`

### Database (MongoDB Atlas)
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and whitelist IP address (`0.0.0.0/0` for cloud deployment).
3. Copy standard connection string into `MONGODB_URI`.

```text
Live Demo: To be added after deployment
```

---

## 🤖 AI-Assisted Development

AI tools (such as Claude Code and Antigravity) were utilized as intelligent pair-programming assistants throughout the development of Slekco.

### Key Assistance Areas:
- **Architecture Planning**: Design of the monorepo structure, separating Next.js App Router client from the Express REST API.
- **Schema & Controller Design**: Formatting Mongoose schemas with text indexes for product search and building parametric queries for category, brand, and price filters.
- **Component Structuring**: Crafting responsive glassmorphic UI components with Tailwind CSS v4 and Lucide React.
- **State Management**: Setting up Zustand cart store with `localStorage` hydration safety.

### Concrete Refactoring Example:
> **Initial Issue**: An early AI-generated product filtering logic executed multiple separate client-side array filter loops inside React hooks, causing unnecessary UI re-renders and failing to synchronize filter state with URL parameters when sharing links.
>
> **Refactoring & Improvement**: The implementation was refactored to delegate filtering, multi-field regex searching, price range evaluation, and pagination directly to MongoDB via Express controller query parameters. A URL query-string synchronization helper (`updateQueryParams`) was created using Next.js `useSearchParams`, ensuring that search state, active filters, and pagination remain perfectly bookmarks-friendly, performant, and resilient against empty datasets.
