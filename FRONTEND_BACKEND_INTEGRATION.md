# Frontend-Backend Integration Guide

## Overview
This document describes the integration between the React frontend and Laravel backend API for the AI-ROS project.

## Backend API

### Base URL
- **Development**: `http://localhost:8000/api/v1`
- **Production**: Configure in `.env` file

### Available Endpoints

#### Public Endpoints
- `GET /health` - Health check
- `GET /projects` - List projects (with filtering: category, tag, year, search)
- `GET /projects/{slug}` - Get single project
- `GET /posts` - List blog posts (with filtering: tag, search)
- `GET /posts/{slug}` - Get single blog post
- `POST /contact` - Submit contact form (rate limited: 5/hour)
- `GET /categories` - List all categories
- `GET /tags` - List all tags
- `GET /team` - List team members
- `GET /partners` - List partners
- `GET /stats` - Get homepage statistics

#### Authentication Endpoints
- `POST /auth/login` - Admin login
- `POST /auth/logout` - Admin logout (protected)
- `GET /auth/me` - Get current user (protected)

## Frontend Integration

### Environment Variables
Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
```

### API Client (`src/lib/api.ts`)
Centralized API client using Axios with:
- Automatic token management
- Request/response interceptors
- TypeScript type definitions
- Error handling

### Custom Hooks

#### `useStats()`
Fetches homepage statistics from the API.

```typescript
import { useStats } from '@/hooks/useStats';

const { stats, loading, error } = useStats();
// stats: { total_projects, co2_saved, partner_count, years_experience }
```

#### `useProjects(params?)`
Fetches paginated projects with optional filtering.

```typescript
import { useProjects } from '@/hooks/useProjects';

const { projects, pagination, loading, error } = useProjects({
  category: 'smart-agriculture',
  per_page: 12,
  page: 1
});
```

#### `useProject(slug)`
Fetches a single project by slug.

```typescript
import { useProject } from '@/hooks/useProjects';

const { project, loading, error } = useProject('project-slug');
```

#### `useCategories()`
Fetches all categories.

```typescript
import { useCategories } from '@/hooks/useCategories';

const { categories, loading, error } = useCategories();
```

### Example Integration

The HeroSection component has been updated to use real API data:

```typescript
import { useStats } from '@/hooks/useStats';

const HeroSection = () => {
  const { stats, loading } = useStats();
  
  return (
    <div>
      <div>{loading ? '...' : stats?.total_projects}</div>
      <div>{loading ? '...' : stats?.co2_saved}</div>
      <div>{loading ? '...' : stats?.partner_count}</div>
    </div>
  );
};
```

## Starting the Application

### Backend (Laravel)
```bash
cd backend
php artisan serve
# API will be available at http://localhost:8000
```

### Frontend (React + Vite)
```bash
npm run dev
# Frontend will be available at http://localhost:5173
```

## CORS Configuration

The backend is configured to accept requests from the frontend domain. Update `backend/config/cors.php` if needed:

```php
'allowed_origins' => [
    'http://localhost:5173',
    'http://localhost:3000',
    env('FRONTEND_URL'),
],
```

## Next Steps

### To Complete Integration:

1. **Update More Components**:
   - Projects page to use `useProjects()`
   - Solutions page to use `useCategories()`
   - About page to use team/partners hooks
   - Blog page to use blog posts hooks

2. **Create Contact Form**:
   - Implement reCAPTCHA
   - Use `api.submitContact()` method
   - Handle success/error states

3. **Add Loading States**:
   - Skeleton loaders for data fetching
   - Error boundaries for error handling

4. **Implement Pagination**:
   - Use pagination data from API responses
   - Create pagination component

5. **Add Search & Filters**:
   - Category filter dropdown
   - Tag filter chips
   - Search input with debouncing

## API Response Format

All API responses follow this structure:

```typescript
{
  success: boolean;
  data: T;  // The actual data
  message: string;
  errors: any;  // Validation errors if any
}
```

## Error Handling

The API client automatically handles:
- 401 Unauthorized - Clears token and redirects
- Network errors
- Validation errors (422)
- Server errors (500)

## Security Features

- **Rate Limiting**: Contact form limited to 5 requests/hour
- **CORS**: Configured for frontend domain
- **CSRF Protection**: Enabled for admin panel
- **Token Authentication**: Sanctum tokens with 30-minute expiration
- **Security Headers**: X-Frame-Options, CSP, etc.

## Caching

The backend implements caching for:
- Categories: 1 hour
- Tags: 1 hour
- Stats: 15 minutes

Cache is automatically invalidated when data changes.

## Testing the Integration

1. Start both backend and frontend servers
2. Open browser to `http://localhost:5173`
3. Check browser console for API calls
4. Verify data is loading from backend
5. Test error states by stopping backend

## Troubleshooting

### CORS Errors
- Ensure backend CORS is configured correctly
- Check `withCredentials: true` in API client
- Verify frontend URL in backend CORS config

### 404 Errors
- Verify backend is running on correct port
- Check `VITE_API_BASE_URL` in `.env`
- Ensure API routes are registered

### Authentication Issues
- Check token is stored in localStorage
- Verify Sanctum configuration
- Check middleware is applied correctly

## Production Deployment

### Backend
1. Set `APP_ENV=production` in `.env`
2. Configure database credentials
3. Set up Redis for caching
4. Configure mail service (Mailgun/SendGrid)
5. Set up file storage (S3/Spaces)
6. Enable HTTPS

### Frontend
1. Update `VITE_API_BASE_URL` to production API URL
2. Build: `npm run build`
3. Deploy `dist` folder to hosting (Vercel/Netlify)
4. Configure environment variables on hosting platform

## Support

For issues or questions:
- Check Laravel logs: `backend/storage/logs/laravel.log`
- Check browser console for frontend errors
- Verify API responses in Network tab
