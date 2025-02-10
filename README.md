# HSL Nearby Bus Stops Finder

This project leverages the HSL API to retrieve bus stops based on a specified location, assisting users in finding nearby HSL bus stops in Helsinki, Vantaa, and Espoo. It is developed using React, TypeScript, and Leaflet maps.

## Features

- Interactive map to find bus stops
- Real-time location-based search
- Distance-based filtering
- Sort bus stop from closest to farthest
- Reverse geocoding for address lookup

## Tech Stack

- React 19
- TypeScript
- GraphQL
- Vite
- Leaflet/React-Leaflet
- SASS Modules
- Vitest for testing
- ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/thamanchand/hsl-api-task.git
cd hsl-api-task
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add your HSL API key:

```bash
VITE_HSL_API_KEY=your_api_key_here
```

### Development

Start the development server:

```bash
npm run dev
```

### Testing

Run tests:

```bash
npm run test
```

### Building

Build for production:

```bash
npm run build
```

## Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── services/      # API services
├── styles/        # Global styles and variables
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## License

MIT
