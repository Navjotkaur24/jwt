# Task 36: Authentication with JWT

A full-stack app with user registration, login, and a protected route using JSON Web Tokens (JWT).

## Tech Stack
- Backend: Node.js, Express.js, jsonwebtoken, bcryptjs
- Frontend: React (Vite), react-router-dom

## Backend Routes
- POST /register: saves a new user (username and hashed password) in an array
- POST /login: checks the credentials and returns a JWT
- GET /protected: only works with a valid JWT in the header `Authorization: Bearer <token>`

## Frontend Features
- Register and Login forms
- JWT saved in local storage after login
- Protected page that calls /protected using the stored JWT
- Logout button, and redirect to login if there is no token

## Run Locally
Backend:
1. cd backend
2. npm install
3. Create a `.env` file with PORT=5000 and JWT_SECRET=your_secret_text
4. npm run dev

Frontend:
1. cd frontend
2. npm install
3. Create a `.env` file with VITE_API_URL=http://localhost:5000
4. npm run dev

## Note
Users are stored in an in-memory array, so they are cleared whenever the server restarts.

## Live Link
Frontend: (add your Netlify link here)
Backend: (add your Render link here)