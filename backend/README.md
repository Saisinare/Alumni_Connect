# Alumni Platform Backend

Simple Express backend providing authentication for student, alumni, and admin.

## Setup

1. Create a `.env` file (see `.env.example`) with:

```
PORT=4000
JWT_SECRET=change_me_in_production
JWT_EXPIRES_IN=7d
```

2. Install dependencies and run:

```
npm install
npm run dev
```

Server runs at http://localhost:4000

## Endpoints

Base: `/api/auth`

- POST `/register` body: `{ name, email, password, role }`
- POST `/login` body: `{ email, password, role }`
- Role shortcuts:
  - POST `/student/register`, POST `/student/login`
  - POST `/alumni/register`, POST `/alumni/login`
  - POST `/admin/register`, POST `/admin/login`
- GET `/me` (requires `Authorization: Bearer <token>`) returns authenticated user
- Health: GET `/api/health`

## Notes

- Uses an in-memory user store for demo only. Replace with a real database for production.


