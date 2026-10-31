# TaskFlow — Modern Task Management Web Application

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Frontend-React_19_+_Vite-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS_v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js_+_Express-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_+_Mongoose-47A248?logo=mongodb)](https://www.mongodb.com/)

TaskFlow is a modern, responsive, full-stack **Task Management Web Application** designed after productivity tools like Linear, Notion, and Todoist. It enables users to create, organize, filter, prioritize, and track their daily tasks with clean visual analytics and real-time synchronization.

---

## 🚀 Key Features

### 1. User Authentication & Authorization
- **Registration & Login**: Secure user onboarding with email, full name, and password.
- **Password Security**: Strong hashing with `bcryptjs` (salt rounds: 10).
- **JWT Authentication**: Stateless 30-day token-based authentication with secure authorization headers.
- **Protected Routes**: Client-side protected route guards and server-side JWT verification middleware.
- **Isolated User Workspaces**: Users can only query, modify, and delete their own tasks.
- **Profile & Password Management**: Users can update their profile information and change passwords securely.

### 2. Comprehensive Task Management (CRUD)
- **Create**: Add tasks with Title, Description, Status, Priority, Category, and Due Date.
- **View & Details**: Interactive task cards, list view, and modal inspect view with full timestamps and metadata.
- **Update**: Edit task details or quickly toggle status (`pending` ➔ `in-progress` ➔ `completed`) directly via one-click checkboxes and status buttons.
- **Delete**: Safe deletion with an alert confirmation modal.
- **Priority Levels**: Color-coded badges for `High` (red), `Medium` (amber), and `Low` (sky).
- **Overdue Indicator**: Visual overdue badges when a task has passed its due date and remains incomplete.

### 3. Interactive Analytics & Dashboard
- **Metric Cards**: Real-time counters for Total Tasks, Completed, In Progress, Pending, Due Today, and Overdue.
- **Visual Progress Bar**: Segmented progress breakdown and overall completion percentage.
- **Recent Activity Feed**: Quick glance at the latest tasks with immediate modal inspection.

### 4. Advanced Search, Filter & Sort
- **Search**: Live debounced search across task titles and descriptions.
- **Status Filter**: Filter by `Pending`, `In Progress`, or `Completed`.
- **Priority Filter**: Filter by `Low`, `Medium`, or `High`.
- **Category Filter**: Filter by custom categories (e.g. Work, Personal, Design, Engineering).
- **Sorting Options**: Sort by `Newest First`, `Oldest First`, `Due Date (Soonest/Latest)`, `Priority (High-to-Low / Low-to-High)`, or `Title (A-Z)`.
- **Layout Toggle**: Seamless switch between Grid and List card views.

### 5. Modern SaaS UI/UX
- **Design Inspiration**: Minimalist aesthetic influenced by Linear and Notion.
- **Dark & Light Mode**: Persistent theme switching with automatic system preference detection.
- **Mobile Responsive**: Off-canvas sliding sidebar drawer for mobile and tablets.
- **Feedback & States**: Animated loading skeletons, empty states, and toast notifications via `react-hot-toast`.
- **Real-Time Sync**: Socket.IO integration for live task event broadcasting.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, React Router DOM, Tailwind CSS v4, Lucide React, React Hot Toast, Date-fns, Axios, Socket.IO Client |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens (jsonwebtoken), bcryptjs, Morgan, CORS, Dotenv, Socket.IO |
| **Database** | MongoDB (Local Community Server or MongoDB Atlas cloud cluster) |

---

## 📁 Project Structure

```
taskm/
├── client/                     # Frontend React + Vite application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/           # ProtectedRoute.jsx
│   │   │   ├── dashboard/      # StatsCards.jsx, TaskChart.jsx, RecentTasks.jsx
│   │   │   ├── layout/         # AppLayout.jsx, Sidebar.jsx, Topbar.jsx
│   │   │   ├── tasks/          # TaskCard.jsx, TaskList.jsx, TaskForm.jsx, TaskFilters.jsx, TaskDetailModal.jsx, DeleteConfirmModal.jsx
│   │   │   └── ui/             # Button.jsx, Input.jsx, Badge.jsx, Modal.jsx, LoadingSkeleton.jsx, EmptyState.jsx, ThemeToggle.jsx
│   │   ├── context/            # AuthContext.jsx, ThemeContext.jsx
│   │   ├── hooks/              # useTasks.js, useSocket.js
│   │   ├── pages/              # Landing.jsx, Login.jsx, Register.jsx, Dashboard.jsx, Tasks.jsx, CreateTask.jsx, EditTask.jsx, Profile.jsx, NotFound.jsx
│   │   ├── services/           # api.js (Axios instance & endpoint functions)
│   │   ├── utils/              # helpers.js (date formatting, priority colors, greetings)
│   │   ├── App.jsx             # Route definitions & Toaster provider
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Tailwind CSS imports & theme variables
│   ├── vite.config.js          # Vite config with API proxy
│   └── package.json
│
├── server/                     # Backend Node.js + Express API
│   ├── config/                 # db.js (Resilient MongoDB connection)
│   ├── controllers/            # authController.js, taskController.js
│   ├── middleware/             # auth.js, errorHandler.js, validate.js
│   ├── models/                 # User.js, Task.js (Mongoose schemas)
│   ├── routes/                 # authRoutes.js, taskRoutes.js
│   ├── utils/                  # helpers.js (token generation, user sanitization)
│   ├── .env                    # Active environment variables
│   ├── .env.example            # Example configuration template
│   ├── server.js               # Express + Socket.IO server setup
│   └── package.json
│
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended; verified on Node v24)
- [MongoDB](https://www.mongodb.com/) (Local Community Server running on `mongodb://localhost:27017` or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

---

### Step 1: Clone or Navigate to the Workspace
```bash
git clone https://github.com/Manvith0408/task-flow-task_management-.git
cd task-flow-task_management-
```

---

### Step 2: Configure Environment Variables

Create or verify `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_jwt_key_here
CLIENT_URL=http://localhost:5173
```

> **Note for MongoDB Atlas Users**: If you are using MongoDB Atlas instead of a local MongoDB daemon, set `MONGO_URI` to your Atlas connection string:
> ```env
> MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
> ```

---

### Step 3: Install Dependencies

You can install all dependencies from the root:
```bash
npm run install:all
```

Or individually:
```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

---

### Step 4: Run the Application

#### Option A: Run Server and Client in Separate Terminals

**Terminal 1 (Backend API):**
```bash
cd server
npm run dev
# or: npm start
```
*Server will start on `http://localhost:5000`.*

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
```
*Client will open on `http://localhost:5173`.*

---

## 📡 REST API Reference

### Health Check
- `GET /api/health` — Verifies server & database connectivity state.

### Authentication Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT (`email`, `password`) |
| `GET` | `/api/auth/me` | Private | Get current user's profile |
| `PUT` | `/api/auth/profile` | Private | Update user profile (`name`, `email`) |
| `PUT` | `/api/auth/password` | Private | Change account password (`currentPassword`, `newPassword`) |

### Task Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/tasks` | Private | Get user tasks (supports `search`, `status`, `priority`, `category`, `sortBy`, `order`) |
| `GET` | `/api/tasks/stats` | Private | Get task counts, completion %, today's tasks, overdue counts, and recent tasks |
| `GET` | `/api/tasks/:id` | Private | Get single task details |
| `POST` | `/api/tasks` | Private | Create a task (`title`, `description`, `status`, `priority`, `category`, `dueDate`) |
| `PUT` | `/api/tasks/:id` | Private | Update task fields |
| `PATCH` | `/api/tasks/:id/status` | Private | Toggle/update task status (`pending`, `in-progress`, `completed`) |
| `DELETE` | `/api/tasks/:id` | Private | Delete a task |

---

## 🔒 Security Best Practices
- Passwords are encrypted using `bcryptjs` with salt work factor of 10.
- Passwords are excluded by default in Mongoose schemas (`select: false`).
- Authorization middleware validates JWT Bearer tokens on all private routes.
- Task queries and mutations enforce user ownership (`task.user.toString() === req.user._id.toString()`).
- Centralized error handler captures CastErrors, Mongo validation errors, and token expiration errors without exposing server internals.

---

## 📄 License
This project is open-source under the MIT License.

