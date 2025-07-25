# Laravel React User Management

A user management system built with Laravel 8 backend and React 17 frontend.

## Prerequisites

- Docker (for Laravel Sail)
- Node.js (v16+) and npm/yarn
- PHP 7.3+ (for local development without Docker)
- Composer

## Project Structure

- `/backend` - Laravel 8 API with Spatie Permissions
- `/frontend` - React 17 with Redux Toolkit, React Router, and TailwindCSS

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Copy the environment file:
   ```
   cp .env.example .env
   ```

3. Configure your `.env` file with database credentials

4. Start Laravel Sail:
   ```
   ./vendor/bin/sail up -d
   ```

5. Install dependencies:
   ```
   ./vendor/bin/sail composer install
   ```

6. Generate application key:
   ```
   ./vendor/bin/sail artisan key:generate
   ```

7. Run migrations and seeders:
   ```
   ./vendor/bin/sail artisan migrate --seed
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create environment files:

   `.env` or `.env.development`:
   ```
   VITE_API_URL=http://localhost:8080
   VITE_DEBUG=true
   ```

   `.env.production`:
   ```
   VITE_API_URL=https://your-production-api.com
   VITE_DEBUG=false
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Environment Variables

### Backend (.env)

- `DB_CONNECTION`: Database connection type (mysql, pgsql)
- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_DATABASE`: Database name
- `DB_USERNAME`: Database user
- `DB_PASSWORD`: Database password
- `APP_URL`: Backend application URL

### Frontend (.env, .env.development, .env.production)

- `VITE_API_URL`: Backend API URL
- `VITE_DEBUG`: Enable debug mode (true/false)

## Running the Application

- Backend API: `http://localhost:8080`
- Frontend: `http://localhost:5173`

## Features

- User management (create, list)
- Role-based filtering
- Redux state management
- Form validation with backend error handling
