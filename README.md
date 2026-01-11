# 🧠 ASL Teacher Application

An interactive web application to learn **American Sign Language (ASL)** using
real-time hand gesture recognition, camera input, audio feedback, testing,
analytics, and progress tracking.

This project is built as part of a technical assignment and follows the
provided Product Requirements Document (PRD).

---

## 🚀 Live Demo

🔗 Live Application:https://asl-teacher-app-i036.onrender.com/ 
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
- Test history stored in PostgreSQL
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


##Folder Structure 

ASL_Teacher_Application/
├── client/
│   ├── .dockerignore
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   └── logo.svg
│   ├── README.md
│   ├── src/
│   │   ├── api/
│   │   │   ├── authApi.js
│   │   │   └── testApi.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets/
│   │   │   ├── asl_demo.png
│   │   │   ├── asl_demo.webp
│   │   │   ├── react.svg
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
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── logos/
│   │   │   │   └── AslLogo.jsx
│   │   │   └── profile/
│   │   │       ├── ChangePasswordModal.jsx
│   │   │       ├── DeleteProfileModal.jsx
│   │   │       └── ProfileAvatar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── history/
│   │   │   └── HistoryTable.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── AnalyticsPage.jsx
│   │   │   ├── CameraSetup.jsx
│   │   │   ├── FlipResultCard.jsx
│   │   │   ├── HistoryPage.jsx
│   │   │   ├── HomePage/
│   │   │   │   ├── BenefitsSection.jsx
│   │   │   │   ├── constants.js
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── HomePage.jsx
│   │   │   │   ├── HowItWorksSection.jsx
│   │   │   │   ├── index.js
│   │   │   │   └── TestFlowSection.jsx
│   │   │   ├── Learn.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── ResultSkeleton.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── TestMode.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.service.js
│   │   │   └── signs.service.js
│   │   └── utils/
│   │       ├── fingerState.js
│   │       ├── fingerUtils.js
│   │       ├── formatDate.js
│   │       ├── gestureRules.js
│   │       ├── hands.js
│   │       ├── resultMeta.js
│   │       ├── speak.js
│   │       ├── testSigns.js
│   │       ├── tts.js
│   │       └── validateGesture.js
│   └── vite.config.js
├── client.zip
└── server/
    ├── .dockerignore
    ├── .gitignore
    ├── Dockerfile
    ├── package-lock.json
    ├── package.json
    └── src/
        ├── app.js
        ├── config/
        │   └── db.js
        ├── controllers/
        │   ├── analytics.controller.js
        │   ├── auth.controller.js
        │   ├── signs.controller.js
        │   └── test.controller.js
        ├── middlewares/
        │   └── auth.middleware.js
        ├── routes/
        │   ├── analytics.routes.js
        │   ├── auth.routes.js
        │   ├── signs.routes.js
        │   └── test.routes.js
        ├── server.js
        └── utils/
            ├── hash.js
            └── jwt.js


## ⚙️ Local Setup Instructions

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

