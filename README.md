# CyberGuardian

🚀 **Live Deployment**: [https://cyber-guardian-phi.vercel.app/](https://cyber-guardian-phi.vercel.app/)
CyberGuardian is a modern, full-stack MERN (MongoDB, Express, React, Node.js) application that analyzes password strength in real-time, estimates crack times based on advanced hashing algorithms, and checks passwords against known data breaches.

## Problem Statement
In today's digital landscape, weak and compromised passwords are the leading cause of data breaches. Users often resort to easily guessable passwords containing personal information or reuse the same passwords across multiple platforms. There is a critical need for a proactive security tool that not only calculates the true entropy of a password but also cross-references it against known breaches and contextual data (like names and birthdates) to educate users and enforce robust credential security. CyberGuardian solves this by providing enterprise-grade, real-time password analysis in an intuitive interface.

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

---
**By- Pratyush Kulshreshtha**  
Licensed under the **MIT License**.
