# Job Application Tracker

A simple full-stack tool I built to stay organized while applying for jobs. Instead of juggling spreadsheets, I wanted something cleaner that let me track applications, visualize progress, and focus on what matters most: getting hired.

I built this using a tech stack you'd find in a real-world team. The backend uses Spring Boot, the frontend runs on React with Next.js, and I added testing on both ends. I also used Docker and GitHub Actions to get more hands-on with CI workflows.

---

## Live Demo

🌐 [Try it here](https://job-tracker-fullstack-rouge.vercel.app)  
🔐 You can sign up or use test credentials to explore features.  
⚠️ Note: The backend runs on Render's free tier, so it might take 3 to 5 minutes to wake up.

---

## Why I Made This

I was spending too much time manually tracking job applications in a spreadsheet. It was easy to lose track of where I'd applied or what stage things were at. This project gave me something I could actually use while practicing real-world skills like authentication, filtering logic, and test automation.

---

## Features

### Authentication
- Login, registration, and logout using JWTs
- Session control for user-specific access

### Job Tracking
- Add jobs with title, company, status, date, and tags
- Edit, update, and delete entries

### Search and Filter
- Filter by company, status, or custom tags
- Helps narrow down results quickly as your list grows

### Stats Dashboard
- See totals by company, status, and tag
- Visual summaries to track your job search momentum

### Settings
- Option to delete your account or clear all saved applications

---

## Testing Focus

Testing was a big part of this project. I wrote both frontend and backend tests to catch bugs early and verify real user scenarios.

### Frontend (Jest + React Testing Library)

- Login flow with success and error states
- Form behavior for adding jobs and managing tags
- Search filters and result rendering
- Settings page delete functions
- Chart rendering and data checks
- Navbar visibility based on login status

### Backend (JUnit + MockMvc)

- Create, read, update, and delete operations
- Query filtering by company, status, and tags
- HTTP-level tests for controller logic

---

## CI and Deployment

- GitHub Actions pipeline for automated test runs on push and PR
- Backend is containerized with Docker
- Deployed with Vercel (frontend), Render (backend), and Railway (database)

---

## Tech Stack

| Frontend              | Backend              | DevOps and Tools     |
|-----------------------|----------------------|-----------------------|
| React + Next.js       | Java + Spring Boot   | GitHub Actions        |
| TypeScript            | PostgreSQL           | Docker                |
| Tailwind CSS          | JUnit                | Render, Vercel, Railway |
| Jest                  | Spring Security (JWT)|                       |

---

## Future Improvements

- Add email reminders for upcoming follow-ups
- Let users attach resumes and parse metadata
- Optional role-based access for shared dashboards



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
