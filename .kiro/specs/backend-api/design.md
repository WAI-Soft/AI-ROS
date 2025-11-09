# Design Document

## Overview

The AI-ROS Backend API is a Laravel 11-based RESTful API system that serves as a headless CMS for the AI-ROS website. The system provides content management capabilities for projects, blog posts, team members, partners, and contact submissions. It exposes public API endpoints for the Next.js frontend and includes a custom admin panel for content managers.

The architecture follows a decoupled approach where the backend operates independently from the frontend, communicating exclusively through JSON-based REST APIs. This design enables flexibility, scalability, and the ability to support multiple frontend clients if needed in the future.

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                       │
│                    Hosted on Vercel                          │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS/JSON
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  Laravel Backend API                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Public     │  │    Admin     │  │     Auth     │     │
│  │   API        │  │    Panel     │  │   (Sanctum)  │     │
│  │  Endpoints   │  │              │  │              │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │              │
│  ┌──────▼──────────────────▼──────────────────▼───────┐    │
│  │           Application Layer (Controllers)           │    │
│  └──────┬──────────────────────────────────────────────┘    │
│         │                                                     │
│  ┌──────▼──────────────────────────────────────────────┐    │
│  │        Business Logic Layer (Services)              │    │
│  └──────┬──────────────────────────────────────────────┘    │
│         │                                                     │
│  ┌──────▼──────────────────────────────────────────────┐    │
│  │         Data Layer (Models & Repositories)          │    │
│  └──────┬──────────────────────────────────────────────┘    │
└─────────┼───────────────────────────────────────────────────┘
          │
┌─────────▼─────────────────────────────────────────────────┐
│                    MySQL 8.0 Database                      │
│                  (AWS RDS / DigitalOcean)                  │
└────────────────────────────────────────────────────────────┘

External Services:
├── AWS S3 / DigitalOcean Spaces (Media Storage)
├── Mailgun / SendGrid (Email Delivery)
├── Google reCAPTCHA (Spam Protection)
└── Redis (Caching & Sessions)
```

### Technology Stack

- **Framework**: Laravel 11 (PHP 8.2+)
- **Database**: MySQL 8.0
- **Authentication**: Laravel Sanctum (Token-based)
- **Caching**: Redis
- **File Storage**: AWS S3 or DigitalOcean Spaces
- **Email**: Mailgun or SendGrid
- **Web Server**: Nginx with PHP-FPM
- **Deployment**: AWS EC2 or DigitalOcean Droplet

### Architectural Patterns

1. **MVC Pattern**: Laravel's Model-View-Controller structure for organizing code
2. **Repository Pattern**: Abstraction layer between business logic and data access
3. **Service Layer**: Business logic encapsulated in service classes
4. **API Resource Pattern**: Consistent JSON transformation using Laravel API Resources
5. **Middleware Pattern**: Request filtering and authentication checks

## Components and Interfaces

### 1. API Controllers

#### ProjectController
Handles all project-related API requests.

**Methods:**
- `index()`: List projects with filtering and pagination
- `show($slug)`: Get single project by slug
- `incrementViewCount($slug)`: Increment project view counter

**Responsibilities:**
- Validate incoming requests
- Delegate business logic to ProjectService
- Return formatted JSON responses using ProjectResource

#### BlogPostController
Manages blog post API endpoints.

**Methods:**
- `index()`: List blog posts with filtering and pagination
- `show($slug)`: Get single blog post by slug
- `incrementViewCount($slug)`: Increment post view counter

#### ContactController
Handles contact form submissions.

**Methods:**
- `store(ContactRequest $request)`: Process contact form submission

**Responsibilities:**
- Validate form data including reCAPTCHA
- Generate unique reference ID
- Save submission to database
- Trigger email notifications
- Return success response with reference ID

#### CategoryController & TagController
Provide category and tag data for filtering.

**Methods:**
- `index()`: List all categories/tags with counts

#### TeamController & PartnerController
Serve team member and partner data.

**Methods:**
- `index()`: List all team members/partners ordered by display order

#### StatsController
Provides aggregated statistics for homepage.

**Methods:**
- `index()`: Return project count, CO2 saved, partner count, etc.

### 2. Admin Controllers

#### Admin\ProjectController
Full CRUD operations for projects in admin panel.

**Methods:**
- `index()`: List all projects (including drafts)
- `create()`: Show project creation form
- `store()`: Save new project
- `edit($id)`: Show project edit form
- `update($id)`: Update existing project
- `destroy($id)`: Delete project

#### Admin\BlogPostController
Blog post management for admin panel.

#### Admin\TeamMemberController
Team member management.

#### Admin\PartnerController
Partner logo management.

#### Admin\ContactSubmissionController
View and manage contact form submissions.

**Methods:**
- `index()`: List submissions with filtering
- `show($id)`: View submission details
- `updateStatus($id)`: Mark as resolved/in progress
- `export()`: Export submissions to CSV

### 3. Models

#### Project Model
```php
class Project extends Model
{
    protected $fillable = [
        'title', 'slug', 'excerpt', 'description', 
        'banner_image_url', 'client', 'year', 'location',
        'key_metrics', 'tech_stack', 'status', 'featured', 'view_count'
    ];
    
    protected $casts = [
        'key_metrics' => 'array',
        'tech_stack' => 'array',
        'featured' => 'boolean',
        'year' => 'integer'
    ];
    
    // Relationships
    public function categories(): BelongsToMany
    public function tags(): BelongsToMany
    public function media(): HasMany
}
```

#### BlogPost Model
```php
class BlogPost extends Model
{
    protected $fillable = [
        'author_id', 'title', 'slug', 'excerpt', 'content',
        'featured_image', 'reading_time', 'status', 
        'published_at', 'view_count'
    ];
    
    protected $casts = [
        'published_at' => 'datetime',
        'reading_time' => 'integer'
    ];
    
    // Relationships
    public function author(): BelongsTo
    public function tags(): BelongsToMany
}
```

#### ContactSubmission Model
```php
class ContactSubmission extends Model
{
    protected $fillable = [
        'name', 'company', 'email', 'subject', 'message',
        'reference_id', 'status', 'ip_address', 'user_agent'
    ];
}
```

### 4. Services

#### ProjectService
Encapsulates project business logic.

**Methods:**
- `getFilteredProjects($filters, $perPage)`: Apply filters and return paginated results
- `getProjectBySlug($slug)`: Retrieve project with relationships
- `incrementViewCount($projectId)`: Safely increment view counter
- `getFeaturedProjects($limit)`: Get featured projects for homepage

#### ContactService
Handles contact form processing.

**Methods:**
- `processSubmission($data)`: Validate, save, and send emails
- `generateReferenceId()`: Create unique reference ID (CNT-YYYYMMDD-XXXX)
- `verifyRecaptcha($token)`: Verify reCAPTCHA with Google API
- `sendConfirmationEmail($submission)`: Send email to user
- `sendNotificationEmail($submission)`: Notify sales team

#### StatsService
Calculates and caches statistics.

**Methods:**
- `getHomepageStats()`: Return aggregated statistics
- `calculateCO2Saved()`: Sum CO2 metrics from projects
- `refreshCache()`: Manually refresh cached statistics

### 5. API Resources

Transform models into consistent JSON responses.

#### ProjectResource
```php
class ProjectResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'description' => $this->description,
            'banner_image_url' => $this->banner_image_url,
            'client' => $this->client,
            'year' => $this->year,
            'location' => $this->location,
            'key_metrics' => $this->key_metrics,
            'tech_stack' => $this->tech_stack,
            'status' => $this->status,
            'featured' => $this->featured,
            'view_count' => $this->view_count,
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'media' => MediaResource::collection($this->whenLoaded('media')),
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
}
```

### 6. Middleware

#### RateLimitMiddleware
Custom rate limiting for different endpoint types.

**Configuration:**
- Public endpoints: 60 requests/minute per IP
- Contact form: 5 requests/hour per IP
- Admin endpoints: 100 requests/minute per authenticated user

#### AuthMiddleware
Validates Laravel Sanctum tokens for admin endpoints.

#### CorsMiddleware
Configures CORS headers for frontend domain.

## Data Models

### Database Schema

#### projects
```sql
CREATE TABLE projects (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    description LONGTEXT,
    banner_image_url VARCHAR(2048),
    client VARCHAR(255),
    year YEAR NOT NULL,
    location VARCHAR(255),
    key_metrics JSON,
    tech_stack JSON,
    status ENUM('published', 'draft') DEFAULT 'draft',
    featured BOOLEAN DEFAULT FALSE,
    view_count INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_year (year),
    INDEX idx_featured (featured)
);
```

#### categories
```sql
CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug)
);
```

#### tags
```sql
CREATE TABLE tags (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug)
);
```

#### project_category (Pivot)
```sql
CREATE TABLE project_category (
    project_id BIGINT UNSIGNED,
    category_id BIGINT UNSIGNED,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
```

#### project_tag (Pivot)
```sql
CREATE TABLE project_tag (
    project_id BIGINT UNSIGNED,
    tag_id BIGINT UNSIGNED,
    PRIMARY KEY (project_id, tag_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
```

#### media
```sql
CREATE TABLE media (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED,
    type ENUM('image', 'video') NOT NULL,
    url VARCHAR(2048) NOT NULL,
    caption TEXT,
    `order` INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    INDEX idx_project_id (project_id)
);
```

#### blog_posts
```sql
CREATE TABLE blog_posts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    author_id BIGINT UNSIGNED,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT,
    featured_image VARCHAR(2048),
    reading_time INT UNSIGNED,
    status ENUM('published', 'draft') DEFAULT 'draft',
    published_at TIMESTAMP NULL,
    view_count INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_published_at (published_at)
);
```

#### post_tag (Pivot)
```sql
CREATE TABLE post_tag (
    post_id BIGINT UNSIGNED,
    tag_id BIGINT UNSIGNED,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
```

#### users
```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'author') DEFAULT 'author',
    avatar VARCHAR(2048),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);
```

#### contact_submissions
```sql
CREATE TABLE contact_submissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    reference_id VARCHAR(20) NOT NULL UNIQUE,
    status ENUM('new', 'in_progress', 'resolved') DEFAULT 'new',
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_reference_id (reference_id),
    INDEX idx_status (status)
);
```

#### team_members
```sql
CREATE TABLE team_members (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    bio TEXT,
    avatar VARCHAR(2048),
    linkedin_url VARCHAR(2048),
    twitter_url VARCHAR(2048),
    `order` INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order (`order`)
);
```

#### partners
```sql
CREATE TABLE partners (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url VARCHAR(2048) NOT NULL,
    website_url VARCHAR(2048),
    `order` INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_order (`order`)
);
```

## Error Handling

### Error Response Format

All API errors follow a consistent JSON structure:

```json
{
    "success": false,
    "data": null,
    "message": "Error description",
    "errors": {
        "field_name": ["Validation error message"]
    }
}
```

### HTTP Status Codes

- **200 OK**: Successful GET request
- **201 Created**: Successful POST request (resource created)
- **400 Bad Request**: Invalid request format
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Authenticated but insufficient permissions
- **404 Not Found**: Resource does not exist
- **422 Unprocessable Entity**: Validation errors
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server-side error

### Exception Handling

Laravel's exception handler will be customized to:

1. Log all errors to application logs
2. Send critical errors to Sentry for monitoring
3. Return user-friendly error messages (hide sensitive details in production)
4. Handle specific exceptions (ModelNotFoundException, ValidationException, etc.)

### Validation

Use Laravel Form Requests for validation:

```php
class ContactRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'company' => 'nullable|string|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
            'recaptcha_token' => 'required|string'
        ];
    }
}
```

## Testing Strategy

### Unit Tests

Test individual components in isolation:

- Model methods and relationships
- Service class methods
- Helper functions
- Validation rules

**Example:**
```php
public function test_project_can_have_multiple_categories()
{
    $project = Project::factory()->create();
    $categories = Category::factory()->count(3)->create();
    
    $project->categories()->attach($categories);
    
    $this->assertCount(3, $project->categories);
}
```

### Integration Tests

Test API endpoints with database interactions:

- Test all public API endpoints
- Test authentication flows
- Test rate limiting
- Test error responses

**Example:**
```php
public function test_can_retrieve_published_projects()
{
    Project::factory()->count(5)->create(['status' => 'published']);
    Project::factory()->count(3)->create(['status' => 'draft']);
    
    $response = $this->getJson('/api/v1/projects');
    
    $response->assertStatus(200)
             ->assertJsonCount(5, 'data.data');
}
```

### Feature Tests

Test complete user workflows:

- Contact form submission end-to-end
- Project filtering and search
- Admin panel CRUD operations

**Target Coverage**: 70% code coverage for critical business logic

## Security Considerations

### Authentication & Authorization

- **Password Hashing**: bcrypt with cost factor 12
- **Token Management**: Laravel Sanctum with 30-minute expiration
- **Role-Based Access**: Middleware checks for admin/editor/author roles
- **Session Security**: HTTP-only cookies, secure flag in production

### Input Validation & Sanitization

- All user inputs validated using Laravel Form Requests
- HTML content sanitized using HTMLPurifier
- SQL injection prevented through Eloquent ORM
- XSS prevention through Laravel's automatic escaping

### Rate Limiting

Implemented at multiple levels:

1. **Global Rate Limit**: 60 requests/minute for public APIs
2. **Contact Form**: 5 requests/hour per IP
3. **Admin APIs**: 100 requests/minute per user
4. **Failed Login Attempts**: 5 attempts per 15 minutes

### CORS Configuration

```php
'allowed_origins' => [
    'https://ai-ros.com',
    'https://www.ai-ros.com',
    env('FRONTEND_URL')
],
'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE'],
'allowed_headers' => ['Content-Type', 'Authorization'],
'exposed_headers' => [],
'max_age' => 3600,
'supports_credentials' => true,
```

### Environment Variables

All sensitive configuration stored in `.env`:

```
APP_KEY=
DB_PASSWORD=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
MAIL_PASSWORD=
RECAPTCHA_SECRET_KEY=
```

## Performance Optimization

### Caching Strategy

1. **Query Result Caching**:
   - Categories and tags cached for 1 hour
   - Homepage stats cached for 15 minutes
   - Featured projects cached for 30 minutes

2. **Redis Configuration**:
   ```php
   Cache::remember('categories', 3600, function () {
       return Category::all();
   });
   ```

3. **Database Query Optimization**:
   - Eager loading relationships to prevent N+1 queries
   - Proper indexing on frequently queried columns
   - Use of database query caching

### Database Indexing

Key indexes for performance:

- `projects.slug` (unique index)
- `projects.status` (index)
- `projects.year` (index)
- `blog_posts.slug` (unique index)
- `blog_posts.published_at` (index)
- `contact_submissions.reference_id` (unique index)

### API Response Optimization

- Pagination for list endpoints (default 12 items per page)
- Selective field loading using API Resources
- Compression enabled (gzip)
- CDN for static assets and media

## Deployment Architecture

### Server Configuration

**Web Server**: Nginx
```nginx
server {
    listen 443 ssl http2;
    server_name api.ai-ros.com;
    
    root /var/www/ai-ros-api/public;
    index index.php;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
    }
}
```

### Environment Setup

- **Development**: Local with Docker or Laravel Sail
- **Staging**: DigitalOcean Droplet (4GB RAM)
- **Production**: AWS EC2 t3.medium or DigitalOcean Droplet (8GB RAM)

### CI/CD Pipeline

1. Push code to Git repository
2. Run automated tests (PHPUnit)
3. Run code quality checks (PHPStan, PHP CS Fixer)
4. Build and deploy to staging
5. Manual approval for production deployment
6. Zero-downtime deployment using symlinks

### Monitoring

- **Application Monitoring**: New Relic or Datadog
- **Error Tracking**: Sentry
- **Uptime Monitoring**: UptimeRobot
- **Log Management**: Papertrail or CloudWatch

## Admin Panel Design

### Technology

Custom admin panel built with:
- Laravel Blade templates
- Alpine.js for interactivity
- Tailwind CSS for styling
- Color theme: #8B4411, #AE6E4E, #CC9767, #F5F5DD, #C7AD7F, #A57A5A

### Key Features

1. **Dashboard**: Overview statistics and recent activity
2. **Projects Management**: Full CRUD with media upload
3. **Blog Management**: Rich text editor (TinyMCE)
4. **Contact Submissions**: View, filter, export
5. **User Management**: Admin user CRUD
6. **Settings**: Site configuration

### Authentication Flow

1. Login page with email/password
2. Generate Sanctum token on successful authentication
3. Store token in HTTP-only cookie
4. Validate token on each admin request
5. Auto-logout after 30 minutes of inactivity
