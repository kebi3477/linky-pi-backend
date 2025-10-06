# LinkyPi Backend

A NestJS-based REST API for link sharing and management platform.

## Features

- 🔐 JWT Authentication
- 👤 User Management
- 🔗 Link Blocks Management
- 📁 Block Groups
- ❤️ Likes System
- 👥 Followers System
- 📚 Swagger API Documentation
- 🗄️ PostgreSQL Database

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 12+ (or use Docker)
- npm 10+

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
# Update database credentials if needed
```

### Database Setup

**Option 1: Using Docker (Recommended)**
```bash
# Start PostgreSQL container
docker-compose up -d

# Database will be available at localhost:5432
```

**Option 2: Local PostgreSQL**
```bash
# Create database
psql -U postgres
CREATE DATABASE linkypi;
\q
```

### Running the Application

```bash
# Development mode (with auto-reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The server will start at:
- **API:** http://localhost:3000/api
- **API Docs:** http://localhost:3000/api/docs

## API Documentation

Once the server is running, visit http://localhost:3000/api/docs for interactive API documentation powered by Swagger.

## Project Structure

```
linky-pi/
├── src/
│   ├── entities/          # Database entities
│   ├── modules/           # Feature modules
│   ├── dto/               # Data transfer objects
│   ├── common/            # Shared utilities
│   ├── config/            # Configuration files
│   ├── app.module.ts
│   └── main.ts
├── .env                   # Environment variables (create from .env.example)
└── docker-compose.yml     # PostgreSQL container
```

## Available Scripts

```bash
npm run start          # Start application
npm run start:dev      # Start in development mode
npm run start:prod     # Start in production mode
npm run build          # Build application
npm run test           # Run tests
npm run test:e2e       # Run e2e tests
npm run test:cov       # Test coverage
npm run lint           # Lint code
npm run format         # Format code
```

## Environment Variables

See `.env.example` for all available environment variables.

Key variables:
- `DB_*`: Database configuration
- `JWT_*`: JWT authentication secrets
- `PORT`: Server port (default: 3000)

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile (protected)

### Users
- `POST /api/users` - Create user
- `GET /api/users/me` - Get current user
- `GET /api/users/:id` - Get user
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Blocks
- `POST /api/blocks` - Create block
- `GET /api/blocks` - Get all blocks
- `GET /api/blocks/search?q=query` - Search blocks
- `GET /api/blocks/:id` - Get block
- `PATCH /api/blocks/:id` - Update block
- `DELETE /api/blocks/:id` - Delete block

### Groups
- `POST /api/groups` - Create group
- `GET /api/groups` - Get all groups
- `GET /api/groups/:id` - Get group
- `PATCH /api/groups/:id` - Update group
- `DELETE /api/groups/:id` - Delete group

### Likes & Followers
- `POST /api/blocks/:id/like` - Like block
- `DELETE /api/blocks/:id/like` - Unlike block
- `POST /api/groups/:id/follow` - Follow group
- `DELETE /api/groups/:id/follow` - Unfollow group

## Database Schema

See [DB.md](../DB.md) for complete database schema documentation.

## Development Context

See [CLAUDE.md](CLAUDE.md) for detailed project context and development guidelines.

## Contributing

1. Follow NestJS best practices
2. Add Swagger documentation for new endpoints
3. Write tests for new features
4. Follow existing code structure

## License

MIT
