# Getting Started with LinkyPi Backend

This guide will help you set up and run the LinkyPi backend API on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** v20.11.1 or higher
- **npm** v10.5.0 or higher
- **Docker** (optional, for easy PostgreSQL setup)
- **PostgreSQL** 12+ (if not using Docker)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

The `.env` file is already created. Review and update if needed:

```bash
# Open .env file
nano .env

# Or use your preferred editor
code .env
```

Key environment variables:
- `DB_*`: Database configuration (default works with Docker setup)
- `JWT_SECRET`: Change this in production!
- `PORT`: API server port (default: 3000)

### 3. Start PostgreSQL Database

**Option A: Using Docker (Recommended)**

```bash
# Start PostgreSQL container
docker-compose up -d

# Check if container is running
docker ps

# View logs
docker-compose logs -f postgres
```

The database will be available at `localhost:5432` with:
- Database: `linkypi`
- Username: `postgres`
- Password: `postgres`

**Option B: Local PostgreSQL**

If you have PostgreSQL installed locally:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE linkypi;

# Exit
\q
```

### 4. Start the Application

```bash
# Development mode (with hot reload)
npm run start:dev
```

You should see output like:
```
🚀 Application is running on: http://localhost:3000
📚 API Documentation: http://localhost:3000/api/docs
```

### 5. Test the API

#### Using Swagger UI (Recommended)

Open your browser and navigate to:
```
http://localhost:3000/api/docs
```

This provides an interactive API explorer where you can test all endpoints.

#### Using curl

```bash
# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"id": "user123", "describe": "Test user"}'

# Get user
curl http://localhost:3000/api/users/user123
```

## Common Commands

```bash
# Start development server
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod

# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Lint code
npm run lint

# Format code
npm run format
```

## Database Management

### View Database Tables

```bash
# Connect to Docker PostgreSQL
docker exec -it linkypi-postgres psql -U postgres -d linkypi

# List tables
\dt

# Describe a table
\d users

# View data
SELECT * FROM users;

# Exit
\q
```

### Reset Database

If you need to reset the database:

```bash
# Stop and remove containers with volumes
docker-compose down -v

# Start fresh
docker-compose up -d

# Restart the application
npm run start:dev
```

## API Authentication

Most endpoints require JWT authentication. Here's the flow:

### 1. Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"id": "testuser", "describe": "My test user"}'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"id": "testuser"}'
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {...}
}
```

### 3. Use Token for Protected Endpoints
```bash
# Replace YOUR_TOKEN with the access_token from step 2
curl http://localhost:3000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Project Structure Overview

```
linky-pi/
├── src/
│   ├── entities/              # Database models (TypeORM)
│   │   ├── user.entity.ts
│   │   ├── block.entity.ts
│   │   ├── block-group.entity.ts
│   │   ├── user-likes-block.entity.ts
│   │   └── follower.entity.ts
│   ├── modules/               # Feature modules
│   │   ├── auth/             # Authentication
│   │   ├── users/            # User management
│   │   ├── blocks/           # Link blocks
│   │   ├── block-groups/     # Groups
│   │   ├── likes/            # Like system
│   │   └── followers/        # Follow system
│   ├── dto/                   # Data validation
│   ├── common/                # Shared code
│   │   ├── guards/           # Auth guards
│   │   ├── decorators/       # Custom decorators
│   │   └── filters/          # Exception filters
│   ├── config/                # Configuration
│   ├── app.module.ts         # Root module
│   └── main.ts               # Entry point
├── .env                       # Environment variables
├── docker-compose.yml        # PostgreSQL container
└── package.json              # Dependencies
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Change PORT in .env
echo "PORT=3001" >> .env

# Or find and kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Connection Error

Check that PostgreSQL is running:

```bash
# For Docker
docker ps | grep postgres

# If not running, start it
docker-compose up -d
```

Verify connection details in `.env` match your database.

### Module Not Found Errors

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Build Errors

```bash
# Clean build
rm -rf dist
npm run build
```

## Next Steps

1. **Explore the API**: Use Swagger UI at `/api/docs`
2. **Read Documentation**: Check [CLAUDE.md](CLAUDE.md) for detailed project info
3. **Review TODO**: See [TODO.md](../TODO.md) for remaining tasks
4. **Check Database Design**: See [DB.md](../DB.md) for schema details

## Development Workflow

1. Start the database: `docker-compose up -d`
2. Start the dev server: `npm run start:dev`
3. Make changes to code (auto-reloads)
4. Test via Swagger UI: http://localhost:3000/api/docs
5. Commit changes when satisfied

## Production Deployment

Before deploying to production:

1. Change `JWT_SECRET` in `.env`
2. Set `NODE_ENV=production`
3. Disable `synchronize` in TypeORM (use migrations)
4. Set up proper PostgreSQL instance
5. Configure HTTPS
6. Set up monitoring

## Need Help?

- Check [CLAUDE.md](CLAUDE.md) for project context
- Review [README.md](README.md) for API documentation
- See [TODO.md](../TODO.md) for feature roadmap
- Check [DB.md](../DB.md) for database schema

Happy coding! 🚀
