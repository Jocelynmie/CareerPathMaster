# CareerPath Management

## Overview

A full-stack web application designed to help users manage their career development activities through task management and community support. Built with modern JavaScript and MongoDB, CareerPath offers a comprehensive solution for tracking job search activities and maintaining motivation through a shared message board.

Website Link: https://github.com/Jocelynmie/CareerPathMaster
Design Document: https://github.com/Jocelynmie/Personal-Home-Page/blob/main/Design%20Document.pdf
Slides: https://docs.google.com/presentation/d/1UQQJ6df8m87xbNU-_o3mVFuwbP7Itq9NkcSIETTNBVU/edit#slide=id.g106ca8f30d1_0_0
Video: https://youtu.be/iQILQlY6Ry0

## Features

### CareerPath Management System

- Priority-based organization (P1-Critical to P4-Low)
- Category classification:
  - Job Search
  - Applications
  - Interviews
  - Skill Development
  - Networking
- Due date tracking with smart date formatting
- Visual status indicators with color coding
- Task completion toggling
- Category-based filtering

### Motivational Message Board

- Real-time message posting
- Pagination support
- Chronological message display
- Loading state management
- Error handling and feedback

## Technical Stack

### Frontend

- HTML5/CSS3
- Vanilla JavaScript (ES6+)
- Bootstrap 5.3.2
- Bootstrap Icons
- Object-Oriented Programming Pattern

### Backend

- Node.js
- Express.js
- MongoDB
- REST API Architecture

### Development Tools

- CORS for cross-origin resource sharing
- dotenv for environment management
- MongoDB Atlas for database hosting
- Vercel for frontend and backend hosting

## Code Architecture

### Frontend Structure

`/frontend`

- `/css` - Contains stylesheets
  - `main.css` - Global styles
  - `message.css` - Message-specific styles
- `/js` - JavaScript client-side code
  - `app.js` - Main application logic
  - `message.js` - Message handling functionality
- HTML Templates
  - `index.html` - Main application entry point
  - `message.html` - Message view template

### Backend Structure

`/src`

- `/config` - Configuration files
  - `config.js` - Application configuration
- `/db` - Database related files
  - `/seeds` - Database seed files
    - `seedMessage.js` - Message seeding logic
  - `connection.js` - Database connection setup
  - `indexes.js` - Database indexes
  - `utils.js` - Database utilities
- `/routes` - API routes
  - `careerActivityRoutes.js` - Career activity endpoints
  - `messageRoutes.js` - Message handling endpoints

### Root Configuration Files

- `server.js` - Main server entry point
- `.env` - Environment variables
- `vercel.json` - Vercel deployment configuration
- `package.json` - Project dependencies and scripts

## API Endpoints

### Tasks

```
POST   /api/tasks              # Create new task
GET    /api/tasks/user/:userId # Retrieve user tasks
PATCH  /api/tasks/:taskId/toggle # Toggle completion
DELETE /api/tasks/:taskId      # Remove task
GET    /api/tasks/user/:userId/filter # Filter by category
```

### Messages

```
GET  /api/messages    # Fetch paginated messages
POST /api/messages    # Create new message
```

## Database Design

### Indexes

- Tasks Collection:

  - userId_index
  - userId_category_index
  - createdAt_index
  - userId_dueDate_index
  - userId_priority_index
  - text_search_index (on title field)

- Messages Collection:
  - messages_createdAt_index

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd careerpath
```

2. Install dependencies:

```bash
npm install
```

3. Environment Setup:
   Create a `.env` file:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=careerpath
NODE_ENV=development
```

4. Start the application:

```bash
npm start
```

## Development

### Local Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

## Future Enhancements

1. User authentication system
2. Task reminder notifications
3. Analytics dashboard
4. CSV export functionality
5. Mobile application
6. Integration with job posting APIs

## Author

Wenyu Yang

- GitHub:
- Email: jocelynmiemie@gmail.com
