# AI-ROS Setup Guide

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
composer install
```

### 2. Configure Environment
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Setup Database
Edit `backend/.env`:
```env
DB_DATABASE=airos_backend
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 4. Run Migrations
```bash
php artisan migrate
php artisan db:seed
```

### 5. Start Server
```bash
php artisan serve
```

## Frontend Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 3. Start Server
```bash
npm run dev
```

## Test Backend
```bash
node test-backend.js
```

## Verify Integration
1. Open `http://localhost:5173`
2. Check HeroSection displays real stats
3. Open browser console - no errors
4. Check Network tab - API calls successful

## API Endpoints
- GET /api/v1/health
- GET /api/v1/stats
- GET /api/v1/projects
- GET /api/v1/categories
- GET /api/v1/tags
- GET /api/v1/team
- GET /api/v1/partners
- POST /api/v1/contact
- POST /api/v1/auth/login

## Completed Features
✅ All public API endpoints
✅ Authentication with Sanctum
✅ Rate limiting & CORS
✅ Caching with auto-invalidation
✅ Security headers
✅ Frontend API client
✅ React hooks for data fetching
✅ HeroSection integrated

## Next Steps
1. Add sample data to database
2. Integrate more components
3. Implement contact form
4. Add pagination & filters
