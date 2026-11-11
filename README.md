# Inventory App

A full-stack inventory application with a React frontend and an Express API.

## Project structure

```
inventory-app/
├── client/              # React + Vite frontend
│   ├── public/          # Static assets served as-is
│   └── src/             # Application source
└── server/              # Express API
    ├── controllers/     # Request handlers
    ├── db/              # Database connection and queries
    ├── models/          # Data models
    ├── routes/          # API route definitions
    ├── index.js         # Server entry point
    └── .env.example     # Example environment variables
```

## Requirements

- Node.js 20.19 or newer
- npm 10 or newer
- PostgreSQL (once the database layer is implemented)

## Setup

Install dependencies for each package:

```bash
cd client && npm install
cd ../server && npm install
```

Create the server environment file:

```bash
cp server/.env.example server/.env
```

Update `server/.env` with your local database connection string.

## Development

Run the API server:

```bash
cd server
npm run dev
```

Run the frontend in a separate terminal:

```bash
cd client
npm run dev
```

The API listens on `http://localhost:3001` by default, and Vite serves the
frontend on `http://localhost:5173`.

## Scripts

### Client

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the production bundle |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run oxlint |

### Server

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API with nodemon |
| `npm start` | Start the API with Node |

## Health check

```bash
curl http://localhost:3001/api/health
```

Expected response:

```json
{ "status": "ok" }
```
