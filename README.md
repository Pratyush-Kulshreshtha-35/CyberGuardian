# CyberGuardian

CyberGuardian is a modern, full-stack MERN (MongoDB, Express, React, Node.js) application that analyzes password strength in real-time, estimates crack times based on advanced hashing algorithms, and checks passwords against known data breaches.

## Features
- **Real-Time Analysis**: Instant entropy calculation and strength scoring.
- **Breach Detection**: Cross-references passwords with the HaveIBeenPwned database.
- **Contextual Awareness**: Detects if your password contains easily guessable personal info (name, DOB).
- **Secure Authentication**: JWT-based login and registration system.
- **Session Tracking**: Tracks user login and logout timestamps securely in MongoDB.

## Technologies
- **Frontend**: React (Vite), Tailwind CSS v4, Lucide Icons, Framer Motion, Axios.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), bcryptjs, jsonwebtoken, zxcvbn.

## Getting Started
1. Install dependencies for both frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
2. Set up your `.env` file in the `backend` directory.
3. Run the development servers:
   - Frontend: `npm run dev`
   - Backend: `node server.js`
