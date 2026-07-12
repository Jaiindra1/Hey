# Traffic Command Centre

Traffic Command Centre is a full-stack prototype for monitoring and coordinating urban traffic. It presents city-level traffic conditions in a single dashboard and provides a small REST API for city data, emergency-unit information, and rule-based rerouting recommendations.

> **Project status:** This is a demonstration application. The traffic values are seeded sample data, the administrator form is a UI-only prototype, and emergency controls do not operate real-world traffic infrastructure.

## Features

- City dashboard with flow index, zone efficiency, network summary, and control feed
- Searchable traffic-map view for city zones
- Short-term load predictions and detected anomalies
- Emergency-priority mode for a selected city
- City selector with seeded data for Bangalore, Hyderabad, and Shanghai
- REST endpoints for cities, emergency units, and persisted routing plans
- Explainable, rule-based rerouting recommendations stored in SQLite

## Technology

| Area | Tools |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS, Lucide icons |
| Backend | Node.js, Express |
| Data | SQLite (`node:sqlite`) |
| Configuration | dotenv |

## Project structure

```text
Hey/
├── Frontend/                 # React single-page application
│   ├── src/components/       # Dashboard and interface views
│   ├── src/api.js            # API client
│   └── server.js             # Starts the local API on port 3001
└── Backend/                  # Express API and database code
    ├── routes/               # City and emergency-unit endpoints
    ├── services/             # Routing-plan logic
    ├── database.js           # SQLite schema
    └── seed.js               # Initial sample data
```

## Getting started

### Prerequisites

- Node.js 22.5 or later (the backend uses the built-in `node:sqlite` module)
- npm

### Installation

Install dependencies for both parts of the project:

```bash
cd Frontend
npm install

cd ../Backend
npm install
```

### Run locally

Open two terminals from the project folder.

**Terminal 1 — start the API**

```bash
cd Frontend
npm run server
```

The API starts at `http://localhost:3001` and creates/seeds a `traffic-control.db` file in the working directory when needed.

**Terminal 2 — start the frontend**

```bash
cd Frontend
npm run dev
```

Open the URL shown by Vite (normally `http://localhost:3000`) in your browser.

## Environment configuration

The frontend API client defaults to `http://localhost:3001/api`. To use a different API location, create `Frontend/.env.local`:

```env
VITE_API_URL=http://localhost:3001/api
```

Do not commit API keys or other secrets. The current dashboard does not require a Gemini or Google Maps key to run.

## API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Returns API health status |
| GET | `/api/cities` | Returns all seeded cities |
| GET | `/api/cities/:id` | Returns one city |
| GET | `/api/cities/:id/routing-plan` | Creates or returns a saved routing recommendation |
| POST | `/api/cities/:id/routing-plan/activate` | Marks an existing routing plan as active |
| GET | `/api/emergency-units/:id` | Returns an emergency-unit record |

Example request:

```bash
curl http://localhost:3001/api/cities/bangalore/routing-plan
```

## How routing recommendations work

The backend selects the busiest zone as the restricted route, chooses up to two flowing zones as alternatives, and assigns them a 60/40 traffic allocation. If a high-impact anomaly exists, it becomes the plan trigger. The generated plan also includes a proposed temporary lane-direction action that requires field verification and controller approval.

## Future improvements

- Connect to live traffic sensors or a validated traffic-data provider
- Add production authentication and role-based access control
- Add tests, audit logs, and real-time updates
- Replace the prototype map cards with an interactive map integration
- Add validation and authorization to routing-plan activation
