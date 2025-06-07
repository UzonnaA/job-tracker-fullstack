# 🧾 Job Application Tracker

A fullstack app to help users stay organized during the job search. Includes form-based job tracking, tag filtering, visual stats, and full CRUD support.

Built using technologies and tools you'd find in a real-world software team. This includes tests, Docker, and automated CI.

---

## 🚀 Live Demo

🌐 [View the live app](https://job-tracker-fullstack-rouge.vercel.app)  
🔒 Use test credentials or register a new account to explore functionality  
⏳ **Note**: The backend is hosted on Render's free tier. Initial cold starts may take **3-5 minutes** during registration or login.

---

## 🎯 Project Purpose

This app was built to replace spreadsheets and manual tracking methods for job seekers. It helps users manage job applications, track progress visually, and maintain focus throughout their job search journey.

---

## 🛠️ Features

### 🔐 **Authentication**
- Secure registration and login (JWT-based)
- Logout and session management

### 📋 **Job Application Management**
- Add new job applications with:
  - Job Title
  - Company
  - Status (Applied, Interviewing, Offer, Rejected)
  - Date
  - Tags (Remote, Junior, Contract, JavaScript)

### 🔍 **Search & Filtering**
- Search applications by:
  - Company name
  - Status
  - Tags

### 📊 **Statistics Dashboard**
- Displays application counts by status, company, and tag
- Visual summary to track progress over time

### ⚙️ **Settings Page**
- Delete **all applications**
- Delete **user account**

---

## ✅ Quality Assurance Focus

- `Jest` for frontend unit testing
- `JUnit` for backend logic and API testing

I've written and automated tests for key features, focusing on realistic scenarios and edge cases you'd expect in QA work.

### 🧪 Frontend Testing with Jest + React Testing Library

- **Authentication Flow**
  - Tests for rendering login form and handling success/failure cases (`LoginPage.test.tsx`)
- **Application Submission**
  - Verifies form input behavior, tag addition/removal, and successful submission clears fields (`AddPage.test.tsx`)
- **Search & Filtering**
  - Tests input filters, fetch results, and company-based query handling (`SearchPage.test.tsx`)
- **Settings Behavior**
  - Confirms "Delete All Applications" and "Delete Account" buttons trigger correct API calls (`SettingsPage.test.tsx`)
- **Chart Rendering**
  - Verifies charts load and render correctly based on fetched data (`StatsPage.test.tsx`)
- **Navbar Visibility**
  - Tests authenticated vs unauthenticated state for navigation options (`Navbar.test.tsx`)

### 🔧 Backend Testing with JUnit (Spring Boot)

- **Create Application**
  - Verifies new job applications are successfully saved to the database
- **Get All Applications**
  - Ensures a list of all applications is returned
- **Get Application by ID**
  - Confirms a specific job application can be retrieved correctly
- **Update Application**
  - Tests editing existing applications and verifies persistence
- **Delete Application**
  - Ensures a job application is deleted correctly
- **Filter Applications**
  - Covers query-based filtering (by company, status, tag)
- **MockMvc Integration**
  - Uses MockMvc for full HTTP-layer testing of controller endpoints

All controller-level logic is tested in isolation from the frontend, ensuring correct REST behavior across CRUD operations.

---

## 🔁 CI/CD & DevOps

- **GitHub Actions** for automated test pipelines on push/PR
- **Dockerized backend** for consistent environment across development and deployment
- Helps catch bugs early and avoid broken builds before deployment.

---

## ⚙️ Tech Stack

| Frontend | Backend | Tools & DevOps |
|----------|---------|----------------|
| React + Next.js (TypeScript) | Java + Spring Boot | GitHub Actions |
| Tailwind CSS | PostgreSQL | Docker |
| Jest | JUnit | Vercel (frontend), Render (backend), Railway (PostgreSQL) |

---

## 🧑‍💻 Getting Started (Local Setup)

### Prerequisites
- Docker
- Java 17
- Node.js 18+

### Clone & Run

```bash
git clone https://github.com/UzonnaA/job-tracker-fullstack
cd job-tracker-fullstack

# Start the backend
cd job-tracker-backend
mvn spring-boot:run

# Start the frontend
cd ../job-tracker-frontend
npm install
npm run dev
```
