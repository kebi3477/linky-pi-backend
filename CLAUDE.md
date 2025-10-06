# LinkyPi Backend - Project Context

## Project Overview
**Project Name:** LinkyPi Backend
**Framework:** NestJS (Node.js)
**Database:** PostgreSQL
**ORM:** TypeORM
**API Documentation:** Swagger/OpenAPI

LinkyPi is a link sharing and management platform where users can create blocks (links), organize them into groups, like blocks, and follow groups.

---

## Tech Stack

### Core
- **NestJS** v11.x - Progressive Node.js framework
- **TypeScript** - Type-safe development
- **PostgreSQL** - Primary database
- **TypeORM** v0.3.x - ORM for database operations

### Authentication & Security
- **Passport** - Authentication middleware
- **JWT (passport-jwt)** - Token-based authentication
- **bcrypt** - Password hashing

### Validation & Documentation
- **class-validator** - DTO validation
- **class-transformer** - Data transformation
- **Swagger/OpenAPI** - API documentation

---

## Database Schema

### Tables

#### 1. **users**
- `id` (string, PK) - User identifier
- `image` (string) - Profile image URL
- `type` (enum) - User type: regular/premium/admin
- `provider` (enum) - Auth provider: local/google/github
- `describe` (string) - User bio/description
- `created_at`, `updated_at`, `deleted_at` (timestamps)

#### 2. **blocks**
- `id` (uuid, PK) - Block identifier
- `title` (string) - Block title
- `subtitle` (text) - Block subtitle
- `content` (text) - Block content
- `hashtag` (text) - Associated hashtags
- `link` (text) - URL link
- `user_id` (string, FK → users.id) - Owner
- `group_id` (uuid, FK → block_groups.id) - Associated group
- `created_at`, `updated_at` (timestamps)

#### 3. **block_groups**
- `id` (uuid, PK) - Group identifier
- `title` (string) - Group title
- `user_id` (string, FK → users.id) - Owner
- `created_at`, `updated_at` (timestamps)

#### 4. **user_likes_block**
- `id` (int, PK) - Like identifier
- `user_id` (string, FK → users.id)
- `block_id` (uuid, FK → blocks.id)
- `created_at` (timestamp)

#### 5. **followers**
- `id` (int, PK) - Follow relationship identifier
- `user_id` (string, FK → users.id) - Follower
- `group_id` (uuid, FK → block_groups.id) - Followed group
- `created_at` (timestamp)

---

## Project Structure

```
linky-pi/
├── src/
│   ├── entities/              # TypeORM entities
│   │   ├── user.entity.ts
│   │   ├── block.entity.ts
│   │   ├── block-group.entity.ts
│   │   ├── user-likes-block.entity.ts
│   │   └── follower.entity.ts
│   ├── dto/                   # Data Transfer Objects
│   │   ├── users/
│   │   ├── blocks/
│   │   ├── block-groups/
│   │   ├── likes/
│   │   └── followers/
│   ├── modules/               # Feature modules
│   │   ├── auth/
│   │   ├── users/
│   │   ├── blocks/
│   │   ├── block-groups/
│   │   ├── likes/
│   │   └── followers/
│   ├── common/                # Shared utilities
│   │   ├── guards/           # Auth guards
│   │   ├── decorators/       # Custom decorators
│   │   ├── filters/          # Exception filters
│   │   └── interceptors/     # Interceptors
│   ├── config/                # Configuration files
│   │   ├── database.config.ts
│   │   └── jwt.config.ts
│   ├── app.module.ts
│   └── main.ts
├── .env                       # Environment variables (not in git)
├── .env.example              # Example environment variables
└── package.json
```

---

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (protected)

### Users (`/api/users`)
- `POST /api/users` - Create user
- `GET /api/users/me` - Get current user (protected)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Soft delete user (protected)
- `GET /api/users/:id/blocks` - Get user's blocks
- `GET /api/users/:id/groups` - Get user's groups

### Blocks (`/api/blocks`)
- `POST /api/blocks` - Create block (protected)
- `GET /api/blocks` - Get all blocks (paginated)
- `GET /api/blocks/search?q=query` - Search blocks
- `GET /api/blocks/:id` - Get block by ID
- `GET /api/blocks/:id/likes` - Get block likes count
- `PATCH /api/blocks/:id` - Update block (protected)
- `DELETE /api/blocks/:id` - Delete block (protected)

### Groups (`/api/groups`)
- `POST /api/groups` - Create group (protected)
- `GET /api/groups` - Get all groups (paginated)
- `GET /api/groups/:id` - Get group by ID
- `GET /api/groups/:id/blocks` - Get group's blocks
- `GET /api/groups/:id/followers` - Get group followers
- `PATCH /api/groups/:id` - Update group (protected)
- `DELETE /api/groups/:id` - Delete group (protected)

### Likes
- `POST /api/blocks/:blockId/like` - Like a block (protected)
- `DELETE /api/blocks/:blockId/like` - Unlike a block (protected)
- `GET /api/users/me/likes` - Get user's liked blocks (protected)

### Followers
- `POST /api/groups/:groupId/follow` - Follow a group (protected)
- `DELETE /api/groups/:groupId/follow` - Unfollow a group (protected)
- `GET /api/users/me/following` - Get user's followed groups (protected)
- `GET /api/groups/:groupId/followers-count` - Get follower count

---

## Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=linkypi

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=1d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRATION=7d

# App
PORT=3000
NODE_ENV=development
API_PREFIX=api
```

---

## Getting Started

### Prerequisites
- Node.js v20.x
- PostgreSQL 12+
- npm 10.x

### Installation
```bash
cd linky-pi
npm install
```

### Database Setup
1. Create PostgreSQL database:
```sql
CREATE DATABASE linkypi;
```

2. Configure `.env` file with database credentials

3. Run the application (TypeORM will auto-sync in development):
```bash
npm run start:dev
```

### Running the Application
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

### Access Points
- **API:** http://localhost:3000/api
- **API Documentation:** http://localhost:3000/api/docs

---

## Key Features

### Authentication
- JWT-based authentication
- Bearer token authorization
- Protected routes with `@UseGuards(JwtAuthGuard)`

### Validation
- Global validation pipe with class-validator
- DTOs for all request bodies
- Automatic request transformation

### Error Handling
- Global exception filter
- Standardized error responses
- HTTP status codes

### Documentation
- Swagger/OpenAPI documentation
- Interactive API explorer
- Request/response schemas

### Database
- Soft delete for users (deleted_at)
- Cascade deletes for relationships
- Automatic timestamps
- UUID for blocks and groups

---

## Important Notes

### Security
- **JWT Secrets:** Must be changed in production
- **CORS:** Currently open, should be configured for production

### Database
- **Auto-sync:** Enabled in development (`synchronize: true`)
- **Production:** Use migrations instead of auto-sync
- **Soft Deletes:** Users use `deleted_at` for soft deletion

### Pagination
- Default: page=1, limit=10
- Blocks and Groups support pagination
- Query params: `?page=1&limit=20`

### Relations
- Users can have multiple blocks and groups
- Blocks belong to one user and one group (optional)
- Users can like multiple blocks
- Users can follow multiple groups

---

## Development Guidelines

### Adding New Features
1. Create entity in `src/entities/`
2. Create DTOs in `src/dto/`
3. Create module with service and controller in `src/modules/`
4. Register module in `app.module.ts`
5. Add Swagger documentation tags

### File Naming Convention
- Entities: `*.entity.ts`
- DTOs: `create-*.dto.ts`, `update-*.dto.ts`
- Services: `*.service.ts`
- Controllers: `*.controller.ts`
- Modules: `*.module.ts`

### Code Style
- Use TypeScript strict mode
- Follow NestJS best practices
- Use dependency injection
- Implement proper error handling
- Add API documentation with Swagger decorators

---

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## Next Steps / TODO

See [TODO.md](TODO.md) for detailed development roadmap including:
- OAuth provider implementation
- Rate limiting
- Caching layer (Redis)
- Performance optimization
- Security enhancements
- Testing suite
- Deployment configuration

---

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists

### Port Already in Use
- Change `PORT` in `.env`
- Or kill process using port 3000

### Module Not Found Errors
- Run `npm install`
- Check import paths

---

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Swagger Documentation](https://swagger.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
