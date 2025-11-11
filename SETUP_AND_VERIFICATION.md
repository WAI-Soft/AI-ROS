# AI-ROS Backend & Frontend Setup and Verification Guide

## 🚀 Quick Start

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+
- Redis (optional, for caching)

## 📦 Backend Setup

### 1. Install Dependencies
```bash
cd backend
composer install
```

### 2. Environment Configuration
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Configure Database
Edit `backend/.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=airos_backend
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 4. Run Migrations and Seeders
```bash
php artisan migrate
php artisan db:seed
```

### 5. Configure Cache (Optional)
For Redis caching, update `.env`:
```env
CACHE_STORE=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

Or use database caching:
```env
CACHE_STORE=database
```

If using database cache, run:
```bash
php artisan cache:table
php artisan migrate
```

### 6. Start Backend Server
```bash
php artisan serve
```

Backend will be available at: `http://localhost:8000`

## 🎨 Frontend Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create `.env` in project root:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
```

### 3. Start Frontend Server
```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## ✅ Verification Steps

### 1. Test Backend API

#### Option A: Using Browser
Open: `http://localhost:8000/api/v1/health`

Expected response:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "version": "1.0.0",
    "timestamp": "2024-01-01T00:00:00+00:00"
  },
  "message": "AI-ROS Backend API is running",
  "errors": null
}
```

#### Option B: Using Test Script
```bash
node test-backend.js
```

Expected output:
```
🧪 Testing Backend API Connection...

1️⃣ Testing Health Check...
✅ Health Check: healthy
   Version: 1.0.0

2️⃣ Testing Stats Endpoint...
✅ Stats Retrieved:
   Total Projects: 0
   CO2 Saved: 0
   Partners: 0

... (more tests)

🎉 All Backend Tests Passed!
✨ Backend is ready for frontend integration!
```

### 2. Test Frontend Integration

1. Open browser to `http://localhost:5173`
2. Open Developer Console (F12)
3. Check Network tab for API calls
4. Verify HeroSection displays stats from backend

### 3. Test All API Endpoints

#### Health Check
```bash
curl http://localhost:8000/api/v1/health
```

#### Stats
```bash
curl http://localhost:8000/api/v1/stats
```

#### Projects
```bash
curl http://localhost:8000/api/v1/projects
```

#### Categories
```bash
curl http://localhost:8000/api/v1/categories
```

#### Tags
```bash
curl http://localhost:8000/api/v1/tags
```

#### Team
```bash
curl http://localhost:8000/api/v1/team
```

#### Partners
```bash
curl http://localhost:8000/api/v1/partners
```

#### Contact Form (POST)
```bash
curl -X POST http://localhost:8000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message",
    "recaptcha_token": "test_token"
  }'
```

## 🔧 Troubleshooting

### Backend Issues

#### "Connection refused" Error
- Ensure backend is running: `php artisan serve`
- Check port 8000 is not in use
- Verify MySQL is running

#### CORS Errors
- Check `backend/config/cors.php` includes frontend URL
- Restart backend after config changes
- Clear browser cache

#### Database Connection Error
- Verify MySQL credentials in `.env`
- Ensure database exists: `CREATE DATABASE airos_backend;`
- Test connection: `php artisan migrate:status`

#### Cache Issues
- Clear cache: `php artisan cache:clear`
- Clear config: `php artisan config:clear`
- Clear routes: `php artisan route:clear`

### Frontend Issues

#### API Not Loading
- Check `.env` has correct `VITE_API_BASE_URL`
- Restart dev server after `.env` changes
- Check browser console for errors

#### CORS Errors in Browser
- Verify backend CORS configuration
- Check backend is running
- Try clearing browser cache

#### Module Not Found Errors
- Run `npm install`
- Delete `node_modules` and reinstall
- Check import paths are correct

## 📊 Backend API Status

### ✅ Completed Features

**Core API:**
- ✅ RESTful API with consistent JSON responses
- ✅ All public endpoints implemented
- ✅ Authentication with Laravel Sanctum
- ✅ Rate limiting configured
- ✅ CORS configured for frontend

**Services:**
- ✅ ProjectService (filtering, pagination)
- ✅ BlogPostService (tag filtering)
- ✅ ContactService (reCAPTCHA, emails)
- ✅ StatsService (caching, CO2 calculation)
- ✅ CacheService (invalidation)

**Security:**
- ✅ CSRF protection
- ✅ Input validation
- ✅ Rate limiting (5/hour for contact, 60/min for API)
- ✅ Security headers (CSP, X-Frame-Options, etc.)
- ✅ SQL injection prevention
- ✅ XSS protection

**Caching:**
- ✅ Redis/Database caching configured
- ✅ Categories cached (1 hour)
- ✅ Tags cached (1 hour)
- ✅ Stats cached (15 minutes)
- ✅ Automatic cache invalidation

**Authentication:**
- ✅ Sanctum token authentication
- ✅ 30-minute token expiration
- ✅ Admin middleware
- ✅ Role-based authorization

### 📋 Pending Features (Optional)

**Admin Panel (Tasks 8):**
- ⏳ Blade templates for admin UI
- ⏳ CRUD interfaces for content management
- ⏳ Media upload interface

**File Storage (Task 10):**
- ⏳ Cloud storage configuration (S3/Spaces)
- ⏳ Media upload service
- ⏳ Image optimization

**Email (Task 11):**
- ⏳ Mailgun/SendGrid configuration
- ⏳ Email templates
- ⏳ Queue configuration

**Documentation (Task 13):**
- ⏳ API documentation (Postman/Swagger)
- ⏳ Endpoint examples

**Deployment (Task 14-15):**
- ⏳ Deployment scripts
- ⏳ Production configuration
- ⏳ Monitoring setup

## 🎯 Frontend Integration Status

### ✅ Completed

- ✅ API client (`src/lib/api.ts`)
- ✅ TypeScript type definitions
- ✅ Custom hooks (useStats, useProjects, useCategories)
- ✅ HeroSection integrated with real API data
- ✅ Error handling
- ✅ Loading states

### 📋 Next Steps

1. **Update Components:**
   - Projects page → use `useProjects()`
   - Solutions page → use `useCategories()`
   - About page → use team/partners hooks
   - Blog page → use blog posts hooks

2. **Create Contact Form:**
   - Implement reCAPTCHA
   - Use `api.submitContact()`
   - Success/error notifications

3. **Add Features:**
   - Pagination component
   - Search functionality
   - Filter dropdowns
   - Loading skeletons

## 🔐 Security Checklist

- ✅ CSRF protection enabled
- ✅ Input validation on all endpoints
- ✅ Rate limiting configured
- ✅ Security headers implemented
- ✅ SQL injection prevention (Eloquent ORM)
- ✅ XSS protection (Laravel escaping)
- ✅ Token-based authentication
- ✅ CORS properly configured
- ⏳ HTTPS in production
- ⏳ Environment variables secured

## 📈 Performance Checklist

- ✅ Database indexing on key columns
- ✅ Eager loading to prevent N+1 queries
- ✅ Response caching (categories, tags, stats)
- ✅ Automatic cache invalidation
- ✅ Pagination for large datasets
- ⏳ CDN for static assets
- ⏳ Image optimization
- ⏳ Database query optimization

## 🚀 Production Deployment

### Backend
1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false`
3. Configure production database
4. Set up Redis for caching
5. Configure mail service
6. Set up file storage (S3/Spaces)
7. Enable HTTPS
8. Set up monitoring (Sentry)
9. Configure backups

### Frontend
1. Update `VITE_API_BASE_URL` to production URL
2. Build: `npm run build`
3. Deploy `dist` folder to Vercel/Netlify
4. Configure environment variables
5. Set up custom domain
6. Enable HTTPS

## 📞 Support

If you encounter issues:
1. Check Laravel logs: `backend/storage/logs/laravel.log`
2. Check browser console for frontend errors
3. Verify API responses in Network tab
4. Test endpoints with curl/Postman
5. Clear all caches and restart servers

## ✨ Success Indicators

Your setup is working correctly when:ional)
n panel (optreate admi Cg
5.rinfiltech and 4. Add searorm
ct fontaement cPI
3. Implith Ants wnecomporate more egInte
2. to databas data Add sample steps:
1. 

Nextpment!develody for and reaonnected s fully cation ilic appur AI-ROSss, yoion steps paverificat all 

Oncedy!🎉 You're Rea

## gesend chanckes when ba updatb
- ✅ Datan Network tavisible iI calls le
- ✅ APn consoS errors i COR Nostats
- ✅real displays tion ec✅ HeroSt errors
- loads withouend 
- ✅ Frontrn dataoints retull API endpthy"
- ✅ Aalreturns "heeck health chBackend 
- ✅ 