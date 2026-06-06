# Personal Task Manager

## Overview

Personal Task Manager is a full-stack web application developed as part of the Studio Graphene Full Stack Developer Assessment. The application helps users efficiently manage their daily tasks by allowing them to create, edit, delete, search, filter, and track task completion status.

The project follows a client-server architecture with a React frontend and a Node.js/Express backend. The application is fully deployed and accessible online.

---

## Live Demo

### Frontend (Vercel)

https://task-manager-fullstack-4gqy-ktgh0xzwe.vercel.app

### Backend API (Render)

https://task-manager-fullstack-il39.onrender.com

### GitHub Repository

https://github.com/sharmashivam755/task-manager-fullstack

---

## Features

### Core Features

* Create new tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as Complete or Active
* View all tasks
* Search tasks by title and description
* Filter tasks by status:

  * All Tasks
  * Active Tasks
  * Completed Tasks

### Additional Features

* Dashboard Statistics

  * Total Tasks
  * Active Tasks
  * Completed Tasks
* Overdue Task Detection
* Responsive User Interface
* REST API Integration
* Full Deployment on Production Environment

---

## Technology Stack

### Frontend

* React.js
* Vite
* Axios
* JavaScript
* CSS

### Backend

* Node.js
* Express.js

### Deployment

* Vercel (Frontend Hosting)
* Render (Backend Hosting)

---

## Project Architecture

```text
task-manager-fullstack
│
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskCard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── routes
│   │   └── taskRoutes.js
│   ├── controllers
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation and Local Setup

### Clone Repository

```bash
git clone https://github.com/sharmashivam755/task-manager-fullstack.git
cd task-manager-fullstack
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

### Backend Setup

```bash
cd server
npm install
npm start
```

Backend will run on:

```text
http://localhost:5000
```

---

## API Documentation

### Get All Tasks

**Method:** GET

```http
/api/tasks
```

### Create Task

**Method:** POST

```http
/api/tasks
```

#### Request Body

```json
{
  "title": "Complete Assessment",
  "description": "Submit Studio Graphene Assignment",
  "dueDate": "2026-06-10"
}
```

---

### Update Task

**Method:** PUT

```http
/api/tasks/:id
```

#### Request Body

```json
{
  "title": "Updated Task",
  "description": "Updated Description",
  "dueDate": "2026-06-12"
}
```

---

### Toggle Task Status

**Method:** PATCH

```http
/api/tasks/:id
```

Updates task completion status.

---

### Delete Task

**Method:** DELETE

```http
/api/tasks/:id
```

Deletes the selected task.

---

## Design Decisions

* React was chosen for creating a fast and responsive user interface.
* Axios was used for efficient communication between frontend and backend.
* Express.js was selected to build lightweight REST APIs.
* Component-based architecture was used to improve code maintainability and reusability.
* Dashboard statistics were implemented to provide quick insights into task progress.
* Search and filtering functionality improve task management efficiency.

---

## Challenges Faced

During deployment, the frontend initially attempted to communicate with a local backend URL (`localhost:5000`) instead of the deployed Render backend. Browser developer tools were used to identify the issue, and API endpoints were updated accordingly.

Additionally, deployment issues caused by accidentally committing `node_modules` directories were resolved by removing tracked dependencies and allowing Vercel to install packages during the build process.

---

## Future Enhancements

Given more development time, the following features could be added:

* User Authentication and Authorization
* MongoDB/PostgreSQL Database Integration
* Persistent Data Storage
* Task Categories and Labels
* Task Priority Levels
* Drag-and-Drop Task Reordering
* Due Date Notifications and Reminders
* Dark Mode Support
* Unit Testing and Integration Testing
* Accessibility Improvements
* Task Sharing and Collaboration
* Pagination for Large Task Collections

---

## Author

**Shivam Sharma**

Studio Graphene Full Stack Developer Assessment Submission

---

## Deployment Status

Frontend Deployment: Active on Vercel

Backend Deployment: Active on Render

Application Status: Fully Functional
