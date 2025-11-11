# AI-ROS Backend API

Laravel 11 backend API for the AI-ROS website.

## Requirements

- PHP 8.2+
- Composer
- MySQL 8.0
- Redis (for caching and sessions)

## Installation

1. Install dependencies:
```bash
composer install
```

2. Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

3. Update `.env` with your database credentials:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=airos_backend
DB_USERNAME=root
DB_PASSWORD=your_password
```

4. Run migrations:
```bash
php artisan migrate
```

5. Seed the database:
```bash
php artisan db:seed
```

## Development

Start the development server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

## API Documentation

Base URL: `http://localhost:8000/api/v1`

### Health Check
- **GET** `/health` - Check API status

## Testing

Run tests:
```bash
php artisan test
```

## Project Structure

```
app/
├── Http/
│   ├── Controllers/     # API Controllers
│   ├── Middleware/      # Custom Middleware
│   └── Resources/       # API Resources
├── Models/              # Eloquent Models
└── Services/            # Business Logic Services

database/
├── migrations/          # Database Migrations
└── seeders/            # Database Seeders

routes/
├── api.php             # API Routes
└── web.php             # Web Routes
```

## License

Proprietary - AI-ROS
