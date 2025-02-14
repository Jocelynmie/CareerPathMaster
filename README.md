# CareerPath Management

## Overview

Website Link: https://github.com/Jocelynmie/CareerPathMaster
Design Document:
Slides: https://docs.google.com/presentation/d/1kPnJbBAn62iAnwKnmaITFbUKJ0F1iTxdJnqqrcXhzvY/edit#slide=id.g334b29309df_0_320
Video:

## Class Link

https://johnguerra.co/classes/webDevelopment_spring_2025/

## Project Object

A full-stack web application designed to help users manage their career development activities through task management and community support. Built with modern JavaScript and MongoDB, CareerPath offers a comprehensive solution for tracking job search activities and maintaining motivation through a shared message board.

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

## Describe any use of GenAI

## Models & Technologies

- Used Claude 3.5 Sonnet and ChatGPT to develop and understand key concepts. Key interactions included:

1. Project Setup & Deployment

   - Prompt used: "How to develop my backend and frontend on Vercel"
   - How it was used: Followed Claude's instructions to set up the project structure and configure vercel.json for proper deployment
   - Implementation steps:
     - Setting up project directory structure
     - Configuring vercel.json for deployment
     - Implementing server-side and client-side code separation

2. MongoDB Concepts

   - Prompt used: "What is ObjectId and why can't I use string directly in MongoDB operations?"
   - How it was used: Understanding the fundamental concepts of MongoDB's ObjectId and its importance in database operations
   - Key learnings:
     - ObjectId's structure and purpose
     - Why string conversion is necessary for database queries

3. CORS Understanding

   - Topic: Cross-Origin Resource Sharing (CORS)
   - Key learning: Learned that CORS configuration wasn't necessary for this project since frontend and backend share the same PORT
   - Implementation impact:
     - Simplified server setup without CORS middleware
     - Better understanding of when CORS is actually needed

4. Database Seeding

   - Prompt used: Request for help with generating message seeds
   - How it was used: Claude provided code to generate 1000 sample messages for testing
   - Implementation:
     - Created seedMessage.js
     - Generated realistic test data
     - Implemented seeding script

5. MongoDB Operations
   - Platform used: ChatGPT
   - Topic: Understanding MongoDB operation results
   - Key learnings:
     - Understanding the `result` object structure
     - InsertOneResult properties and usage
     - How to properly handle database operation responses

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

## Screenshots

https://github.com/Jocelynmie/CareerPathMaster/blob/main/mockup_pic/Screenshot%202025-02-11%20at%203.04.48%E2%80%AFPM.png
https://github.com/Jocelynmie/CareerPathMaster/blob/main/mockup_pic/Screenshot%202025-02-11%20at%203.06.08%E2%80%AFPM.png

## Author

Wenyu Yang

- GitHub:https://github.com/Jocelynmie
- Email: jocelynmiemie@gmail.com
