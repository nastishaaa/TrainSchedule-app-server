🚆 Train Schedule App - Backend

This is the backend service for Train Schedule App, built with TypeScript, Express, and PostgreSQL. It provides API endpoints for managing trains, user authentication, and sessions.

🛠️ Features

User Authentication

Register, login, and logout users.

JWT-based access tokens with refresh tokens.

Train Management

CRUD operations for trains: create, read, update (PATCH), delete.

Sorting and filtering trains by departure time, stations, or price.

Sessions

Secure refresh tokens stored in cookies.

Auto-cleanup of expired sessions.

TypeScript

Fully typed controllers, services, and database queries.

Error Handling

Centralized middleware for 404 and general errors.

⚡ Tech Stack

Node.js + Express

TypeScript

PostgreSQL for database

pg for database queries

JWT for authentication

bcrypt for password hashing

nodemon & ts-node for development

📦 Installation

Clone the repository:

git clone https://github.com/yourusername/train-schedule-app-server.git
cd train-schedule-app-server

Install dependencies:

``bash
npm install

Create .env file in the root directory with the following variables:

POSTGRESQL_PASS=your_db_password
JWT_SECRET=your_jwt_secret

Start PostgreSQL and ensure the database trains_db exists.

🚀 Running the Server

Development mode (with live reload)

``bash
npm run dev

Build and run

``bash
npm run build
npm start

build compiles TypeScript into dist/ folder.

start runs the compiled JavaScript files.

Auth
Method Endpoint Description
POST /auth/register Register a new user
POST /auth/login Login a user
POST /auth/logout Logout a user
GET /auth/me Get current user info (Bearer)
Trains
Method Endpoint Description
GET /trains Get all trains
GET /trains/:id Get train by ID
POST /trains Create a new train
PATCH /trains/:id Update train info (admin only)
DELETE /trains/:id Delete train (admin only)

Note: PATCH and DELETE routes require authentication.

🔒 Authentication

Access tokens are sent via Authorization: Bearer <token> header.

Refresh tokens are stored as httpOnly cookies.

Tokens are required for protected routes like updating or deleting trains.

🧪 Testing

You can use Postman or Insomnia to test all endpoints. Include the Authorization header for protected routes:

Authorization: Bearer <accessToken>

✅ Notes

Passwords are hashed with bcrypt.

Sessions are cleaned on logout to prevent reuse of refresh tokens.

All responses are JSON and include status and message fields for clarity.

TypeScript enforces type safety for controllers and services.
