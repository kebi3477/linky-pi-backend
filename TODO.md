# LinkyPi Backend API Development TODO

## Project Setup
- [x] Initialize NestJS project ✅
- [x] Install dependencies (TypeORM, PostgreSQL, Passport, etc.) ✅
- [x] Configure environment variables (.env) ✅
- [x] Set up database connection ✅
- [x] Configure TypeORM with entities ✅
- [ ] Set up migration system

---

## Database & Entities
- [x] Create User entity ✅
- [x] Create Block entity ✅
- [x] Create BlockGroup entity ✅
- [x] Create UserLikesBlock entity ✅
- [x] Create Follower entity ✅
- [ ] Generate and run initial migrations
- [ ] Set up seeders for development data

---

## Authentication & Authorization
- [x] Implement JWT authentication strategy ✅
- [x] Create Auth module and service ✅
- [ ] Implement OAuth providers (Google, GitHub, etc.)
- [x] Create AuthGuard for protected routes ✅
- [ ] Create RoleGuard for role-based access
- [ ] Implement refresh token mechanism
- [ ] Add rate limiting for auth endpoints

---

## User API
- [x] POST /api/users - Create user (sign up) ✅
- [x] GET /api/users/:id - Get user by ID ✅
- [x] GET /api/users/me - Get current user profile ✅
- [x] PATCH /api/users/:id - Update user profile ✅
- [x] DELETE /api/users/:id - Soft delete user ✅
- [x] GET /api/users/:id/blocks - Get user's blocks ✅
- [x] GET /api/users/:id/groups - Get user's groups ✅

---

## Block (Links) API
- [x] POST /api/blocks - Create new block ✅
- [x] GET /api/blocks - Get all blocks (with pagination) ✅
- [x] GET /api/blocks/:id - Get block by ID ✅
- [x] PATCH /api/blocks/:id - Update block ✅
- [x] DELETE /api/blocks/:id - Delete block ✅
- [x] GET /api/blocks/search - Search blocks by hashtag/title ✅
- [x] GET /api/blocks/:id/likes - Get block likes count ✅

---

## Block Groups API
- [x] POST /api/groups - Create new group ✅
- [x] GET /api/groups - Get all groups (with pagination) ✅
- [x] GET /api/groups/:id - Get group by ID ✅
- [x] PATCH /api/groups/:id - Update group ✅
- [x] DELETE /api/groups/:id - Delete group ✅
- [x] GET /api/groups/:id/blocks - Get all blocks in group ✅
- [x] GET /api/groups/:id/followers - Get group followers ✅

---

## Likes API
- [x] POST /api/blocks/:id/like - Like a block ✅
- [x] DELETE /api/blocks/:id/like - Unlike a block ✅
- [x] GET /api/users/me/likes - Get current user's liked blocks ✅

---

## Followers API
- [x] POST /api/groups/:id/follow - Follow a group ✅
- [x] DELETE /api/groups/:id/follow - Unfollow a group ✅
- [x] GET /api/users/me/following - Get groups current user follows ✅
- [x] GET /api/groups/:id/followers-count - Get follower count ✅

---

## Validation & DTOs
- [x] Create CreateUserDto ✅
- [x] Create UpdateUserDto ✅
- [x] Create CreateBlockDto ✅
- [x] Create UpdateBlockDto ✅
- [x] Create CreateBlockGroupDto ✅
- [x] Create UpdateBlockGroupDto ✅
- [x] Add class-validator decorators ✅
- [x] Implement ValidationPipe globally ✅

---

## Error Handling & Logging
- [x] Create custom exception filters ✅
- [x] Implement global error handler ✅
- [ ] Set up Winston/Pino for logging
- [ ] Add request/response logging interceptor
- [ ] Create error response DTOs

---

## Testing
- [x] Set up Jest configuration ✅ (comes with NestJS)
- [ ] Write unit tests for services
- [ ] Write unit tests for controllers
- [ ] Write e2e tests for auth flow
- [ ] Write e2e tests for CRUD operations
- [ ] Set up test database

---

## Documentation
- [x] Set up Swagger/OpenAPI ✅
- [x] Document all API endpoints ✅
- [x] Add request/response examples ✅
- [x] Create API usage guide ✅ (README.md)
- [x] Document authentication flow ✅

---

## Performance & Optimization
- [ ] Add caching layer (Redis)
- [ ] Implement query optimization
- [ ] Add database indexes
- [x] Implement pagination helpers ✅
- [ ] Add response compression

---

## Security
- [x] Implement CORS configuration ✅
- [ ] Add helmet for security headers
- [ ] Implement CSRF protection
- [x] Add input sanitization ✅ (via ValidationPipe)
- [x] Set up SQL injection prevention ✅ (via TypeORM)
- [ ] Implement XSS protection

---

## Deployment
- [ ] Create Dockerfile
- [x] Create docker-compose.yml ✅ (for PostgreSQL)
- [ ] Set up CI/CD pipeline
- [ ] Configure production environment
- [ ] Set up database backups
- [ ] Configure monitoring and alerts
