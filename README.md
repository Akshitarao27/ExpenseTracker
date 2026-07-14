# 💰 Expense Tracker

<p align="center">
  <img width="900" alt="Dashboard" src="https://github.com/user-attachments/assets/d77c5eb2-80a3-4ffb-9b91-16982be9e6cd" />
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7)
![License](https://img.shields.io/badge/License-MIT-yellow)

</p>

A full-stack **MERN Expense Tracker** application that enables users to securely manage income and expenses, visualize financial insights through interactive dashboards, and maintain organized personal finance records. The application includes JWT authentication, profile image upload, Excel report generation, and a responsive user interface.

---

# 🚀 Live Demo

### 🌐 Frontend
https://expense-tracker-iota-virid.vercel.app

### ⚙️ Backend API
https://expense-tracker-backend-i41b.onrender.com

### 📂 GitHub Repository
https://github.com/Akshitarao27/ExpenseTracker

---

# 📑 Table of Contents

- Features
- Tech Stack
- Project Architecture
- Project Structure
- Installation
- Environment Variables
- API Endpoints
- Screenshots
- Learning Outcomes
- Known Limitations
- Future Improvements
- Author

---

# ✨ Features

- 🔐 Secure JWT Authentication
- 👤 User Registration & Login
- 🖼️ Profile Image Upload
- 💰 Income Management
- 💸 Expense Management
- 📊 Dashboard Analytics
- 📈 Interactive Charts
- 📥 Excel Report Export
- 🔒 Protected Routes
- 📱 Responsive Design
- ☁️ MongoDB Atlas Integration
- 🌍 Fully Deployed Application

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Recharts
- Framer Motion
- React Hot Toast
- React Icons

## Backend

- Node.js
- Express.js
- JWT Authentication
- Multer
- bcrypt.js

## Database

- MongoDB Atlas
- Mongoose

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

# 🏗 Project Architecture

```
             React + Vite
                   │
              Axios Requests
                   │
          Express.js REST APIs
                   │
              MongoDB Atlas
```

---

# 📂 Project Structure

```
ExpenseTracker
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
├── frontend
│   └── expense-tracker
│       ├── public
│       ├── src
│       ├── package.json
│       ├── vite.config.js
│       └── vercel.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Akshitarao27/ExpenseTracker.git
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd frontend/expense-tracker
npm install
npm run dev
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=8000

MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

# Development
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:8000

# Production
CLIENT_URL=https://expense-tracker-iota-virid.vercel.app
SERVER_URL=https://expense-tracker-backend-i41b.onrender.com
```

---

## Frontend (.env)

```env
# Development
VITE_API_URL=http://localhost:8000

# Production
VITE_API_URL=https://expense-tracker-backend-i41b.onrender.com
```

---

# 📚 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|------------------------------|----------------|
| POST | `/api/v1/auth/register` | Register User |
| POST | `/api/v1/auth/login` | Login User |
| GET | `/api/v1/auth/getUser` | Get User Details |
| POST | `/api/v1/auth/upload-image` | Upload Profile Image |

---

## Income

| Method | Endpoint |
|----------|------------------------------|
| POST | `/api/v1/income/add` |
| GET | `/api/v1/income/get` |
| DELETE | `/api/v1/income/:id` |
| GET | `/api/v1/income/downloadexcel` |

---

## Expense

| Method | Endpoint |
|----------|------------------------------|
| POST | `/api/v1/expense/add` |
| GET | `/api/v1/expense/get` |
| DELETE | `/api/v1/expense/:id` |
| GET | `/api/v1/expense/downloadexcel` |

---

# 📸 Screenshots

## 🔐 Login Page

<img width="1469" alt="Login" src="https://github.com/user-attachments/assets/28a6fa18-5bee-40a6-93af-3752aa374a4b" />

---

## 📊 Dashboard

<img width="1470" alt="Dashboard" src="https://github.com/user-attachments/assets/d77c5eb2-80a3-4ffb-9b91-16982be9e6cd" />

<img width="1469" alt="Dashboard Analytics" src="https://github.com/user-attachments/assets/37b6fed8-f378-438a-9b25-e44adb679de8" />

---

## 💰 Income Management

<img width="1219" alt="Income" src="https://github.com/user-attachments/assets/0bc834a7-af93-4a48-a006-015618c6c2f1" />

<img width="1212" alt="Add Income" src="https://github.com/user-attachments/assets/9fceb1bb-e2c5-4b59-8408-936ccf0bed06" />

---

## 💸 Expense Management

<img width="1218" alt="Expense" src="https://github.com/user-attachments/assets/58e7fd8e-1050-40f6-9836-22266efafd69" />

<img width="1220" alt="Add Expense" src="https://github.com/user-attachments/assets/8defce79-d693-481a-8980-b9bb5456beea" />

---

# 🎯 Learning Outcomes

This project provided hands-on experience with:

- Full-Stack MERN Development
- React.js & Component-Based Architecture
- REST API Development
- JWT Authentication
- MongoDB Atlas Integration
- CRUD Operations
- File Upload using Multer
- Data Visualization using Recharts
- Git & GitHub Workflow
- Environment Variables
- CORS Configuration
- Deployment with Vercel & Render
- Debugging Production Deployment Issues

---

# ⚠️ Known Limitations

- Uploaded profile images are stored on the Render server's local filesystem.
- Images may be lost if the backend service is redeployed or restarted.
- For production-scale applications, cloud storage services such as **Cloudinary** or **Amazon S3** are recommended for persistent file storage.

---

# 🚀 Future Improvements

- ✏️ Edit Income & Expenses
- 📅 Monthly Budget Planning
- 🌙 Dark Mode
- 📊 Advanced Analytics
- 🔔 Notifications & Reminders
- 💱 Multi-Currency Support
- 📄 PDF Report Export
- ☁️ Cloud Image Storage (Cloudinary)

---

# 👩‍💻 Author

**Akshita Rao**

🎓 B.Tech CSE (Artificial Intelligence)  
Institute of Engineering & Technology (IET), Lucknow

**GitHub:** https://github.com/Akshitarao27

**LinkedIn:** https://www.linkedin.com/in/akshita-rao-b07045348/

---

# ⭐ Support

If you found this project useful, consider giving it a **⭐ Star** on GitHub.

It motivates me to continue building impactful projects and sharing my learning journey.
