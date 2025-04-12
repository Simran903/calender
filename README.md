# Calendar Application

A Google Calendar-like application built with React, TypeScript, Redux, MongoDB, and shadcn/ui.

## Features

- Calendar view with event management
- Create, edit, and delete events
- Drag-and-drop functionality for events
- Variable event durations
- Expandable and contractable events
- Side panel with goals and related tasks
- Drag-and-drop functionality from tasks to calendar

## Tech Stack

- **Frontend**:
  - React with TypeScript
  - Redux with Redux Toolkit for state management
  - shadcn/ui for UI components
  - react-big-calendar for calendar display
  - react-dnd for drag and drop functionality

- **Backend**:
  - Node.js with Express
  - MongoDB with Mongoose
  - TypeScript

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- MongoDB (local instance or Atlas connection)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/calendar-app
NODE_ENV=development
```

4. Seed the database:
```bash
cd server
npm run seed
```

### Running the Application

1. Start the server:
```bash
cd server
npm run dev
```

2. Start the client:
```bash
cd client
npm run dev
```

3. Access the application at `http://localhost:5173`

## Project Structure

- `client/`: Frontend React application
  - `src/components/`: UI components
  - `src/features/`: Feature-specific components
  - `src/redux/`: Redux store and slices
  - `src/types/`: TypeScript interfaces
  - `src/api/`: API service functions

- `server/`: Backend Express application
  - `src/controllers/`: API route controllers
  - `src/models/`: MongoDB schemas
  - `src/routes/`: API routes
  - `src/config/`: Configuration files

## API Endpoints

- `GET /api/events`: Get all events
- `POST /api/events`: Create a new event
- `PUT /api/events/:id`: Update an existing event
- `DELETE /api/events/:id`: Delete an event
- `GET /api/goals`: Get all goals
- `GET /api/goals/:id/tasks`: Get tasks for a specific goal
