# Task Manager Application

A full-stack Task Manager application built with a **React** frontend and a **Node.js/Express** backend. This application allows users to register, log in, and manage their tasks with a clean and responsive user interface.

## 🚀 Features

*   **Authentication**: Secure User Registration and Login using JWT (JSON Web Tokens).
*   **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
*   **Task Status**: Track tasks with statuses (Pending, In Progress, Done).
*   **Pagination**: Efficiently browse through your list of tasks.
*   **Protected Routes**: Prevents unauthorized access to task management pages.
*   **Responsive Design**: Works on desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
*   **React 19**: Modern UI library.
*   **Vite**: Fast build tool and development server.
*   **React Router DOM**: Client-side routing.
*   **Axios**: HTTP client for API requests (with interceptors for token handling).
*   **React Icons**: For UI icons.
*   **CSS**: Custom responsive styling with CSS variables.

### Backend
*   **Node.js & Express**: robust REST API.
*   **Sequelize**: ORM for SQLite database interaction.
*   **SQLite**: Lightweight, file-based relational database.
*   **JWT**: Secure authentication mechanism.
*   **Bcrypt**: Password hashing for security.

## 📸 Screenshots

### Login Page
Clean and secure login interface.
![Login Screen](./screenshots/login.png)

### Registration Page
New users can easily sign up.
![Registration Screen](./screenshots/register.png)

### Task Dashboard
View all your tasks with pagination and status indicators.
![Tasks Dashboard](./screenshots/tasks.png)

### Add/Edit Task
Simple form to create or update tasks.
![Add Task](./screenshots/add_task.png)

## 📂 Project Structure

```
task manager/
├── backend/            # Node.js API
│   ├── src/
│   │   ├── config/     # Database configuration
│   │   ├── controllers/# Request handlers
│   │   ├── middlewares/# Auth and error handling
│   │   ├── models/     # Sequelize models (User, Task)
│   │   ├── routes/     # API routes
│   │   └── utils/      # Helper functions
│   └── database.sqlite # SQLite database file
│
├── frontend/           # React Application
│   ├── src/
│   │   ├── api/        # Axios setup
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # Auth state management
│   │   ├── pages/      # Application pages (Login, Tasks, etc.)
│   │   └── routes/     # Routing configuration
│   └── vite.config.js  # Vite config (proxy setup)
│
└── screenshots/        # Project screenshots
```

## 🏁 Getting Started

### Prerequisites
*   **Node.js** (v18 or higher recommended)
*   **npm** (Node Package Manager)

### 1. Setup Backend

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Start the backend server (runs on `http://localhost:3000`):

```bash
npm start
# OR for development with auto-restart
npm run dev
```

### 2. Setup Frontend

Open a new terminal, navigate to the frontend folder, and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server (runs on `http://localhost:5173`):

```bash
npm run dev
```

### 3. Usage
1.  Open your browser and go to `http://localhost:5173`.
2.  Register a new account.
3.  Log in and start managing your tasks!

## 📝 API Documentation

The backend exposes the following RESTful endpoints:

*   `POST /api/auth/register` - Create a new user.
*   `POST /api/auth/login` - Authenticate user and get token.
*   `GET /api/tasks` - Get paginated list of tasks.
*   `POST /api/tasks` - Create a new task.
*   `PUT /api/tasks/:id` - Update an existing task.
*   `DELETE /api/tasks/:id` - Delete a task.

---
**Enjoy managing your tasks!**
