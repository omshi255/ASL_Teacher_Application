# 🧠 ASL Teacher Application

An interactive web application to learn **American Sign Language (ASL)** using
real-time hand gesture recognition, camera input, audio feedback, testing,
analytics, and progress tracking.

This project is built as part of a technical assignment and follows the
provided Product Requirements Document (PRD).

---

## 🚀 Live Demo

🔗 Live Application:https://asl-teacher-application.vercel.app/           

🔗 Backend API:https://asl-teacher-application.onrender.com

---

## 📌 Features Implemented

### ✅ Core Features
- Webcam access with permission handling
- Real-time camera feed
- ASL sign learning module
- Reference images & descriptions
- Text-to-Speech audio guidance
- Gesture practice mode

### ✅ Testing & Evaluation
- Test mode with 10 ASL signs
- Gesture validation per sign
- Score calculation & percentage
- Immediate feedback

### ✅ Analytics & Reports
- Accuracy trends (charts)
- Correct vs Incorrect answers graph
- Test attempts timeline
- Performance insights

### ✅ User History
- Per-user analytics
- Persistent learning progress

## 👤 User Profile & Account Management

The application includes a complete user profile system to manage user
identity, progress, and personalization.

### 🔐 Authentication & Security
- User registration and login
- JWT-based authentication
- Protected routes for tests, analytics, and history
- Secure token storage on the client

### 🧾 User Profile
- View logged-in user details
- Profile avatar support
- Edit basic profile information
- Persistent user session handling

### 🔑 Password Management
- Change password functionality
- Secure password hashing on backend
- Validation and error handling

### 📊 Profile-linked Progress
- All test attempts linked to the authenticated user
- Analytics and performance data scoped per user
- Test history isolated per account

### 🕒 Activity Tracking
- Timestamped test attempts
- Historical performance comparison
- User-specific learning progression

## 🧱 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- MediaPipe Hands
- Web Speech API
- Recharts (Analytics graphs)

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Docker

### DevOps / Deployment

- Docker (backend)
- Vercel (frontend)
- Render (backend hosting)

## 📁 Folder Structure

```text
ASL_Teacher_Application/
├── client/
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   │   └── logo.svg
│   ├── src/
│   │   ├── api/
│   │   │   ├── authApi.js
│   │   │   └── testApi.js
│   │   ├── assets/
│   │   │   ├── asl_demo.png
│   │   │   ├── asl_demo.webp
│   │   │   └── unnamed.jpg
│   │   ├── components/
│   │   │   ├── cameraSection/
│   │   │   │   ├── CameraFeed.jsx
│   │   │   │   └── HandOverlay.jsx
│   │   │   ├── feedback/
│   │   │   │   └── GestureFeedback.jsx
│   │   │   ├── hooks/
│   │   │   │   ├── useGestureValidation.js
│   │   │   │   ├── useHandGesture.js
│   │   │   │   └── useTestHistory.js
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── profile/
│   │   │   │   ├── ChangePasswordModal.jsx
│   │   │   │   ├── DeleteProfileModal.jsx
│   │   │   │   └── ProfileAvatar.jsx
│   │   │   ├── context/
│   │   │   │   └── AuthContext.jsx
│   │   │   ├── pages/
│   │   │   │   ├── HomePage/
│   │   │   │   ├── Learn.jsx
│   │   │   │   ├── TestMode.jsx
│   │   │   │   ├── AnalyticsPage.jsx
│   │   │   │   ├── HistoryPage.jsx
│   │   │   │   └── ProfilePage.jsx
│   │   │   ├── services/
│   │   │   │   ├── api.js
│   │   │   │   ├── auth.service.js
│   │   │   │   └── signs.service.js
│   │   │   ├── utils/
│   │   │   │   ├── validateGesture.js
│   │   │   │   ├── speak.js
│   │   │   │   └── tts.js
│   │   │   ├── App.jsx
│   │   │   ├── main.jsx
│   │   │   └── index.css
│   └── vite.config.js
│
├── server/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── signs.controller.js
│       │   ├── test.controller.js
│       │   └── analytics.controller.js
│       ├── middlewares/
│       │   └── auth.middleware.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   ├── signs.routes.js
│       │   ├── test.routes.js
│       │   └── analytics.routes.js
│       └── utils/
│           ├── hash.js
│           └── jwt.js
│
├── .env.example
├── README.md
└── server/schema.sql
```


## ⚙️ Local Setup Instructions

### Prerequisites

- Node.js 20+
- Docker (optional, for containerized backend)


### 1️⃣ Clone the Repository
```bash
git clone https://github.com/omshi255/ASL_Teacher_Application.git
cd ASL_Teacher_Application


# Backend
cd server
npm install

# Frontend
cd client
npm install


## Run Locally

# Backend
npm run dev

# Frontend
npm run dev


---

### 🐳 Docker Setup (Backend)
#### Build and Run Backend with Docker

docker build -t asl-backend ./server
docker run -p 5000:5000 --env-file server/.env asl-backend

OR using Docker Compose
docker compose up --build


### 2️⃣ 🔐 Environment Variables (`.env.sample` explanation)

```md
## 🔐 Environment Variables

This project uses environment variables for configuration.
Sensitive values are not committed to the repository.

Refer to `.env.sample` for required variables.

```
## 🗃️ Database Schema

### Tables
### 🗃️ Database Schema & Data Persistence

The application uses **PostgreSQL** to persist user data, learning content,
test results, and analytics. All data is securely stored and scoped per user.

### 📁 Tables Overview

#### 1️⃣ `users`
Stores authenticated user accounts.

- `id` (UUID, Primary Key)
- `email`
- `password`
- `created_at`

Used for:
- Authentication
- Profile management
- Linking test history and analytics to a user

---

#### 2️⃣ `asl_signs`
Stores ASL learning content.

- `id`
- `name`
- `description`
- `difficulty`
- `reference_image`
- `reference_url`
- `created_at`

Used for:
- Learning module
- Practice mode
- Test generation

---

#### 3️⃣ `test_attempts`
Stores each test session attempted by a user.

- `id`
- `user_id` (Foreign Key → `users`)
- `score_percentage`
- `total_questions`
- `created_at`

Used for:
- Overall test scoring
- Analytics calculations
- Performance trends

---

#### 4️⃣ `test_sign_results`
Stores per-sign results for each test attempt.

- `id`
- `test_attempt_id` (Foreign Key → `test_attempts`)
- `sign_id` (Foreign Key → `asl_signs`)
- `is_correct`

Used for:
- Detailed performance analysis
- Correct vs incorrect breakdown
- Personalized feedback and recommendations

---

## Demo Video  




## 🔗 API Endpoints (Overview)

### Auth
- POST `/api/auth/signup`
- POST `/api/auth/login`
- PUT `/api/auth/change-password`

### Signs
- GET `/api/signs`

### Tests
- POST `/api/test/start`
- POST `/api/test/submit`

### Analytics
- GET `/api/analytics`
- GET `/api/analytics/history`



## ✅ Acceptance Criteria (PRD Aligned)

- [x] Webcam access with live video feed
- [x] ASL learning module with reference content
- [x] Real-time gesture validation
- [x] Text-to-speech feedback
- [x] Test mode with scoring
- [x] Performance analytics & charts
- [x] User history persistence
- [x] PostgreSQL database integration
- [x] Environment setup documentation
- [x] Public deployment



👤 Author
Swati Sen

This project was built as part of a frontend/backend engineering assignment and demonstrates real‑world development, deployment, and debugging practices.
